import { InputType } from "@/enums/InputType";
import React, { useEffect, useId, useState } from "react";
import styles from "./Input.module.css";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import Tooltip from "../Tooltip/Tooltip";

interface InputProps {
  type?: InputType;
  name: string;
  value: string | number | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: string[];
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
  errors = [],
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputId = useId();

  const isPassword = type === InputType.Password;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  useEffect(() => {
    setShowTooltip(errors.length > 0);
  }, [errors]);

  return (
    <>
      <div className={styles.labelContainer}>
        {label && (
          <label htmlFor={inputId} className={styles.inpLabel}>
            {label}
          </label>
        )}
      </div>
      <div className="relative">
        <input
          id={inputId}
          onBlur={onBlur}
          onFocus={() => setShowTooltip(false)}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`bg-color-input ${styles.inp} ${styles[className]}`}
        />

        {isPassword && errors.length === 0 && (
          <button
            type="button"
            className={`absolute ${styles.btn}`}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        )}
        {errors.length > 0 && (
          <>
            <button
              type="button"
              className={`absolute ${styles.btnError} ${styles.btn}`}
              onMouseEnter={() => setShowTooltip(true)}
              onClick={() => setShowPassword((prev) => !prev)}
              onMouseLeave={() => setShowTooltip(false)}
              aria-label="Toggle error text visibility"
            >
              {showTooltip && isPassword ? (
                showPassword ? (
                  <FiEyeOff size={16} />
                ) : (
                  <FiEye size={16} />
                )
              ) : (
                <FiAlertCircle size={16} />
              )}
            </button>
            <Tooltip
              content={errors}
              onClose={() => {
                if (showTooltip) setShowTooltip(false);
              }}
              visible={showTooltip}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Input;
