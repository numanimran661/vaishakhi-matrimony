// src/context/RouterContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface RouterContextType {
  router: ReturnType<typeof useRouter> | null;
  push: (url: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Set mounted to true after the first render to ensure client-side only access
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>; // Skip rendering until client-side

  return (
    <RouterContext.Provider
      value={{
        router,
        push: (url: string) => router.push(url),
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useCustomRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useCustomRouter must be used within a RouterProvider');
  }
  return context;
};
