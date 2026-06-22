"use client";

import { motion } from "framer-motion";

import { VerifyPhoneRequestForm } from "../components/VerifyPhoneRequestForm";
import RightSide from "../components/RightSide";
import { AuthFooter } from "../components/AuthFooter";

export function VerifyPhoneRequestTemplate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center min-h-screen w-full relative"
    >
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-12">
        <VerifyPhoneRequestForm />
      </div>

      <RightSide />
      <AuthFooter />
    </motion.div>
  );
}
