import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@/app/config/next-auth/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { cursor: number } }) {
  const cursor = request?.nextUrl?.searchParams.get("cursor");
  try {
    const response = await client.post.findMany({
      include: { user: { select: { id: true, nickname: true, role: true } } },
      where: { id: { gt: Number(cursor) } },
      take: 5,
    });
    let nextCursor = response.length < 5 ? null : Number(response[response.length - 1].id);
    return NextResponse.json({ data: response, nextCursor: nextCursor });
  } catch (e) {
    console.log("e: ", e);
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = await request.json();

  try {
    const response = await client.post.create({
      data: {
        contents: body.contents,
        title: body.title,
        title_slug: body.title.replaceAll(" ", "-"),
        category_code: "TEST",
        writer_seq: session?.user?.seq,
      },
    });
    return NextResponse.json({});
  } catch (e) {
    console.log("e: ", e);
  }
}
