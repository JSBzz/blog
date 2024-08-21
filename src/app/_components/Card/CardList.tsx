"use client";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import CardBox from "./CardBox";
import React, { useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";

export default function CardList({
  categoryCode,
  tagName,
  searchParam,
}: {
  categoryCode: string;
  tagName: string;
  searchParam: string;
}) {
  const fetchPage = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/post?cursor=${pageParam}&categoryCode=${categoryCode}&tagName=${tagName}&searchParam=${searchParam}`,
      {
        method: "get",
      }
    );
    return res.json();
  };

  const { data, status, fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["list"],
      queryFn: fetchPage,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    });

  useEffect(() => {
    const clientScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight && !isFetching) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", clientScroll);

    return () => window.removeEventListener("scroll", clientScroll);
  }, [isFetching]);

  if (status == "pending") {
    return (
      <>
        <div className="mt-8">
          <CardSkeleton />
        </div>
        <div className="mt-8">
          <CardSkeleton />
        </div>
        <div className="mt-8">
          <CardSkeleton />
        </div>
      </>
    );
  }
  if (data?.pages[0]?.data?.length == 0) {
    return <div className="text-center mt-4">작성된 글이 없습니다.</div>;
  }
  return (
    <div>
      {data?.pages.map((group, i) => {
        return (
          <div key={`list-group-${i}`}>
            {group?.data?.map((data: any) => {
              return (
                <div key={`data-${data.id}`} className="mt-8">
                  <CardBox data={data} />
                </div>
              );
            })}
          </div>
        );
      })}
      <div>
        {isFetching && isFetchingNextPage ? (
          <div className="mt-8">
            <CardSkeleton />
          </div>
        ) : null}
      </div>
      <div className="text-center p-4">{!hasNextPage && "Last Post"}</div>
    </div>
  );
}
