import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { auth } from "@/app/config/next-auth/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const client = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await auth();
  const formData = await request.formData();
  let response = {};

  for (const key of formData.keys()) {
    const file = formData.get(key)! as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    response = await s3.send(
      new PutObjectCommand({
        Bucket: Bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );
    console.log("response: ", response);
  }

  try {
    // s3.send(new PutObjectCommand({
    //   Bucket,
    //   Key: file[0]
    // }))
    // const response = await client.post.create({
    //   data: {
    //     contents: contents,
    //     title: title,
    //     title_slug: title.replace(" ", "-"),
    //     category_code: "TEST",
    //     writer_seq: session?.user?.seq,
    //   },
    // });
    return NextResponse.json(response);
  } catch (e) {
    console.log("e: ", e);
  }
}
