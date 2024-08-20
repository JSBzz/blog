"use client";
import PostWriteCategory from "@/app/_components/Post/Write/PostWriteCategory";
import Editor from "@/app/config/tiptab/editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const writePostRequest = async (postData: {
  title: string;
  contents: string;
  images: { file: File; url: string }[];
  tags: string[];
}) => {
  let uploadImageContents = postData.contents;
  if (postData.images?.length != 0) {
    const form = new FormData();
    postData?.images?.map((image, idx) => {
      if (postData.contents.includes(image.url)) {
        const fileName =
          image.file.name.split(".")[0] + Math.floor(Date.now() + Math.random() * 10000);
        form.append(fileName, image.file);
        uploadImageContents = uploadImageContents.replace(
          image.url,
          `https://nexttoy.s3.ap-northeast-2.amazonaws.com/${fileName}`
        );
      }
    });
    await fetch("/api/upload", {
      method: "post",
      body: form,
    });
  }
  await fetch("/api/post", {
    method: "post",
    body: JSON.stringify({ ...postData, contents: uploadImageContents }),
  });
};
const getMainCategoryRequest = async () => {
  const response = await fetch("/api/category", {
    method: "get",
  });
  return await response.json();
};

const getSubCategoryRequest = async () => {
  const response = await fetch("/api/category?type=sub", {
    method: "get",
  });
  return await response.json();
};

export default function WritePost() {
  const router = useRouter();
  const [postData, setPostData] = useState<{
    title: string;
    contents: string;
    images: { file: File; url: string }[];
    tags: string[];
    mainCategory: string;
    subCategory: string;
  }>({
    title: "",
    contents: "",
    images: [],
    tags: [],
    mainCategory: "0",
    subCategory: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [subCategroy, setSubCategory] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async () => {
      await writePostRequest(postData);
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const main = await getMainCategoryRequest();
      const sub = await getSubCategoryRequest();
      return { main, sub };
    },
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="content-center object-center justify-center text-left flex flex-col">
      <div className="w-[300px] sm:w-[500px] md:w-[1000px] m-auto mt-4">
        <div>
          <label htmlFor="title" className="">
            제목
          </label>
          <input
            id="title"
            className=" t-4 flex w-full border rounded-md p-2"
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
        </div>
        <div className="mt-2">
          <PostWriteCategory
            categoryData={categoryData}
            postData={postData}
            subCategoryData={subCategroy}
            setPostData={setPostData}
            setSubCategory={setSubCategory}
          />
        </div>
        <Editor setPostData={setPostData} postData={postData} />
        <div className="mt-2">
          <input
            className="border w-32 mr-2 p-1 rounded-md"
            value={inputTag}
            onChange={(e) => {
              setInputTag(e.target.value);
            }}
          />
          <button
            className="bg-slate-200 p-1 rounded-md"
            onClick={() => {
              if (inputTag.replaceAll(" ", "") != "" && !postData.tags.includes(inputTag)) {
                setInputTag("");
                setPostData({ ...postData, tags: [...postData.tags, inputTag] });
              }
            }}
          >
            태그 추가
          </button>
        </div>
        <h1 className="mt-2">태그</h1>
        <div className="border m-auto p-2 gap-y-2 min-h-11">
          {postData.tags.map((tagName: string, idx) => {
            return (
              <span className="bg-slate-200 p-1 rounded-md m-1 text-wrap" key={`add-tag-${idx}`}>
                {tagName}{" "}
                <button
                  onClick={() => {
                    setPostData({
                      ...postData,
                      tags: postData.tags.filter((tag) => {
                        return tag != tagName;
                      }),
                    });
                  }}
                >
                  x
                </button>
              </span>
            );
          })}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (postData.title && postData.contents.replace("<p></p>", "")) {
              mutate();
            } else if (!postData.title) {
              setErrorMessage("제목을 입력 해 주세요");
            } else if (!postData.contents.replace("<p></p>", "")) {
              setErrorMessage("내용을 입력 해 주세요");
            }
          }}
          className="bg-slate-300 rounded-md p-1 m-auto mt-2 font-bold w-20"
        >
          작성
        </button>
        <div className="text-center text-red-600">{errorMessage}</div>
      </div>
    </div>
  );
}
