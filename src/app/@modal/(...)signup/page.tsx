"use client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { toast } from "react-toastify";

export default function Modal() {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({ mode: "onChange" });
  const router = useRouter();
  const password = watch("password");
  const username = watch("username");

  const password_verify = watch("password_verify");
  const onError = (error: any) => {};
  const { mutate } = useMutation({
    mutationKey: ["addUser"],
    mutationFn: async (data) => {
      const request = await toast.promise(
        fetch("/api/sign-up", { method: "post", body: JSON.stringify(data) }),
        {
          pending: "가입 요청 처리중..",
          success: "가입 성공!",
          error: "가입 중 오류가 발생했습니다.",
        }
      );
    },
    onSuccess: (data, variables, context) => {
      router.back();
    },
    onMutate: () => {},
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <div className="fixed bg-black bg-opacity-80 z-50 h-screen w-screen">
      <div className="w-full h-full flex">
        <div className="w-96 min-h-96 bg-white bg-opacity-100 rounded-md p-2 m-auto">
          <button
            onClick={() => {
              router.back();
            }}
          >
            X
          </button>
          <div className="border-b-1 border w-full"></div>
          <div className="mt-2 font-bold text-xl text-center text-gray-800">Sign Up</div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="p-4 pt-1 flex m-auto flex-col">
              <label htmlFor="userId" className="mt-2 font-bold">
                아이디 <span className="text-red-600">*</span>
              </label>
              <span className="text-red-600">{errors?.username?.message as string}</span>
              {username && !errors?.username?.message && <BiCheck color="green" />}
              <input
                type="text"
                placeholder="4자 이상 8자 이하로 입력해주세요."
                id="userId"
                className="border mt-2 rounded-md h-[44px] p-1"
                {...register("username", {
                  minLength: {
                    value: 4,
                    message: "최소 4자 이상으로 입력해주세요.",
                  },
                  maxLength: {
                    value: 8,
                    message: "최대 8자 이하로 입력해주세요.",
                  },
                  required: {
                    value: true,
                    message: "아이디를 입력해주세요.",
                  },
                })}
              />
              <label htmlFor="nickname" className="mt-2 font-bold">
                닉네임
              </label>
              <input type="text" id="nickname" className="border mt-2 rounded-md h-[44px] p-1" />
              <label htmlFor="password" className="mt-2 font-bold">
                비밀번호
                <span className="text-red-600">*</span>
              </label>
              <span className="text-red-600">{errors?.password?.message as string}</span>
              {password && !errors?.password?.message && <BiCheck color="green" />}
              <input
                type="password"
                placeholder="4자 이상 8자 이하로 입력해주세요."
                id="password"
                className="border mt-2 rounded-md h-[44px] p-1"
                {...register("password", {
                  minLength: {
                    value: 4,
                    message: "최소 4자 이상으로 입력해주세요.",
                  },
                  maxLength: {
                    value: 8,
                    message: "최대 8자 이하로 입력해주세요.",
                  },
                  required: {
                    value: true,
                    message: "비밀번호를 입력해주세요.",
                  },
                })}
              />
              <label htmlFor="password-verify" className="mt-2 font-bold">
                비밀번호 확인 <span className="text-red-600">*</span>
              </label>
              <span className="text-red-600">{errors?.password_verify?.message as string}</span>
              {password_verify && !errors?.password_verify?.message && <BiCheck color="green" />}
              <input
                type="password"
                placeholder="비밀번호와 일치하게 입력해주세요."
                id="password-verify"
                className="border mt-2 rounded-md h-[44px] p-1"
                {...register("password_verify", {
                  validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
                })}
              />
              <br />
              <button
                className={`bg-${
                  password &&
                  username &&
                  password_verify &&
                  !errors?.password_verify &&
                  !errors?.username &&
                  !errors?.password
                    ? "green"
                    : "gray"
                }-300  text-black rounded-md p-2 hover:brightness-110 font-bold mt-4 transition-all duration-200`}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
