import AuthForm from "@/features/auth/components/AuthForm/AuthForm";
import React from "react";

export const metadata = {
  title: "Вхід",
  description: "Авторизуйтеся, щоб продовжити.",
};

function Page() {
  return <AuthForm />;
}

export default Page;
