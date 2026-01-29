"use client";

import { RegisterForm } from "../components/RegisterForm";
import { AuthFooter } from "../components/AuthFooter";
import { useRegister } from "../hooks/useRegister";
import { motion } from "framer-motion";
import RightSide from "../components/RightSide";

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
      <RightSide />

      <AuthFooter />
    </motion.div>
  );
}
