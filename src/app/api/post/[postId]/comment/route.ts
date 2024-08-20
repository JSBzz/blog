import prisma from "@/app/config/prisma/db";
import { genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  const response = await client.post_comment.findMany({
    select: {
      comment: true,
      created_at: true,
      guest_nickname: true,
      changed_at: true,
      writer_id: true,
      id: true,
      is_delete: true,
      user: true,
      post_id: true,
    },
    where: { post_id: Number(params.postId) },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(response);
}

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const body = await req.json();
  const { userId, nickname, password, comment } = body;
  let hashPassword = "";
  if (password) {
    const salt = await genSalt(10);
    hashPassword = await hash(password, salt);
  }
  await client.post_comment.create({
    data: {
      comment: comment,
      writer_id: userId,
      post_id: Number(params?.postId),
      password: hashPassword,
      guest_nickname: userId ? "" : nickname,
    },
  });
  const response = await client.post_comment.findMany({
    select: {
      comment: true,
      created_at: true,
      guest_nickname: true,
      id: true,
      is_delete: true,
      user: true,
    },
    where: {
      post_id: Number(params?.postId),
    },
  });

  return NextResponse.json(response);
}
