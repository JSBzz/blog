import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/config/prisma/db";

const client = prisma;

export async function GET(request: NextRequest) {
  const searchType = request?.nextUrl?.searchParams.get("type");
  let response = [];
  try {
    if (searchType == "sub") {
      response = await client.category.findMany({
        where: {
          NOT: {
            parent_category_code: null,
          },
        },
      });
    } else {
      response = await client.category.findMany({
        where: {
          parent_category_code: null,
        },
      });
    }
    return NextResponse.json(response);
  } catch (e) {
    console.log("e ERROR!!!: ", e);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const response = await client.category.create({
      data: {
        category_code: body.categoryCode,
        category_name: body.categoryName,
        parent_category_code: body.parentCategoryCode,
      },
    });
    return NextResponse.json(response);
  } catch (e) {}
}
