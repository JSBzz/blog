"use client";

import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Category() {
  const [selectedMain, setSelectedMain] = useState("");
  const [insertTarget, setInsertTarget] = useState("main");
  const [category, setCategory] = useState({ main: [], sub: [] });
  const { data, refetch } = useQuery({
    queryKey: ["CATEGORY-LIST-MAIN"],
    queryFn: async () => {
      const response = await fetch("/api/category?type=main");
      const result = await response.json();
      return result;
    },
  });
  const { data: subData, refetch: subRefetch } = useQuery({
    queryKey: ["CATEGORY-LIST-SUB"],
    queryFn: async () => {
      const response = await fetch("/api/category?type=sub");
      const result = await response.json();
      return result;
    },
  });

  useEffect(() => {
    if (data && subData) {
      setCategory({ main: data, sub: subData });
      if (!selectedMain) {
        setSelectedMain(data[0].category_code);
        console.log("data[0].category_code: ", data[0].category_code);
        console.log(selectedMain);
      }
    }
  }, [data, subData]);
  const { mutate } = useMutation({
    mutationFn: async () => {
      await fetch("/api/category", {
        method: "post",
        body: JSON.stringify({
          categoryName: categoryName,
          categoryCode: categoryName.toUpperCase().replaceAll(" ", "_"),
          parentCategoryCode: insertTarget == "sub" ? selectedMain : null,
        }),
      });
    },
    onSuccess: () => {
      setCategoryName("");
      refetch();
      subRefetch();
    },
  });
  const [categoryName, setCategoryName] = useState("");
  return (
    <div className="flex">
      <div className="flex m-auto">
        <div className="flex-col flex mt-2">
          메인 카테고리
          <div className="bg-slate-100 min-h-44 p-1 rounded-md w-64 mr-4">
            {category.main?.map((category: any, idx: number) => {
              return (
                <div
                  className="border-b-2 border-b-white w-full"
                  key={`category-${idx}`}
                  onClick={() => {
                    setSelectedMain(category?.category_code);
                  }}
                >
                  {`${category?.category_name} (${category?.category_code}) ${
                    selectedMain == category.category_code ? " - selected" : ""
                  }`}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-col flex mt-2">
          서브 카테고리
          <div className="bg-slate-100 min-h-44 p-1 rounded-md">
            {category.sub?.map((category: any, idx: number) => {
              if (category.parent_category_code == selectedMain) {
                return (
                  <div className="border-b-2 border-b-white w-full" key={`category-${idx}`}>
                    {`${category?.category_name} (${category?.category_code})`}
                  </div>
                );
              }
            })}
          </div>
          <div>
            CODE
            <span className="border w-fit mt-1 ml-1 p-1">
              {categoryName.toUpperCase().replaceAll(" ", "_")}
            </span>
          </div>
          <input
            value={categoryName}
            className="border mt-1 p-1"
            placeholder="카테고리명 입력"
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <div>
            Main
            <input
              type="radio"
              checked={insertTarget == "main"}
              className="mr-4"
              value={"main"}
              onChange={(e) => {
                setInsertTarget(e.target.value);
              }}
            />
            Sub
            <input
              type="radio"
              checked={insertTarget == "sub"}
              value={"sub"}
              onChange={(e) => {
                setInsertTarget(e.target.value);
              }}
            />
            {insertTarget == "sub" ? (
              <div>
                <span className="text-slate-500">
                  Selected Main Category -
                  <span className="font-bold text-black"> {selectedMain}</span>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            className="bg-slate-100 rounded-md border mt-2"
            onClick={() => {
              if (categoryName != "") {
                mutate();
              }
            }}
          >
            카테고리 추가
          </button>
        </div>
      </div>
    </div>
  );
}
