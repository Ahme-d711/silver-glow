"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/shared/FormInputField";
import { loginSchema, type LoginFormValues } from "../schemas/authSchemas";
import { toast } from "sonner";

interface LoginFormProps {
  login: (phone: string, password: string) => Promise<void>;
  loading: boolean;
}

export function LoginForm({ login, loading }: LoginFormProps) {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      console.log(data);
      
      await login(data.phone, data.password);
      toast.success("Login successful!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login";
      toast.error(errorMessage);
      form.setError("root", { message: errorMessage });
    }
  }

  return (
    <div className="w-full space-y-8 max-w-xl mx-auto">
      <div>
        <h2 className="text-[40px] font-bold text-primary">
          Sign In
        </h2>
        <p className="font-medium text-primary/60">Enter your phone number and password to sign in!</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInputField
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder=""
            type="tel"
            autoComplete="tel"
          />

          <FormInputField
            control={form.control}
            name="password"
            label="Password"
            placeholder=""
            type="password"
            autoComplete="current-password"
            helperText="It must be a combination of minimum 6 letters, numbers, and symbols."
          />

          <div className="">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full rounded-2xl text-base" disabled={loading}>
            Log In
            {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
