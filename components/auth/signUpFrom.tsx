"use client";

import { useState } from "react";
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
import { Eye, EyeOff, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRegisterMutation } from "@/lib/redux/features/auth/authApi";
import { uploadToCloudinary } from "@/lib/utils";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [registerData, { isLoading: isRegistering }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  // Handle image selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      setProfileImage(imageUrl);
      setValue("profilePicture", imageUrl); // Add to form data
      toast.success("Profile picture uploaded!");
    } catch (error) {
      toast.error("Failed to upload image. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setProfileImage(null);
    setValue("profilePicture", undefined);
  };

  const onSubmit = async (data: SignupInput) => {
    try {
      const { confirmPassword, ...submitData } = data;

      const res = await registerData({
        ...submitData,
        profilePicture: profileImage || undefined,
      }).unwrap();

      console.log("Registered:", res);
      toast.success("Account created successfully!");
      reset();
      setProfileImage(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
      <Card {...props}>
        <CardHeader className="text-center">
          <Image
            src="/images/logo.svg"
            height={180}
            width={180}
            className="object-contain mx-auto mb-4"
            alt="logo"
          />
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join us today — it's free!</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Google Signup */}
            <Button variant="outline" className="w-full" type="button">
              <FcGoogle className="size-5 mr-3" />
              Continue with Google
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-border"></div>
              <span className="text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-muted-foreground/30 bg-muted/50 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>

                {/* Upload Button Overlay */}
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-white" />
                </label>

                {/* Remove Button */}
                {profileImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isUploading}
              />

              <p className="text-xs text-muted-foreground mt-3">
                {isUploading ? "Uploading..." : "Click to add profile picture"}
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input placeholder="John" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input placeholder="Doe" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="john@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </Field>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isSubmitting || isRegistering || isUploading}
            >
              {(isSubmitting || isRegistering || isUploading) ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}