'use client'

import { useQuery } from "@tanstack/react-query";
import { SelectedTag, Tag } from "./Tag";


export function TagListAll({
  selectedTagName,
  selectedCategoryCode,
}: {
  selectedTagName: string | null;
  selectedCategoryCode: string;
}) {
  const {data, isLoading}=useQuery({
    queryKey:['TAG',selectedCategoryCode],
    queryFn: async () => {
      const tagResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/post/tag?categoryCode=${selectedCategoryCode}`,
        {
          method: "get",
          cache: "no-store",
        }
      );
      const tagList = await tagResponse.json();
      return tagList
    }
  })
  if(isLoading) return <div className="animate-pulse">
    <div className="flex">
      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 pt-1 pb-1 pr-2 h-[32px] min-w-20 mr-1"/>
      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 pt-1 pb-1 pr-2 h-[32px] min-w-20 mr-1"/>
      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 pt-1 pb-1 pr-2 h-[32px] min-w-20 mr-1"/>
      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 pt-1 pb-1 pr-2 h-[32px] min-w-20 mr-1"/>
      <div className="bg-gray-200 rounded-lg dark:bg-gray-700 pt-1 pb-1 pr-2 h-[32px] min-w-20 mr-1"/>
    </div>
  </div>
  return data?.map((tag: any) => {
    if (tag.tag_name == decodeURIComponent(selectedTagName)) {
      return (
        <SelectedTag
          text={`${tag?.tag_name} ${tag?._count ? "(" + tag._count + ")" : ""}`}
          key={`tag-${tag.tag_name}`}
        />
      );
    }
    return (
      <Tag
        key={`tag-${tag?.tag_name}`}
        text={`${tag?.tag_name} ${tag?._count ? "(" + tag._count + ")" : ""}`}
        href={`/post/filter/${tag?.tag_name}/${selectedCategoryCode}`}
      />
    );
  });
}

export async function TagListInPost({ tagList }: { tagList: any }) {
  return tagList.map((tag: any) => {
    return (
      <Tag
        key={`tag-${tag?.tag_name}`}
        text={`${tag?.tag_name}`}
        href={`/post/filter/${tag?.tag_name}/ALL`}
      />
    );
  });
}
