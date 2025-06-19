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
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

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
    value: string,
    touchedOverride = true
  ) => {
    let errors: string[] = [];

    if (field === "email") {
      errors = validateEmail(value);
      setEmailErrors(errors);
      if (touchedOverride) setTouched((prev) => ({ ...prev, email: true }));
    } else if (field === "password") {
      errors = validatePassword(value);
      setPasswordErrors(errors);
      if (touchedOverride) setTouched((prev) => ({ ...prev, password: true }));
    } else if (field === "repeatPassword") {
      errors = validateRepeatedPassword(password, value);
      setRepeatPasswordErrors(errors);
      if (touchedOverride)
        setTouched((prev) => ({ ...prev, repeatPassword: true }));
    }

    return errors;
  };

  const validateAll = () => {
    const emailErrs = validateForm("email", email, true);
    const passwordErrs = validateForm("password", password, true);
    const repeatPasswordErrors = validateForm(
      "repeatPassword",
      repeatPassword,
      true
    );
    setTouched({
      email: true,
      password: true,
      repeatPassword: true,
    });
    setEmailErrors(emailErrs);
    setPasswordErrors(passwordErrs);
    setRepeatPasswordErrors(repeatPasswordErrors);
    return (
      emailErrs.length === 0 &&
      passwordErrs.length === 0 &&
      repeatPasswordErrors.length === 0
    );
  };
  const handleChange = (
    field: "email" | "password" | "repeatPassword",
    value: string
  ) => {
    if (field === "email") {
      setEmail(value);
      if (touched.email) {
        const errs = validateEmail(value);
        setEmailErrors(errs);
      }
    } else if (field === "password") {
      setPassword(value);
      if (touched.password) {
        const errs = validatePassword(value);
        setPasswordErrors(errs);
      }
    } else if (field === "repeatPassword") {
      setRepeatPassword(value);
      if (touched.repeatPassword) {
        const errs = validateRepeatedPassword(password, value);
        setRepeatPasswordErrors(errs);
      }
    }
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
    touched,
    setTouched,
  };
}
