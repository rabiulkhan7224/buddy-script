"use client";
import { LoginForm } from "@/components/auth/loginForm";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z from "zod";
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
    <div>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default LoginPage;


