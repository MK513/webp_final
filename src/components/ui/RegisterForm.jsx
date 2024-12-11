"use client";
import clsx from "clsx";
import { usePageTheme } from "@/components/ThemeProvider";
import React, { useState } from "react";
import InputBox from "@/components/ui/InputBox";
import FormButton from "@/components/ui/FormButton";
import { registerUser } from "@/actions";
import { redirect } from "next/navigation";
import BackButton from "./BackButton";

const RegisterForm = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const pgTheme = usePageTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser(userName, userId, password);
    console.log(userName, userId, password);
    redirect("/");
  };

  return (
    <div
      className={clsx("flex items-center justify-center min-h-screen", pgTheme)}
    >
      <BackButton />
      <div className='p-8 w-full max-w-sm'>
        <h1 className='text-2xl font-bold text-center mb-16'>New Account</h1>
        <form onSubmit={handleSubmit}>
          {/* username input */}
          <InputBox
            type={"text"}
            placeholder={"username"}
            value={userName}
            onChange={setUserName}
          />
          {/* id input */}
          <InputBox
            type={"text"}
            placeholder={"id"}
            value={userId}
            onChange={setUserId}
          />
          {/* password input */}
          <InputBox
            type={"password"}
            placeholder={"password"}
            value={password}
            onChange={setPassword}
          />
          {/* Login button */}
          <FormButton label={"Register"} />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
