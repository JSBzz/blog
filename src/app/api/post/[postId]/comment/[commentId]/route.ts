import { auth } from "@/app/config/next-auth/auth";
import prisma from "@/app/config/prisma/db";
import { compare, genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  const response = await findCommentById(params.postId, params.commentId);
  return NextResponse.json(response);
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  const body = await req.json();
  const session = await auth();
  const { comment, password } = body;

  const commentData = await findCommentById(params.postId, params.commentId);
  const isEditable = await checkEditable(commentData, password, session);

  if (!isEditable) return NextResponse.json(false);

  const response = await client.post_comment.update({
    data: {
      comment: comment,
      changed_at: new Date(),
    },
    where: { id: Number(params.commentId) },
  });
  return NextResponse.json(response);
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; commentId: string; password: string } }
) {
  const body = await req.json();
  const session = await auth();
  const { password } = body;

  const commentData = await findCommentById(params.postId, params.commentId);
  const isEditable = await checkEditable(commentData, password, session);

  if (!isEditable) return NextResponse.json(false);

  const response = await client.post_comment.update({
    data: {
      is_delete: true,
    },
    where: { id: Number(params.commentId) },
  });
  return NextResponse.json(response);
}

const findCommentById = async (postId, commentId) => {
  const response = await client.post_comment.findUnique({
    select: {
      comment: true,
      password: true,
      created_at: true,
      guest_nickname: true,
      writer_id: true,
      id: true,
      is_delete: true,
      user: true,
    },
    where: { post_id: Number(postId), id: Number(commentId) },
  });
  return response;
};

const checkEditable = async (commentData, password, session) => {
  let isEditable = false;
  if (commentData?.guest_nickname) {
    isEditable = await compare(password, commentData.password);
  } else if (commentData?.writer_id) {
    isEditable = session?.user?.id == commentData?.writer_id;
  }
  return isEditable;
};
