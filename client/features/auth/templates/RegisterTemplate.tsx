"use client";

import Image from "next/image";
import { RegisterForm } from "../components/RegisterForm";
import { AuthFooter } from "../components/AuthFooter";
import { useRegister } from "../hooks/useRegister";
import { motion } from "framer-motion";

export function RegisterTemplate() {
  const { register, loading } = useRegister();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center min-h-screen w-full relative"
    >
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-12 py-10 overflow-y-auto max-h-screen">
        <div className="mx-auto w-full">
          <RegisterForm register={register} loading={loading} />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="h-screen w-1/2 hidden lg:flex flex-col items-center justify-center bg-primary rounded-bl-[150px]">
        <Image 
          src="/logo.svg" 
          alt="register logo" 
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
