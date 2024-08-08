import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

const client = new PrismaClient();

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

  return NextResponse.json("hello");
}

const randomNickname = [
  "사자",
  "코끼리",
  "호랑이",
  "기린",
  "얼룩말",
  "판다",
  "캥거루",
  "곰",
  "늑대",
  "여우",
  "코뿔소",
  "하마",
  "치타",
  "표범",
  "펭귄",
  "타조",
  "독수리",
  "매",
  "앵무새",
  "공작새",
  "올빼미",
  "돌고래",
  "고래",
  "상어",
  "바다표범",
  "문어",
  "해파리",
  "게",
  "랍스터",
  "새우",
  "거북이",
  "악어",
  "알락사슴",
  "오랑우탄",
  "침팬지",
  "원숭이",
  "나무늘보",
  "아르마딜로",
  "고슴도치",
  "다람쥐",
  "토끼",
  "산토끼",
  "사슴",
  "무스",
  "엘크",
  "비스온",
  "버팔로",
  "영양",
  "가젤",
  "하이에나",
  "재규어",
  "쿠거",
  "푸마",
  "서벌",
  "독수리",
  "수리",
  "쿡카부라",
  "투칸",
  "벌새",
  "별새",
  "로빈",
  "블루 제이",
  "카나리아",
  "핀치",
  "비둘기",
  "비둘기",
  "백조",
  "오리",
  "거위",
  "칠면조",
  "메추라기",
  "노새",
  "까마귀",
  "갈매기",
  "펠리컨",
  "해오라기",
  "황새",
  "플라밍고",
  "매너티",
  "바다코끼리",
  "일각고래",
  "바다사자",
  "물개",
  "수달",
  "플라티푸스",
  "캥거루쥐",
  "미어캣",
  "웜뱃",
  "코알라",
];
