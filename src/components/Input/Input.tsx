import { InputType } from "@/enums/InputType";
import React, { useId, useState } from "react";
import styles from "./Input.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  type?: InputType;
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
}

function Input({
  type = InputType.Text,
  name,
  value,
  placeholder = "",
  onChange,
  className = "",
  onBlur,
  label = "",
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();

  const isPassword = type === InputType.Password;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex-container ${styles.inpGroup}`}>
      {label && (
        <label htmlFor={inputId} className={styles.inpLabel}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          onBlur={onBlur}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`bg-color-input ${styles.inp} ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            className={`absolute ${styles.btn}`}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
