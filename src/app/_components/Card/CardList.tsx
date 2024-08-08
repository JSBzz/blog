"use client";

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import Card from "./Card";
import React, { useEffect, useState } from "react";
import CardSkeleton from "./CardSkeleton";

export default function CardList() {
  const fetchPage = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(`http://localhost:3000/api/post?cursor=${pageParam}`, {
      method: "get",
    });
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
  return (
    <div>
      {data?.pages.map((group, i) => {
        return (
          <div key={`list-group-${i}`}>
            {group?.data?.map((data: any) => {
              return (
                <div key={`data-${data.id}`} className="mt-8">
                  <Card data={data} />
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
