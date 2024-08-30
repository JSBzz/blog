import "@/app/config/tiptab/style.scss";
import PostHeader from "@/app/_components/Post/PostHeader";
import PostContents from "@/app/_components/Post/PostContents";
import { auth } from "@/app/config/next-auth/auth";
import Comment from "@/app/_components/Comment/Comment";
import Link from "next/link";

export async function generateMetadata({ params }: any) {
  return {
    title: decodeURI(`${params?.postSlug} - JSB Blog`),
    description: `Post : ${params?.postSlug}`,
  };
}

export default async function PostPage({
  params,
}: {
  params: { postId: string; postSlug: string };
}) {
  generateMetadata(params);
  const session = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/post/${params.postId}`);
  const data = await response.json();
  if (!data) return <>404 Not Found</>;
  return (
    <div>
      <div className=" w-[320px] sm:w-[500px] md:w-[700px] m-auto">
        <div className="mt-4 mb-4">
          <div className="m-auto">
            <PostHeader data={data} />
            <PostContents data={data} />
            {(session?.user && session?.user?.id == data?.user?.id) ||
            session?.user?.role == "admin" ? (
              <div>
                <button className="mt-1 text-right bg-gray-200 text-gray-800 rounded-md pr-1 pl-1 mr-2">
                  <Link href={`${process.env.NEXT_PUBLIC_ROOT_URL}/post/${params.postId}/edit`}>
                    수정
                  </Link>
                </button>
                <button
                  className="bg-gray-200 text-gray-800 rounded-md pr-1 pl-1"
                  // onClick={async () => {
                  //   await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/post/${params.postId}`, {
                  //     method: "delete",
                  //   });
                  // }
                  // }
                >
                  삭제
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Comment session={session} postId={params?.postId} />
      </div>
    </div>
  );
}
