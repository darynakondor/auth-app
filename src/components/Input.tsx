import { InputType } from "@/enums/InputType";
import React, { useState } from "react";

interface InputProps {
  type?: InputType;
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({
  type = InputType.Text,
  name,
  value,
  placeholder = "",
  onChange,
  className = "",
  onBlur,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === InputType.Password;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <input
      onBlur={onBlur}
      type={inputType}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`inp ${className}`}
    />
  );
}

export default Input;
