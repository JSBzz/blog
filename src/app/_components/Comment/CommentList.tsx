import CommentBox from "./CommentBox";

export default function CommentList({ commentList, session }: { commentList: any; session: any }) {
  return (
    <div>
      {commentList.map((comment: any) => {
        return <CommentBox key={`comment-${comment.id}`} data={comment} session={session} />;
      })}
    </div>
  );
}
