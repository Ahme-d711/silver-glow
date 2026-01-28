"use client";

import Image from "next/image";
import { LoginForm } from "../components/LoginForm";
import { AuthFooter } from "../components/AuthFooter";
import { useLogin } from "../hooks/useLogin";
import { motion } from "framer-motion";

export function LoginTemplate() {
  const { login, loading } = useLogin();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center min-h-screen w-full relative"
    >
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

      <AuthFooter />
    </motion.div>
  );
}
