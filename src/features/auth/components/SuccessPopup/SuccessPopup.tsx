import Modal from "@/components/Modal/Modal";
import React from "react";
import { useAuthStore } from "../../store/useAuthStore";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function SuccessPopup({ isOpen, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>Дякуємо, {user}! Ваша авторизація успішна</div>
    </Modal>
  );
}

export default SuccessPopup;
