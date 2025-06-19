"use client";
import React from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import Input from "@/components/Input";
import { InputType } from "@/enums/InputType";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import Button from "@/components/Button";
import { ButtonType } from "@/enums/ButtonType";
import Link from "next/link";

function AuthForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailErrors,
    passwordErrors,
    submit,
    validateForm,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
  } = useAuthForm();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <Input
          onBlur={() => {
            validateForm("email", email);
          }}
          type={InputType.Email}
          name="email"
          placeholder="example@example.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        {emailErrors && <span className="">{emailErrors}</span>}
        <Input
          onBlur={() => {
            validateForm("password", password);
          }}
          name="password"
          placeholder="******"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {passwordErrors && <span className="">{passwordErrors}</span>}
        <Button type={ButtonType.Submit}>Увійти</Button>
      </form>
      <p>
        Ще немає аккаунту? <Link href="/register">Зареєструватися</Link>
      </p>
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => {
          setIsSuccessPopupOpen(false);
        }}
      />
    </>
  );
}

export default AuthForm;
