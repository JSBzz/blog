"use client";
import Image from "next/image";
import noThumb from "../../_images/default_thumb.jpg";
import Link from "next/link";
import { useState } from "react";
import { Tag } from "../Tag/Tag";

export default function CardBox({ data }: { data: any }) {
  const { id, title, title_slug, contents, created_at, post_tag, category } = data;
  const [error, setError] = useState(false);

  const regex = /<img\s+[^>]*src="([^"]*)"/;
  const match = regex.exec(contents);
  return (
    <div
      role="listitem"
      className="space-y-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center shadow-md"
    >
      <div className="flex items-center justify-center min-w-[247px] h-44 sm:h-56 md:w-[200px] relative  bg-slate-200 rounded-t-md overflow-hidden md:rounded-l-md md:rounded-tr-none">
        <Link href={`/post/${id}/${title_slug}`}>
          <Image
            alt={`${id}-image`}
            onError={() => setError(true)}
            src={match?.[1] ? (error ? noThumb : match![1]) : noThumb}
            fill
            objectFit="cover"
            sizes="100vw"
          />
        </Link>
      </div>
      <div className="w-full h-full">
        <Link
          href={`/filter/post/ALL/${category?.category_code}`}
          className="sm:m-4 md:ml-0 m-4 text-slate-500"
        >
          {category?.category_name}
        </Link>
        <Link href={`/post/${id}/${title_slug}`}>
          <section className="w-full h-full">
            <section className="w-48 pl-4 md:pl-0 ">
              <h1 className="text-2xl font-bold w-[360px] truncate mb-2">{title}</h1>
              {/* <h2 className="text-slate-500">{user.nickname}</h2> */}
            </section>
            <section className="h-16 max-w-[300px] mb-2 md:max-w-[500px] flex-grow text-ellipsis text-[#8a8a8a] break-words md:h-20">
              <h1 className="line-clamp-2 pr-4 pl-4 md:pl-0 max-w-[260px] sm:max-w-[400px] md:max-w-[400px] md:line-clamp-3">
                {contents.replace(/<\/?[^>]+>/gi, "")}
              </h1>
            </section>
          </section>
        </Link>
        <div className="pl-4 md:pl-0 h-6">
          {post_tag.map((tag: any) => {
            return <Tag href={`/tag/${tag.tag_name}`} text={tag.tag_name} key={`tag-${tag.id}`} />;
          })}
        </div>
        <div className="text-[#8a8a8a] text-sm mt-2 pl-4 md:pl-0 h-8 md:h-2">{created_at}</div>
      </div>
    </div>
  );
}
