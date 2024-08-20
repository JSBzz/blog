import { auth } from "@/app/config/next-auth/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/config/prisma/db";

const client = prisma;

export async function GET(request: NextRequest) {
  const cursor = request?.nextUrl?.searchParams.get("cursor");
  const categoryCode = request?.nextUrl?.searchParams.get("categoryCode");
  const tagName = request?.nextUrl?.searchParams.get("tagName");
  const sort = request?.nextUrl?.searchParams.get("sort");

  let tagQuery = {};
  let categoryQuery = {};

  if (categoryCode != "ALL")
    categoryQuery = {
      category: {
        OR: [
          {
            category_code: categoryCode,
          },
          {
            parent_category_code: categoryCode,
          },
        ],
      },
    };
  if (tagName != "ALL") tagQuery = { post_tag: { some: { tag_name: tagName } } };

  try {
    const response = await client.post.findMany({
      include: {
        user: { select: { id: true, nickname: true, role: true } },
        category: true,
        post_tag: true,
      },
      where: {
        id: cursor == "0" ? { gt: Number(cursor) } : { lt: Number(cursor) },
        ...categoryQuery,
        ...tagQuery,
      },
      orderBy: { id: "desc" },
      take: 5,
    });
    let nextCursor = response.length < 5 ? null : Number(response[response.length - 1].id);
    return NextResponse.json({ data: response, nextCursor: nextCursor });
  } catch (e) {}
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
        category_code: body?.subCategory,
        writer_seq: session?.user?.seq,
      },
    });
    await client.post_tag.createMany({
      data: body?.tags.map((tag: string) => {
        return {
          table_id: response.id,
          tag_name: tag,
        };
      }),
    });
    return NextResponse.json({ response });
  } catch (e) {
    console.log("e: ", e);
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();
  const body = await request.json();

  try {
    const response = await client.post.update({
      data: {
        contents: body.contents,
        title: body.title,
        title_slug: body.title.replaceAll(" ", "-"),
        category_code: body.subCategory,
        writer_seq: session?.user?.seq,
      },
      where: { id: body?.postId },
    });
    await client.post_tag.createMany({
      data: body?.tags.map((tag: string) => {
        return {
          table_id: response.id,
          tag_name: tag,
        };
      }),
    });
    return NextResponse.json({});
  } catch (e) {}
}
