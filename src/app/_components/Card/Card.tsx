"use client";
import Image from "next/image";
import noThumb from "../../_images/default_thumb.jpg";
import Link from "next/link";
import Tag from "./Tag";
import { useState } from "react";

export default function Card({ data }: { data: any }) {
  const { id, title, title_slug, contents, category_code, created_at, writer_seq, user } = data;
  const [error, setError] = useState(false);

  const regex = /<img\s+[^>]*src="([^"]*)"/;
  const match = regex.exec(contents);
  return (
    <div
      role="listitem"
      className="space-y-4 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center shadow-md"
    >
      <div className="flex items-center justify-center min-w-[247px] h-44 sm:h-56 relative bg-slate-200 rounded-t-md overflow-hidden md:rounded-l-md md:rounded-tr-none">
        <Link href={"/post/test"}>
          <Image
            alt="cat"
            onError={() => setError(true)}
            src={match?.[1] ? (error ? noThumb : match![1]) : noThumb}
            fill
            objectFit="cover"
            sizes="100vw"
          />
        </Link>
      </div>
      <div className="w-full h-full">
        <Link href={`/post/${id}/${title_slug}`}>
          <section className="w-full h-full">
            <section className="w-48 pl-4 md:pl-0 ">
              <h1 className="text-2xl mb-2 font-bold w-[360px] truncate">{title}</h1>
            </section>
            <section className="h-16 max-w-[300px] mb-2 md:max-w-[500px] flex-grow text-ellipsis text-[#8a8a8a] break-words md:h-20">
              <h1 className="line-clamp-2 pr-4 pl-4 md:pl-0 max-w-[260px] sm:max-w-[400px] md:max-w-[400px] md:line-clamp-3">
                {contents.replace(/<\/?[^>]+>/gi, "")}
              </h1>
            </section>
          </section>
        </Link>
        <div className="pl-4 md:pl-0 h-6">
          <Tag color={"red"} href="test" text="하이" />
          <Tag color={"blue"} href="test" text="바이" />
          <Tag color={"yellow"} href="test" text="!!" />
        </div>
        <div className="text-[#8a8a8a] text-sm mt-2 pl-4 md:pl-0 h-8 md:h-2">{created_at}</div>
      </div>
    </div>
  );
}
