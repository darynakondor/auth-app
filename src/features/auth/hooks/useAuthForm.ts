import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { validateEmail, validatePassword } from "../validators/authValidator";

export function useAuthForm() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const submit = () => {
    setWasSubmitted(true);
    const isValid = validateAll();
    if (!isValid) return;
    login(email, password);

    setIsSuccessPopupOpen(true);
    setEmail("");
    setPassword("");
    setEmailErrors([]);
    setPasswordErrors([]);
    setWasSubmitted(false);
  };
  const validateForm = (
    field: "email" | "password",
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
    }

    return errors;
  };

  const validateAll = () => {
    const emailErrs = validateForm("email", email, true);
    const passwordErrs = validateForm("password", password, true);
    setTouched({
      email: true,
      password: true,
    });
    setEmailErrors(emailErrs);
    setPasswordErrors(passwordErrs);
    return emailErrs.length === 0 && passwordErrs.length === 0;
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
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    emailErrors,
    passwordErrors,
    submit,
    handleChange,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    validateForm,
    wasSubmitted,
  };
}
