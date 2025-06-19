import Modal from "@/components/Modal/Modal";
import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  text?: string;
};

function SuccessPopup({
  isOpen,
  onClose,
  text = "Ваша авторизація успішна",
}: Props) {
  const user = useAuthStore((s) => s.user);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        Дякуємо, {user}! {text}
      </div>
    </Modal>
  );
}

export default SuccessPopup;
