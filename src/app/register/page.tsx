import SignUpForm from "@/features/auth/components/SignUpForm/SignUpForm";
import React from "react";

export const metadata = {
  title: "Реєстрація",
  description:
    "Створи акаунт і стань частиною чогось великого (або просто увійди).",
};

function Page() {
  return (
    <main className="sign-up">
      <div className="container">
        <SignUpForm />
      </div>
    </main>
  );
}

export default Page;
