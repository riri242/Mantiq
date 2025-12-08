// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // while checking auth state, show loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        جاري التحقق من حالة تسجيل الدخول...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
