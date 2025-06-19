"use client";
import React from "react";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import Input from "@/components/Input/Input";
import { InputType } from "@/enums/InputType";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import Button from "@/components/Button/Button";
import { ButtonType } from "@/enums/ButtonType";
import Link from "next/link";
import styles from "./SignUpForm.module.css";

function SignUpForm() {
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
    repeatPassword,
    repeatPasswordErrors,
    setRepeatPassword,
  } = useSignUpForm();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <div className={`${styles.formContainer} position-center relative`}>
      <h1 className={`${styles.title} fz-l`}>Реєстрація</h1>
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
              errors={emailErrors}
              className={emailErrors.length > 0 ? "error" : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className={styles.inpContainer}>
            <Input
              label="Пароль"
              onBlur={() => {
                validateForm("password", password);
              }}
              name="password"
              placeholder="••••••"
              errors={passwordErrors}
              value={password}
              className={passwordErrors.length > 0 ? "error" : ""}
              type={InputType.Password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div className={styles.inpContainer}>
            <Input
              label="Повтор паролю"
              onBlur={() => {
                validateForm("repeatPassword", repeatPassword);
              }}
              name="repeatPassword"
              placeholder="••••••"
              errors={repeatPasswordErrors}
              value={repeatPassword}
              className={repeatPasswordErrors.length > 0 ? "error" : ""}
              type={InputType.Password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRepeatPassword(e.target.value)
              }
            />
          </div>
        </div>
        <Button type={ButtonType.Submit}>Зареєструватися</Button>
      </form>
      <p className={`flex-container jc-center ${styles.formText}`}>
        Вже є аккаунт?{" "}
        <Link className="link" href="/login">
          Увійти
        </Link>
      </p>
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        text="Ваша реєстрація успішна"
        onClose={() => {
          setIsSuccessPopupOpen(false);
        }}
      />
    </div>
  );
}

export default SignUpForm;
