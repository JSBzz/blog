"use client";
import PostWriteCategory from "@/app/_components/Post/Write/PostWriteCategory";
import PostWriteTag from "@/app/_components/Post/Write/PostWriteTag";
import PostWriteTitle from "@/app/_components/Post/Write/PostWriteTitle";
import Editor from "@/app/config/tiptab/editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
const getCategoryRequest = async () => {
  const response = await fetch("/api/category", {
    method: "get",
  });
  return await response.json();
};

export default function EditPost({ params }: { params: { postId: string; postSlug: string } }) {
  const router = useRouter();
  const session = useSession();
  const [postData, setPostData] = useState<{
    title: string;
    contents: string;
    images: { file: File; url: string }[];
    tags: string[];
    category: string;
  }>({
    title: "",
    contents: "",
    images: [],
    tags: [],
    category: "0",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["edit", params.postId],
    queryFn: async () => {
      const response = await fetch(`/api/post/${params.postId}`);
      const result = await response.json();
      // if (result?.writer_seq) {
      //   if (result?.writer_seq != session?.data?.user.seq) {
      //     return <>ddd</>;
      //   }
      // }
      setPostData({
        ...postData,
        title: result.title,
        contents: result.contents,
        category: result.category,
        tags: result.post_tag.map((tag: any) => {
          return tag.tag_name;
        }),
      });
      return result;
    },
  });
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
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategoryRequest();
    },
  });
  return (
    <div className="content-center object-center justify-center text-left flex flex-col">
      <div className="w-[300px] sm:w-[500px] md:w-[1000px] m-auto mt-4">
        <PostWriteTitle postData={postData} setPostData={setPostData} />
        <div className="mt-2">
          <PostWriteCategory
            postData={postData}
            setPostData={setPostData}
            categoryData={categoryData}
          />
        </div>
        {!isLoading && <Editor setPostData={setPostData} postData={postData} />}

        <PostWriteTag
          postData={postData}
          setPostData={setPostData}
          inputTag={inputTag}
          setInputTag={setInputTag}
        />
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
          수정
        </button>
        <div className="text-center text-red-600">{errorMessage}</div>
      </div>
    </div>
  );
}
