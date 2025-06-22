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
    password,
    emailErrors,
    passwordErrors,
    submit,
    validateForm,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    repeatPassword,
    repeatPasswordErrors,
    handleChange,
    wasSubmitted,
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
              type={InputType.Email}
              name="email"
              placeholder="example@example.com"
              value={email}
              errors={emailErrors}
              onBlur={() => validateForm("email", email)}
              onChange={(e) => handleChange("email", e.target.value)}
              className={emailErrors.length > 0 ? "error" : ""}
              forceShowError={wasSubmitted}
            />
          </div>
          <div className={styles.inpContainer}>
            <Input
              label="Пароль"
              name="password"
              placeholder="••••••"
              value={password}
              className={passwordErrors.length > 0 ? "error" : ""}
              type={InputType.Password}
              displayError={
                !password.trim()
                  ? "Пароль обов'язковий"
                  : passwordErrors.length > 0
                  ? "Пароль має бути надійним"
                  : ""
              }
              errors={passwordErrors}
              onBlur={() => {
                validateForm("password", password);
              }}
              onChange={(e) => handleChange("password", e.target.value)}
              forceShowError={wasSubmitted}
            />
          </div>
          <div className={styles.inpContainer}>
            <Input
              label="Повтор паролю"
              name="repeatPassword"
              placeholder="••••••"
              value={repeatPassword}
              className={repeatPasswordErrors.length > 0 ? "error" : ""}
              type={InputType.Password}
              errors={repeatPasswordErrors}
              onBlur={() => validateForm("repeatPassword", repeatPassword)}
              onChange={(e) => handleChange("repeatPassword", e.target.value)}
              forceShowError={wasSubmitted}
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
