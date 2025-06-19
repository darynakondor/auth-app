import { ButtonType } from "@/enums/ButtonType";
import React from "react";

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
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
