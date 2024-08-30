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
  if(data?.length == 0 ) return <div className="m-4 text-center text-gray-400">댓글이 존재하지 않습니다!</div>
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
