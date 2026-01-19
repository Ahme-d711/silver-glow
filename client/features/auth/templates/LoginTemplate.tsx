"use client";

import Image from "next/image";
import { LoginForm } from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

export function LoginTemplate() {
  const { login, loading } = useLogin();

  return (
    <div className="flex items-center min-h-screen w-full relative">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full">
          <LoginForm login={login} loading={loading} />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="h-screen w-1/2 hidden lg:flex object-center justify-center bg-primary rounded-bl-[150px]">
        <Image 
          src="/logo.svg" 
          alt="login image" 
          width={266}
          height={365}
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute bottom-10 left-60 w-[1300] flex items-center justify-between">
        <span className="text-sm font-medium text-primary/60">© 2022 Horizon UI. All Rights Reserved. Made with love by Simmmple!</span>
        <div className="flex items-center gap-8 text-white">
          <span>Marketplace</span>
          <span>License</span>
          <span>Terms of Use</span>
          <span>Blog</span>
        </div>
      </div>
    </div>
  );
}
