import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  validateEmail,
  validatePassword,
  validateRepeatedPassword,
} from "../validators/authValidator";

export function useSignUpForm() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [repeatPasswordErrors, setRepeatPasswordErrors] = useState<string[]>(
    []
  );
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);

  const submit = () => {
    const isValid = validateAll();
    if (!isValid) return;
    login(email, password);

    setIsSuccessPopupOpen(true);
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setEmailErrors([]);
    setPasswordErrors([]);
    setRepeatPasswordErrors([]);
  };
  const validateForm = (
    field: "email" | "password" | "repeatPassword",
    value: string
  ) => {
    let errors: string[] = [];

    if (field === "email") {
      errors = validateEmail(value);
      setEmailErrors(errors);
    } else if (field === "password") {
      errors = validatePassword(value);
      setPasswordErrors(errors);
    } else if (field === "repeatPassword") {
      errors = validateRepeatedPassword(password, repeatPassword);
      setRepeatPasswordErrors(errors);
    }

    return errors;
  };
  const validateAll = () => {
    const emailErrs = validateEmail(email);
    const passwordErrs = validatePassword(password);
    const repeatPasswordErrors = validateRepeatedPassword(
      password,
      repeatPassword
    );
    setEmailErrors(emailErrs);
    setPasswordErrors(passwordErrs);
    setRepeatPasswordErrors(repeatPasswordErrors);
    return (
      emailErrs.length === 0 &&
      passwordErrs.length === 0 &&
      repeatPasswordErrors.length === 0
    );
  };
  const handleChange = () => {
    const validationEmail = validateEmail(email);
    setEmailErrors(validationEmail);

    const validationPassword = validatePassword(password);
    setPasswordErrors(validationPassword);
  };

  return {
    email,
    setEmail,
    password,
    repeatPassword,
    setPassword,
    setRepeatPassword,
    emailErrors,
    passwordErrors,
    submit,
    handleChange,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    validateForm,
    repeatPasswordErrors,
    setRepeatPasswordErrors,
  };
}
