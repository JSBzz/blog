import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@/app/config/next-auth/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const response = await client.post.findUnique({
      where: { id: Number(params.postId) },
    });
    return NextResponse.json(response);
  } catch (e) {
    console.log("e: ", e);
  }
}
