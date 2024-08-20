import CommentBox from "./CommentBox";

export default function CommentList({
  data,
  session,
  refetch,
}: {
  data: any;
  session: any;
  refetch: any;
}) {
  return (
    <div>
      {data.map((comment: any) => {
        return (
          <CommentBox
            key={`comment-${comment.id}`}
            comment={comment}
            session={session}
            refetch={refetch}
          />
        );
      })}
    </div>
  );
}
