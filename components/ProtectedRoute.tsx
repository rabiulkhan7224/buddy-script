// components/ProtectedRoute.tsx
'use client';

import { useCurrentUser } from '@/lib/hooks/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login'); // or '/auth/signin'
    }
  }, [user, isLoading, router]);

  // Optional: Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If no user, show nothing (redirect is happening)
  if (!user) {
    return null;
  }

  // User is authenticated → render children
  return <>{children}</>;
}