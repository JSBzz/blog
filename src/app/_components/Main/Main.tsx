import Link from "next/link";
import PostCategory from "../Post/PostCategory";
import { TagListAll } from "../Tag/TagList";
import CardList from "../Card/CardList";
import { auth } from "@/app/config/next-auth/auth";
import SearchBar from "../Common/SearchBar";

export default async function Main({
  categoryCode,
  tagName,
  searchParam = null,
}: {
  categoryCode: string;
  tagName: string;
  searchParam: null | string;
}) {
  const session = await auth();

  categoryCode = categoryCode ?? "ALL";
  tagName = tagName ?? "ALL";



  return (
    <div className="h-full  w-[100%] flex flex-col items-center ">
      <div className="border-b-2 mb-2 text-center font-bold text-3xl flex m-auto max-w-48 mt-4 mb-4">
        <div className="z-40 mt-4">
          <PostCategory
            selectedCategory={categoryCode}
            selectedTag={tagName}
          />
        </div>
      </div>
      <div className="w-[340px] md:w-[640px] sm:w-[450px]">
        <div className="text-center">
          <h1 className="text-slate-500">TAGS</h1>
          <div className="flex p-1  rounded-lg flex-wrap gap-y-2 justify-center">
            <TagListAll
              selectedTagName={tagName}
              selectedCategoryCode={categoryCode}
            />
          </div>
        </div>
        <SearchBar href={`/post/filter/${tagName}/${categoryCode}`} />
        {searchParam && (
          <div className="text-center text-gray-500 p-2 text-xl">Search : {searchParam}</div>
        )}
        <div className="flex flex-col m-auto w-fit">
          <div className="text-right">
            {session?.user?.role == "admin" ? (
              <Link
                href={`${process.env.NEXT_PUBLIC_ROOT_URL}/post/create-post`}
                className="bg-slate-300 text-slate-700 p-2 rounded-md pt-1 pb-1 mb-2 border-b-2 border-r-2 border-slate-400 active:border-0 h-8"
              >
                작성
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-8 w-[340px] md:w-[640px] sm:w-[450px]">
            <CardList categoryCode={categoryCode} tagName={tagName} searchParam={searchParam} />
          </div>
        </div>
      </div>
    </div>
  );
}
