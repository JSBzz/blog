import { Session } from "next-auth";
import CommentBox from "./CommentBox";

export default function CommentList({
  data,
  session,
  refetch,
}: {
  data: any;
  session: Session;
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
