import LoginForm from "@/components/pages/login/LoginForm";
import SignUpForm from "@/components/pages/sign-up/SignUpForm";
import React from "react";

export default function page() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    //   animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="min-h-[calc(100dvh-8rem)] md:min-h-[calc(100dvh-4rem)] w-full flex">
      <div className="w-[60%] bg-slate-100 relative hidden md:flex "></div>
      <SignUpForm />
    </div>
  );
}
