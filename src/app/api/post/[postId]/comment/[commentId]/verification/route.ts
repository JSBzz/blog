import prisma from "@/app/config/prisma/db";
import { compare, genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const body = await request.json();
    const { password } = body;
    const response = await client.post_comment.findUnique({
      where: { id: Number(params.commentId) },
    });
    const isCompare = await compare(password, response.password);

    return NextResponse.json(isCompare);
  } catch (err) {
    console.log("err: ", err);
  }
}
