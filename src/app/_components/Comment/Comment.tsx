"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";

export default function Comment({
  session,
  postId,
  commentList,
}: {
  session: any;
  postId: any;
  commentList: any;
}) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["POST", "COMMENT", postId],
    queryFn: async () => {
      const responseComment = await fetch(`http://localhost:3000/api/post/${postId}/comment`);
      return await responseComment.json();
    },
  });
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <div>
      <CommentInput session={session} postId={postId} refetch={refetch} />
      <CommentList session={session} data={data} refetch={refetch} />
    </div>
  );
}
