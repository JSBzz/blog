"use client";
import Tag from "@/app/_components/Card/Tag";
import { useQuery } from "@tanstack/react-query";
import "@/app/config/tiptab/style.scss";

export default function PostPage({ params }: { params: { postId: string; postSlug: string } }) {
  const { data } = useQuery({
    queryKey: ["post", params.postId, params.postSlug],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/post/${params.postId}`);
      return await response.json();
    },
  });
  if (!data) {
    return <></>;
  }
  return (
    <div className="flex mt-4 mb-4">
      <div className="m-auto w-[300px] sm:w-[500px] md:w-[1000px]">
        <div className="mb-2 w-full p-2">
          <div className="font-bold text-4xl mb-1 break-words">{data?.title}</div>

          <div className="text-1xl text-gray-500 p-1">2024-01-01</div>

          <Tag color="red" text="test" href="/" />
        </div>
        <div className="bg-slate-50">
          <div
            className="min-h-60 bg-slate-50 break-words w-full p-4 tiptap rounded-md"
            dangerouslySetInnerHTML={{ __html: data?.contents }}
          />
        </div>
      </div>
    </div>
  );
}
