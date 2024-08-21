import { auth } from "@/app/config/next-auth/auth";
import prisma from "@/app/config/prisma/db";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const response = await client.post.findUnique({
      where: { id: Number(params.postId) },
      include: {
        category: true,
        post_tag: true,
        user: { select: { role: true, id: true, seq: true } },
      },
    });
    return NextResponse.json(response);
  } catch (err) {
    console.log("err: ", err);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const session = await auth();
    const response = await client.post.findUnique({
      where: { id: Number(params.postId) },
      include: {
        category: true,
        post_tag: true,
        user: { select: { role: true, id: true, seq: true } },
      },
    });
    if (response.user.id == session.user.id) {
      await client.post.delete({
        where: { id: Number(params?.postId) },
      });
    }
    return NextResponse.json(response);
  } catch (err) {
    console.log("err: ", err);
  }
}
