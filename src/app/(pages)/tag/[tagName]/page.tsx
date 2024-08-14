import CardList from "@/app/_components/Card/CardList";
import { Tag } from "@/app/_components/Tag/Tag";
import { TagListAll } from "@/app/_components/Tag/TagList";
import Link from "next/link";

export default async function Home({ params }: { params: { tagName: string } }) {
  const tagResponse = await fetch("http://localhost:3000/api/post/tag", {
    method: "get",
  });
  const tagList = await tagResponse.json();

  return (
    <div className="h-full  w-[100%] flex flex-col items-center">
      <div className="border-b-2 mb-2 text-center font-bold text-3xl flex m-auto max-w-48">
        <select className="mt-7">
          <option>All</option>
        </select>
      </div>
      <div className="w-[176px]  min-w-[300px] md:w-[640px]">
        <div className="text-center">
          <h1 className="text-slate-500">TAGS</h1>
          <div className="flex p-1  rounded-lg flex-wrap gap-y-2 justify-center">
            <TagListAll
              tagList={tagList}
              selectedTagName={params.tagName}
              selectedCategoryCode="ALL"
            />
          </div>
        </div>
        <div className="flex flex-col m-auto w-fit">
          <div className="text-right">
            <Link
              href={"http://localhost:3000/post/create-post"}
              className="bg-slate-300 text-slate-700 p-2 rounded-md pt-1 pb-1 mb-2 border-b-2 border-r-2 border-slate-400 active:border-0 h-8"
            >
              작성
            </Link>
          </div>
          <div className="mb-8 md:w-[640px]">
            <CardList categoryCode={"ALL"} tagName={params?.tagName} />
          </div>

          {/* <div className="mb-8">
          <CardSkeleton />
        </div> */}
          {/* <div className="mb-8">
          <CardSkeleton />
        </div> */}
        </div>
      </div>
    </div>
  );
}
