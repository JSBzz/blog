import prisma from "@/app/config/prisma/db";
import { NextRequest, NextResponse } from "next/server";

const client = prisma;

export async function GET(request: NextRequest) {
  const categoryCode = request?.nextUrl?.searchParams.get("categoryCode");

  try {
    const response = (await client.$queryRawUnsafe(`
      SELECT tag_name, COUNT(tag_name) as _count
      FROM (
          SELECT * 
          FROM post p
          WHERE category_code IN (
              SELECT coalesce(sub.category_code, '${categoryCode}') AS target 
            FROM category main
              LEFT OUTER JOIN category sub
                ON main.category_code = sub.parent_category_code
              WHERE main.category_code = '${categoryCode}')
              ) post_list
      INNER JOIN post_tag pt
        ON post_list.id = pt.table_id
        GROUP BY tag_name`)) as any;
    const postCount =
      categoryCode == "ALL"
        ? await client.post.count()
        : await client.post.count({
            where: {
              category: {
                OR: [{ category_code: categoryCode, parent_category_code: categoryCode }],
              },
            },
          });
    console.log("postCount: ", postCount);
    response.unshift({ tag_name: "ALL", _count: postCount });
    return NextResponse.json(response);
  } catch (e) {
    console.log("e: ", e);
  }
}
