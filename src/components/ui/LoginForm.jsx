"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import InputBox from "@/components/ui/InputBox";
import FormButton from "@/components/ui/FormButton";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { usePageTheme } from "@/components/ThemeProvider";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [userLoginId, setuserLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const pgTheme = usePageTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      userLoginId,
      password,
    });

    // console.log(userLoginId, password);
    // console.log(result);

    if (result.error) {
      setError("Invalid credentials");
      setShowModal(true); // 에러가 발생하면 모달을 표시
    } else {
      // const session = await getSession();
      // console.log("세션 데이터:", session);
      redirect(`/home`);
    }
  };

  const closeModal = () => setShowModal(false); // 모달 닫기

  return (
    <div
      className={clsx("flex items-center justify-center min-h-screen", pgTheme)}
    >
      <div className='p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-16'>Note App</h1>
        <form onSubmit={handleSubmit}>
          {/* <div className='py-5'> */}
          {/* id input */}
          <InputBox
            type={"text"}
            placeholder={"id"}
            value={userLoginId}
            onChange={setuserLoginId}
          />
          {/* password input */}
          <InputBox
            type={"password"}
            placeholder={"password"}
            value={password}
            onChange={setPassword}
          />
          {/* </div> */}
          {/* Login button */}
          <FormButton label={"Login"} />
        </form>
        <form action='/register/' className='w-full p-8'>
          <div className='flex justify-center mt-auto'>
            <FormButton label={"Register"} />
          </div>
        </form>
      </div>

      {/* 에러 발생 시 모달 팝업 */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-md max-w-sm w-full'>
            <h3 className='text-xl font-semibold text-center'>Error</h3>
            <p className='text-center text-red-500 my-4'>{error}</p>
            <div className='flex justify-center'>
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
