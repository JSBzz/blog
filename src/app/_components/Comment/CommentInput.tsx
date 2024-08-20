"use client";
import { randomNickname } from "@/app/api/sign-up/route";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CommentInput({
  session,
  postId,
  refetch,
}: {
  session: any;
  postId: any;
  refetch: any;
}) {
  const [userInfo, setUserInfo] = useState({
    userId: session?.user?.id ?? "",
    nickname:
      session?.user?.nickname ?? randomNickname[Math.floor(Math.random() * randomNickname.length)],
    password: "",
  });
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/post/${postId}/comment`, {
        method: "post",
        body: JSON.stringify({
          ...userInfo,
          comment: comment,
        }),
      });
      setComment("");
    },
    onSuccess: async () => {
      await refetch();
    },
  });
  const handleOnClick = () => {
    if (!userInfo?.nickname?.replaceAll(" ", "")) {
      setError("닉네임을 입력해주세요.");
      return;
    } else if (!comment?.replaceAll(" ", "")) {
      setError("내용을 입력해주세요.");
      return;
    } else if (!session?.user?.nickname) {
      if (!userInfo?.password?.replaceAll(" ", "")) {
        setError("비밀번호를 입력해주세요.");
        return;
      }
    }
    setError("");
    mutate();
  };
  useEffect(() => {
    setUserInfo({
      userId: session?.user?.id,
      nickname:
        session?.user?.nickname ??
        randomNickname[Math.floor(Math.random() * randomNickname.length)],
      password: "",
    });
  }, [session]);
  return (
    <div>
      <div className="bg-slate-50 border rounded-t-md p-1 border-r-slate-400">
        닉네임{" "}
        <input
          type="text"
          className="border"
          disabled={!!session?.user?.nickname}
          onChange={(e) => {
            setUserInfo({ ...userInfo, nickname: e.target.value });
          }}
          value={userInfo.nickname}
        />
        {"   "}
        {!session?.user?.id && (
          <>
            <>비밀번호</>{" "}
            <input
              className="border"
              type="password"
              value={userInfo.password}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
          </>
        )}
        <button
          className="bg-slate-200 rounded-br-md w-28 h-full border-b-slate-500 border-r-slate-500 border right-0"
          onClick={handleOnClick}
        >
          댓글 등록
        </button>
        {<span className="text-red-600 ml-1">{error}</span>}
      </div>
      <div className="flex h-24">
        <textarea
          className="border w-full border-b-slate-400 p-1 h-full"
          placeholder="댓글 작성"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
