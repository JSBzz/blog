"use client";
import Editor from "@/app/config/tiptab/editor";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const writePostRequest = async (postData: {
  title: string;
  contents: string;
  images: { file: File; url: string }[];
}) => {
  let uploadImageContents = postData.contents;
  if (postData.images?.length != 0) {
    const form = new FormData();
    postData?.images?.map((image, idx) => {
      console.log(postData.contents.includes(image.url));
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

export default function WritePost() {
  const router = useRouter();
  const [postData, setPostData] = useState({
    title: "",
    contents: "",
    images: [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async () => {
      await writePostRequest(postData);
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <div className="content-center object-center justify-center text-left flex flex-col">
      <input
        className="w-[300px] sm:w-[500px] md:w-[1000px] mt-4 flex m-auto border rounded-md p-2"
        onChange={(e) => {
          setPostData({ ...postData, title: e.target.value });
        }}
      />
      <Editor setPostData={setPostData} postData={postData} />
      TAGS
      <div
        contentEditable="plaintext-only"
        className="border rounded-md w-[300px] sm:w-[500px] md:w-[1000px] m-auto h-10 p-2"
        onChange={(e) => {
          console.log(e.target);
        }}
      >
        <span className="bg-blue-200 text-blue-800 rounded-md p-1">hello</span>
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
  );
}
