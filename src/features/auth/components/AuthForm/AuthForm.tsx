"use client";
import React from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import Input from "@/components/Input/Input";
import { InputType } from "@/enums/InputType";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import Button from "@/components/Button/Button";
import { ButtonType } from "@/enums/ButtonType";
import Link from "next/link";
import styles from "./AuthForm.module.css";

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
    <div className={styles.formСontainer}>
      <h1 className={`${styles.title} fz-l`}>Увійти</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.inputs} flex-container`}>
          <div className={styles.inpContainer}>
            <Input
              label="Email"
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
          </div>
          <div className={styles.inpContainer}>
            <Input
              label="Пароль"
              onBlur={() => {
                validateForm("password", password);
              }}
              name="password"
              placeholder="••••••"
              value={password}
              type={InputType.Password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            {passwordErrors && <span className="">{passwordErrors}</span>}
          </div>
        </div>
        <Button type={ButtonType.Submit}>Увійти</Button>
      </form>
      <p className={`flex-container jc-center ${styles.formText}`}>
        Ще немає аккаунту?{" "}
        <Link className="link text-color-link" href="/register">
          Зареєструватися
        </Link>
      </p>
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => {
          setIsSuccessPopupOpen(false);
        }}
      />
    </div>
  );
}

export default AuthForm;
