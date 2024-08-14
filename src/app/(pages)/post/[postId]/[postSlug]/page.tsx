import "@/app/config/tiptab/style.scss";
import PostHeader from "@/app/_components/Post/PostHeader";
import PostContents from "@/app/_components/Post/PostContents";
import { auth } from "@/app/config/next-auth/auth";
import Comment from "@/app/_components/Comment/Comment";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { postId: string; postSlug: string };
}) {
  const session = await auth();
  const response = await fetch(`http://localhost:3000/api/post/${params.postId}`);
  const responseComment = await fetch(`http://localhost:3000/api/comment?postId=${params.postId}`);
  const data = await response.json();
  const commentData = await responseComment.json();
  return (
    <div>
      <div className=" w-[400px] sm:w-[500px] md:w-[1000px] m-auto">
        <div className="mt-4 mb-4">
          <div className="m-auto w-[400px] sm:w-[500px] md:w-[1000px]">
            <PostHeader data={data} />
            <PostContents data={data} />
            <div className="mt-1 text-right">
              <Link
                href={`http://localhost:3000/post/${params.postId}/edit`}
                className="bg-green-200 text-green-800 rounded-md pr-1 pl-1 mr-2"
              >
                수정
              </Link>
              <button className="bg-green-200 text-green-800 rounded-md pr-1 pl-1">삭제</button>
            </div>
          </div>
        </div>
        <Comment session={session} postId={params?.postId} commentList={commentData} />
        <div className="h-96"></div>
      </div>
    </div>
  );
}
