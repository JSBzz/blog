import Link from "next/link";
import PostCategory from "../Post/PostCategory";
import { TagListAll } from "../Tag/TagList";
import CardList from "../Card/CardList";
import { auth } from "@/app/config/next-auth/auth";

export default async function Main({
  categoryCode,
  tagName,
}: {
  categoryCode: string;
  tagName: string;
}) {
  const session = await auth();
  const tagResponse = await fetch(
    `http://localhost:3000/api/post/tag?categoryCode=${categoryCode}`,
    {
      method: "get",
      cache: "no-store",
    }
  );
  categoryCode = categoryCode ?? "ALL";
  tagName = tagName ?? "ALL";
  console.log("tagName: ", tagName);

  const mainCategoryResponse = await fetch("http://localhost:3000/api/category", {
    cache: "no-store",
  });
  const subCategoryResponse = await fetch("http://localhost:3000/api/category?type=sub", {
    cache: "no-store",
  });
  const subCategoryList = await subCategoryResponse.json();
  const mainCategoryList = await mainCategoryResponse.json();
  let categoryList = mainCategoryList.map((main: any) => {
    let childList: any[] = [];
    subCategoryList.map((sub: any) => {
      if (main.category_code == sub.parent_category_code) {
        childList.push(sub);
      }
    });
    return { ...main, child: childList };
  });
  const tagList = await tagResponse.json();

  return (
    <div className="h-full  w-[100%] flex flex-col items-center ">
      <div className="border-b-2 mb-2 text-center font-bold text-3xl flex m-auto max-w-48">
        <div className="z-40 mt-4">
          <PostCategory
            categoryList={categoryList}
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
              tagList={tagList}
              selectedTagName={tagName}
              selectedCategoryCode={categoryCode}
            />
          </div>
        </div>
        <div className="flex flex-col m-auto w-fit">
          <div className="text-right">
            {session?.user?.role == "admin" ? (
              <Link
                href={"http://localhost:3000/post/create-post"}
                className="bg-slate-300 text-slate-700 p-2 rounded-md pt-1 pb-1 mb-2 border-b-2 border-r-2 border-slate-400 active:border-0 h-8"
              >
                작성
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-8 w-[340px] md:w-[640px] sm:w-[450px]">
            <CardList categoryCode={categoryCode} tagName={tagName} />
          </div>
        </div>
      </div>
    </div>
  );
}
