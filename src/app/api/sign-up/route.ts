import { randomNickname } from "@/app/config/common/userNickname";
import prisma from "@/app/config/prisma/db";
import { genSalt, hash } from "bcryptjs";
import { NextResponse } from "next/server";

const client = prisma;

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;
  let nickname = body?.nickname;
  const isExistId = await client.user.findUnique({
    where: { id: username },
  });
  if (isExistId) return NextResponse.json("ExistID");

  if (!nickname) nickname = randomNickname[Math.floor(Math.random() * randomNickname.length)];
  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);
  const create = await client.user.create({
    data: { role: "user", nickname: nickname, id: username, pwd: hashPassword },
  });

  return NextResponse.json(null);
}
