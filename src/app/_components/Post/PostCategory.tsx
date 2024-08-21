import Link from "next/link";

export default function PostCategory({
  categoryList,
  selectedTag,
  selectedCategory,
}: {
  categoryList: any;
  selectedTag: string;
  selectedCategory: string;
}) {
  categoryList.unshift({
    category_code: "ALL",
    category_name: "ALL",
  });
  return (
    <div>
      <div>
        <div className="hover group w-fit text-center relative">
          <div className="flex">
            <span>{selectedCategory}</span>
            <svg
              className="ml-2 w-4 h-4 transition-transform peer-hover:rotate-180 bottom-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="group-hover:bg-slate-50 invisible h-0 group-hover:visible group-hover:h-fit transition-transform rounded-md absolute  border-slate-300 border p-1 mt-2 flex-col flex top-6 left-1/2 translate-x-[-50%] text-center">
            {categoryList?.map((category: any) => {
              // if (category.category_code == selectedCategory) {
              //   return (
              //     <div
              //       key={category.catecory_code}
              //       className="text-white bg-slate-600 rounded-md pr-2 pl-2 text-xl mb-1"
              //     >
              //       {category.category_name}
              //     </div>
              //   );
              // }
              return (
                <div
                  key={category.catecory_code}
                  className="flex flex-row relative w-full text-center"
                >
                  <Link
                    href={`/post/filter/${selectedTag}/${category.category_code}`}
                    className={` rounded-md pr-2 pl-2 text-xl mb-1 relative flex flex-row peer w-full text-center z-40 ${
                      category.category_code == selectedCategory
                        ? "text-white bg-slate-600 rounded-md pr-2 pl-2 text-xl mb-1"
                        : "text-slate-500 hover:bg-slate-300"
                    }`}
                  >
                    {category.category_name}
                  </Link>
                  <div className="absolute right-2 translate-x-full hover:visible hover:h-fit invisible h-0 peer-hover:visible peer-hover:h-fit bg-slate-50 rounded-md border p-1 z-50">
                    {category?.child?.map((child: any) => {
                      return (
                        <Link
                          key={`child-${child.category_code}`}
                          href={`/post/filter/${selectedTag}/${child.category_code}`}
                          className="text-slate-500 hover:bg-slate-300 rounded-md pr-2 pl-2 text-xl mb-1 relative flex flex-row peer text-center w-full z-50"
                        >
                          {child.category_name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}