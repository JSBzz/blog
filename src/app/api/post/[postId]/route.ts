import prisma from "@/app/config/prisma/db";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const response = await client.post.findUnique({
      where: { id: Number(params.postId) },
      include: { category: true, post_tag: true },
    });
    return NextResponse.json(response);
  } catch (e) {
    console.log("e: ", e);
  }
}
