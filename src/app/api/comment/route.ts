import prisma from "@/app/config/prisma/db";
import { genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(req: NextRequest) {
  const postId = req?.nextUrl?.searchParams.get("postId");
  const response = await client.post_comment.findMany({
    select: {
      comment: true,
      created_at: true,
      guest_nickname: true,
      writer_id: true,
      id: true,
      is_delete: true,
      user: true,
    },
    where: { post_id: Number(postId) },
  });

  return NextResponse.json(response);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, nickname, password, comment, postId } = body;
  let hashPassword = "";
  if (password) {
    const salt = await genSalt(10);
    hashPassword = await hash(password, salt);
  }
  await client.post_comment.create({
    data: {
      comment: comment,
      writer_id: userId,
      post_id: postId,
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
      post_id: postId,
    },
  });

  return NextResponse.json(response);
}
