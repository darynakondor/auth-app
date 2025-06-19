import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  });
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      className={`fixed backdrop-color ${styles.modalBackdrop}`}
      onClick={onClose}
    >
      <div
        className={`text-color-dark position-center absolute ${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`absolute ${styles.modalCloseButton}`}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
