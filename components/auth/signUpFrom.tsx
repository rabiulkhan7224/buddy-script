"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signupSchema, type SignupInput } from "@/lib/validation/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      // Future: Replace with API call
      console.log("Signup data:", data);
      toast.success("Account created successfully! 🚀");
      reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="
    flex flex-col gap- w-full max-w-md"
    >
      <Card {...props}>
        <CardHeader>
          <div className="flex items-center gap-">
            <Image
              src="/images/Logo.svg"
              height={200}
              width={200}
              className="object-cover mx-auto"
              alt="logo"
            />
          </div>
          <CardDescription className="text-center">
            Get Started Now
          </CardDescription>
          <CardTitle className="text-xl font-semibold text-center">
            Registration
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Button
                variant="outline"
                className="w-full text-md "
                type="button"
              >
                <FcGoogle className="size-6 mr-2" />
                Continue with Google
              </Button>
              <div className="flex items-center my-">
                <div className="flex-1 border-b border-gray-300"></div>
                <span className="px-2 text-gray-500 text-sm">Or</span>
                <div className="flex-1 border-b border-gray-300"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Field>
                  <FieldLabel>First Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.firstName.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Last Name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-0.5">
                      {errors.lastName.message}
                    </p>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-0.5">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-0.5">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-0.5">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              <FieldGroup>
                <Field>
                  <Button
                    className="bg-primary w-full text-white text-lg hover:bg-primary/90 h-10"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Account"}
                  </Button>

                  <FieldDescription className="px-6 text-center">
                    Already have an account? <Link href="/login">Login</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
