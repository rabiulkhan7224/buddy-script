"use client";
import { cn } from "@/lib/utils";
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
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps extends React.ComponentProps<"div"> {
  onSubmit: () => void;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting?: boolean;
}

export function LoginForm({
  className,
  onSubmit,
  register,
  errors,
  isSubmitting,
  ...props
}: LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-1">
            <Image src="/images/Logo.svg" height={200} width={200} className="object-cover mx-auto" alt="logo" />
            
          </div>
          <CardDescription className="text-center">Welcome back</CardDescription>
          <CardTitle className="text-xl font-semibold text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-2">
            <FieldGroup className="space-y-1.5">
                 
                

                <Button variant="outline" className="w-full text-md " type="button">
                  <FcGoogle className="size-6 mr-2" />
                  Continue with Google
                </Button>
                <div className="flex items-center my-1">
    <div className="flex-1 border-b border-gray-300"></div>
    <span className="px-4 text-gray-500 text-sm">Or</span>
    <div className="flex-1 border-b border-gray-300"></div>
</div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email")}
                  className="h-10"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </Field>

              <Field>
                <Button
                  className="w-full text-white text-lg bg-primary hover:bg-primary/90 h-10"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/sign-up" className="underline">
                    Sign up
                  </a>
                </FieldDescription>

               
              </Field>
            </FieldGroup>
          </form>

        
        </CardContent>
      </Card>
    </div>
  );
}