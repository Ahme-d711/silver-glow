"use client";

import { VerifyForm } from "../components/VerifyForm";
import { AuthFooter } from "../components/AuthFooter";
import { motion } from "framer-motion";
import { Suspense } from "react";
import RightSide from "../components/RightSide";

export function VerifyTemplate() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center min-h-screen w-full relative"
    >
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-12 py-10">
        <div className="mx-auto w-full">
          <Suspense fallback={null}>
            <VerifyForm />
          </Suspense>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <RightSide />

      <AuthFooter />
    </motion.div>
  );
}
