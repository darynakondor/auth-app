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
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  errors?: string[];
  displayError?: string;
  forceShowError?: boolean;
}

function Input({
  type = InputType.Text,
  name,
  value,
  placeholder = "",
  onChange,
  className = "",
  onBlur,
  onFocus,
  label = "",
  errors = [],
  displayError = "",
  forceShowError = false,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [wasBlurred, setWasBlurred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [wasTooltipClosedManually, setWasTooltipClosedManually] =
    useState(false);
  const inputId = useId();

  const isPassword = type === InputType.Password;
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  useEffect(() => {
    if ((wasBlurred || forceShowError) && errors.length > 0) {
      if (!wasTooltipClosedManually) {
        setShowTooltip(true);
      }
      setWasBlurred(false);
    }
  }, [errors, wasBlurred, wasTooltipClosedManually, forceShowError]);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setWasBlurred(true);
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setShowTooltip(false);
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (errors.length > 0) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

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
          onBlur={handleBlur}
          onFocus={handleFocus}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`bg-color-input ${styles.inp} ${styles[className]}`}
        />

        {isPassword && errors.length === 0 && (
          <button
            type="button"
            className={`absolute ${styles.btn}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
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
              onMouseLeave={() => setShowTooltip(false)}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
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
              content={
                errors.length > 0
                  ? isFocused
                    ? errors
                    : displayError
                    ? [displayError]
                    : errors
                  : []
              }
              onClose={() => {
                setWasTooltipClosedManually(true);
                setShowTooltip(false);
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
