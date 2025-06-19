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

  const submit = () => {
    const isValid = validateAll();
    if (!isValid) return;
    login(email, password);

    setIsSuccessPopupOpen(true);
    setEmail("");
    setPassword("");
    setEmailErrors([]);
    setPasswordErrors([]);
  };
  const validateForm = (field: "email" | "password", value: string) => {
    let errors: string[] = [];

    if (field === "email") {
      errors = validateEmail(value);
      setEmailErrors(errors);
    } else if (field === "password") {
      errors = validatePassword(value);
      setPasswordErrors(errors);
    }

    return errors;
  };
  const validateAll = () => {
    const emailErrs = validateEmail(email);
    const passwordErrs = validatePassword(password);

    setEmailErrors(emailErrs);
    setPasswordErrors(passwordErrs);
    return emailErrs.length === 0 && passwordErrs.length === 0;
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
    setPassword,
    emailErrors,
    passwordErrors,
    submit,
    handleChange,
    isSuccessPopupOpen,
    setIsSuccessPopupOpen,
    validateForm,
  };
}
