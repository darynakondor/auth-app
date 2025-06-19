import { ButtonType } from "@/enums/ButtonType";
import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: ButtonType;
  className?: string;
}

function Button({
  children,
  onClick,
  type = ButtonType.Button,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-color-btn text-color-dark ${styles.btn + className}`}
      onClick={onClick}
    >
      <span className={styles.btnText}>{children}</span>
    </button>
  );
}

export default Button;
