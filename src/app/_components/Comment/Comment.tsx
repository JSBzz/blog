"use client";

import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export default function Comment({ session, postId }: { session: Session; postId: string }) {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["POST", "COMMENT", postId],
    queryFn: async () => {
      const responseComment = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/post/${postId}/comment`
      );
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
