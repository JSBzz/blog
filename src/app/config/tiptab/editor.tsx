"use client";
import "./style.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { FaBold } from "react-icons/fa";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const MenuBar = ({ setPostData, postData }: { setPostData: any; postData: any }) => {
  const { editor } = useCurrentEditor();
  const [color, setColor] = useColor("#000000");
  const [colorVisible, setColorVisible] = useState(false);
  useEffect(() => {
    if (editor) {
      setPostData({ ...postData, contents: editor.getHTML() });
    }
  }, [editor?.getHTML()]);
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group border p-2 w-[300px] sm:w-[500px] flex m-auto mt-4 rounded-md md:w-[1000px]">
      <div className="button-group">
        <FaBold>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`${
              editor.isActive("bold") ? "bg-slate-400" : ""
            } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
          ></button>
        </FaBold>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${
            editor.isActive("italic") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${
            editor.isActive("strike") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`${
            editor.isActive("code") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Code
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Clear marks
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${
            editor.isActive("paragraph") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${
            editor.isActive("heading", { level: 1 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${
            editor.isActive("heading", { level: 2 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${
            editor.isActive("heading", { level: 3 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`${
            editor.isActive("heading", { level: 4 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`${
            editor.isActive("heading", { level: 5 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`${
            editor.isActive("heading", { level: 6 }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${
            editor.isActive("bulletList") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${
            editor.isActive("orderedList") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${
            editor.isActive("codeBlock") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${
            editor.isActive("blockquote") ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Redo
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${
            editor.isActive({ textAlign: "left" }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${
            editor.isActive({ textAlign: "center" }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${
            editor.isActive({ textAlign: "right" }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`${
            editor.isActive({ textAlign: "justify" }) ? "bg-slate-400" : ""
          } bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1`}
        >
          Justify
        </button>
        <button
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1"
        >
          Unset text align
        </button>
        <button className="bg-slate-200  rounded-md pl-3 pr-3 mr-2 mb-1">
          <label htmlFor="imageInput" className="cursor-pointer">
            Image Upload
          </label>
        </button>
        <input
          type="file"
          name="imageInput"
          id="imageInput"
          onChange={(e) => {
            if (e?.target?.files?.length) {
              const image = e.target.files[0];
              const urlImage = URL.createObjectURL(image);
              setPostData({
                ...postData,
                images: [...postData.images, { file: image, url: urlImage }],
              });
              editor
                .chain()
                .focus()
                .setImage({
                  src: urlImage,
                  alt: image.name,
                  title: image.name,
                })
                .run();
            }
          }}
          className="bg-slate-200 rounded-md pl-3 pr-3 mr-2 mb-1 invisible w-0 h-0"
        />
        <button
          onClick={() => {
            setColorVisible(!colorVisible);
          }}
        >
          Color Picker
        </button>
        <div className={`absolute z-30 right-10 ${!colorVisible && "invisible"}`}>
          <ColorPicker
            color={color}
            onChange={(e: any) => {
              setColor(e);
              editor.chain().focus().setColor(e.hex).run();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //@ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
];

export default function Editor({ setPostData, postData }: { setPostData: any; postData: any }) {
  return (
    <EditorProvider
      editorProps={{
        attributes: {
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border mt-4 w-[300px] sm:w-[500px] md:w-[1000px] p-2 rounded-md min-h-[500px]",
        },
      }}
      slotBefore={<MenuBar setPostData={setPostData} postData={postData} />}
      extensions={extensions}
      content={postData?.contents}
    ></EditorProvider>
  );
}
