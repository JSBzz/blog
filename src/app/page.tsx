import CardList from "./_components/Card/CardList";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-full  w-[100%]">
      <div className="border-b-2 mb-4 text-center font-bold text-3xl flex m-auto max-w-48">
        <h1 className="m-auto mt-12">All</h1>
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
        <div className="mb-8">
          <CardList />
        </div>

        {/* <div className="mb-8">
          <CardSkeleton />
        </div> */}
        {/* <div className="mb-8">
          <CardSkeleton />
        </div> */}
      </div>
    </div>
  );
}
