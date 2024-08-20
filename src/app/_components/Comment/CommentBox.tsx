"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const passwordVerifyRequest = async (data: any, password: string, target: string) => {
  const response = await fetch(`/api/post/${data?.post_id}/comment/${data?.id}/verification`, {
    method: "post",
    body: JSON.stringify({ password: password }),
  });
  const isValid = await response.json();
  return { isValid, target };
};

const updateCommentRequest = async (data, comment, password) => {
  const response = await fetch(`/api/post/${data?.post_id}/comment/${data?.id}`, {
    method: "put",
    body: JSON.stringify({ comment: comment, password: password }),
  });
  const editComment = await response.json();
  return editComment;
};

const deleteCommentRequest = async (data, password) => {
  const response = await fetch(`/api/post/${data?.post_id}/comment/${data?.id}`, {
    method: "delete",
    body: JSON.stringify({ password: password }),
  });
  const deleteComment = await response.json();
  return deleteComment;
};

export default function CommentBox({
  comment,
  refetch,
  session,
}: {
  comment: any;
  refetch: any;
  session: any;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [editText, setEditText] = useState(comment?.comment);

  const { mutate: updateMutate } = useMutation({
    mutationFn: async () => {
      const response = await updateCommentRequest(comment, editText, password);
    },
    onSuccess: async () => {
      await refetch();
      setEditFlag(false);
      setError("");
    },
  });

  const { mutate: deletMutate } = useMutation({
    mutationFn: async () => {
      const response = await deleteCommentRequest(comment, password);
    },
    onSuccess: async () => {
      await refetch();
      setError("");
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (target: string) => {
      if (comment?.writer_id == session?.user.id) return { isValid: true, target: target };
      return await passwordVerifyRequest(comment, password, target);
    },
    onSuccess: (e) => {
      console.log(e);
      if (e.isValid) {
        switch (e.target) {
          case "edit":
            setEditFlag(true);
            break;
          case "delete":
            deletMutate();
            break;
        }
      } else {
        setError("암호가 일치하지 않습니다.");
      }
    },
  });

  useEffect(() => {
    if (error != "" && password != "") setError("");
  }, [password]);

  const onClick = (e) => {
    if (!password && comment?.guest_nickname) {
      setError("비밀번호를 입력 해 주세요.");
    } else {
      mutate(e.target.id);
    }
  };

  return (
    <div className="border rounded-md mt-5 shadow-md">
      <div className="min-h-24 grid auto-rows-min">
        <div className="p-1 border-b justify-between flex bg-gray-100">
          {comment?.guest_nickname ? (
            <div>{comment?.guest_nickname}(GUEST)</div>
          ) : (
            <div>{comment?.user?.nickname}</div>
          )}
          <span className="text-right">
            {comment?.changed_at && (
              <span className="mr-1 text-slate-500 text-sm">
                updated at : {comment?.changed_at}
              </span>
            )}
            {comment?.created_at}
          </span>
        </div>
        {editFlag ? (
          <textarea
            className="p-1 border"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
          />
        ) : (
          <div className="p-1">
            {comment?.is_delete ? (
              <span className="text-slate-500">삭제된 댓글입니다.</span>
            ) : (
              comment?.comment
            )}
          </div>
        )}
      </div>
      <div className="text-right h-8 min-h-8">
        <span className="text-red-600">{error}</span>
        {(comment?.guest_nickname ||
          (comment?.writer_id == session?.user?.id &&
            session?.user?.id &&
            !comment?.is_delete)) && (
          <>
            {editFlag ? (
              <>
                <button
                  id="edit"
                  className="text-right pr-1 pl-1 bg-slate-200 mr-1"
                  onClick={() => {
                    if (editText != "") {
                      if (editText != comment?.comment) {
                        updateMutate();
                      } else {
                        setEditFlag(false);
                      }
                    } else {
                      setError("댓글을 입력 해 주세요.");
                    }
                  }}
                >
                  확인
                </button>
                <button
                  className="text-right pr-1 pl-1 bg-slate-200 mr-1"
                  onClick={() => {
                    setEditFlag(false);
                  }}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                {comment?.guest_nickname && (
                  <input
                    placeholder="암호"
                    type="password"
                    className="border pl-1 mr-1"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                )}
                <button
                  id="edit"
                  className="text-right pr-1 pl-1 bg-slate-200 mr-1"
                  onClick={onClick}
                >
                  수정
                </button>
                <button
                  id="delete"
                  className="text-right pr-1 pl-1 bg-slate-200 mr-1"
                  onClick={onClick}
                >
                  삭제
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
