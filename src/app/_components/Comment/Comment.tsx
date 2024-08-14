"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

export default function Comment({
  session,
  postId,
  commentList,
}: {
  session: any;
  postId: any;
  commentList: any;
}) {
  const [commentData, setCommentData] = useState(commentList);
  return (
    <div>
      <CommentInput session={session} postId={postId} setCommentData={setCommentData} />
      <CommentList session={session} commentList={commentData} />
    </div>
  );
}
