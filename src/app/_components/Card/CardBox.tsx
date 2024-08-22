"use client";
import Image from "next/image";
import noThumb from "../../_images/default_thumb.jpg";
import Link from "next/link";
import { useState } from "react";
import { Tag } from "../Tag/Tag";

export default function CardBox({ data }: { data: any }) {
  const { id, title, title_slug, contents, created_at, post_tag, category, subtitle } = data;
  const [error, setError] = useState(false);

  const regex = /<img\s+[^>]*src="([^"]*)"/;
  const match = regex.exec(contents);
  return (
    <div
      role="listitem"
      className="md:flex shadow-md md:h-[247px] dark:bg-zinc-700 rounded-md bg-white"
    >
      <div className="flex items-center justify-center min-w-[247px] min-h-[247px] sm:h-56 relative  bg-slate-200 rounded-md overflow-hidden md:rounded-l-md md:rounded-tr-none md:rounded-br-none">
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
        <div className="mt-3">
          <Link
            href={`/post/filter/ALL/${category?.category_code}`}
            className="m-4 text-slate-500 mt-2 h-8 dark:text-slate-400"
          >
            {category?.category_name}
          </Link>
        </div>
        <Link href={`/post/${id}/${title_slug}`}>
          <section className="w-48 pl-4 ">
            <h1 className="text-2xl font-bold w-[300px] truncate mb-2 mt-1">{title}</h1>
            {/* <h2 className="text-slate-500">{user.nickname}</h2> */}
          </section>
          <section className="h-16 max-w-[420px] md:max-w-[350px] flex-grow text-ellipsis text-[#8a8a8a] break-words md:h-24 dark:text-slate-400">
            <span className="line-clamp-2 pr-4 pl-4  max-w-[350px] sm:max-w-[420px] md:max-w-[380px] md:line-clamp-3">
              {subtitle ? subtitle : contents.replace(/<\/?[^>]+>/gi, "")}
            </span>
          </section>
        </Link>
        <div className="md:max-w-[320px] sm:w-96 break-words ml-4 flex flex-wrap overflow-hidden h-8">
          {post_tag.map((tag: any) => {
            return (
              <span key={`tag-${tag.id}`} className="w-fit flex flex-col">
                <Tag href={`/tag/${tag.tag_name}`} text={tag.tag_name} />
              </span>
            );
          })}
        </div>
        <div className="text-[#8a8a8a] text-sm mt-2 pl-4 p-1">{created_at}</div>
      </div>
    </div>
  );
}
