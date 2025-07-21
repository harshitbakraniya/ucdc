"use client";

import type React from "react";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   // Check if user is logged in
  //   const checkUserLoggedIn = async () => {
  //     try {
  //       const res = await fetch("/api/auth/me")
  //       const data = await res.json()

  //       if (res.ok) {
  //         setUser(data.user)
  //       } else {
  //         setUser(null)
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user:", error)
  //       setUser(null)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   checkUserLoggedIn()
  // }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An unexpected error occurred" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
