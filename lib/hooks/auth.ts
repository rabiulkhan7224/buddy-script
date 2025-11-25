"use client";

import { useGetMeQuery } from "../redux/features/auth/authApi";


interface UserData {
    _id:string
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  profilePicture?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
}

interface CurrentUserHook {
  user: UserData | null;
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
}


export const useCurrentUser = (): CurrentUserHook => {
  const { data, isLoading, isError } = useGetMeQuery({});

  // Extract user data
  const user = data?.data || null;

  // Derive status flags
  const isAuthenticated = !!user;


  return {
    user,
    isLoading,
    isError,
    isAuthenticated,
    
  };
};