"use client";
import { LoginForm } from "@/components/auth/loginForm";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
import Image from "next/image";
// Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

   const onSubmit = async (data: LoginFormData) => {
    try {
      // Simulate API call
      console.log("Logging in with data:", data);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Login failed. Please try again.",
      });
    }
  };

 

  return (
    <div className="flex min-h-screen bg-background container mx-auto mt-16">
        {/* left side */}
        <div className="hidden md:flex md:w-1/2 lg:w-1/2">
            <Image src="/images/login.png" alt="Login Side Image" width={800} height={600} className="object-cover h-[600px] my-auto "/>
        </div>
        {/* right side */}
        <div className="flex w-full md:w-1/2 lg:w-1/3 justify-center items-center mx-auto p-8">


      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
        </div>
    </div>
  );
};

export default LoginPage;


