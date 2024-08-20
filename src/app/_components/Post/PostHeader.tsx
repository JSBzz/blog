import Link from "next/link";
import { Tag } from "../Tag/Tag";
import { TagListInPost } from "../Tag/TagList";

export default function PostHeader({ data }: { data: any }) {
  return (
    <div className="mb-2 w-full p-2">
      <div className="font-bold text-4xl mb-1 break-words">{data?.title}</div>
      <Link className="text-slate-600" href={`/post/filter/ALL/${data?.category_code}`}>
        {data?.category?.category_name}
      </Link>

      <div className="text-1xl text-gray-500 p-1">{data?.created_at}</div>
      <div className="mt-1">
        <TagListInPost tagList={data?.post_tag} />
      </div>
    </div>
  );
}
