// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Return type
export interface UseAuthReturn {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  name: string;
  setName: (name: string) => void;
  error: string;
  setError: (msg: string) => void;
  loading: boolean;
  isSigningUp: boolean;
  setIsSigningUp: (isSigningUp: boolean) => void;
  showNameInput: boolean;
  setShowNameInput: (show: boolean) => void;
  user: User | null;
  signUp: () => Promise<{ success: boolean; error?: string }>;
  signIn: () => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completeSignUpWithName: () => Promise<{ success: boolean; error?: string }>;
}

// Arabic error messages for most Firebase auth codes
const getArabicErrorMessage = (errorCode: string): string => {
  const errorMap: Record<string, string> = {
    "auth/email-already-in-use": "هذا البريد الإلكتروني مستخدم بالفعل. الرجاء استخدام بريد آخر أو تسجيل الدخول.",
    "auth/invalid-email": "البريد الإلكتروني غير صالح. الرجاء إدخال بريد إلكتروني صحيح.",
    "auth/weak-password": "كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل.",
    "auth/user-not-found": "لا يوجد حساب بهذا البريد الإلكتروني.",
    "auth/wrong-password": "كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.",
    "auth/too-many-requests": "تم إجراء محاولات كثيرة. الرجاء الانتظار قليلاً ثم المحاولة مرة أخرى.",
    "auth/operation-not-allowed": "طريقة التسجيل هذه غير مفعّلة حالياً.",
    "auth/user-disabled": "هذا الحساب معطّل. الرجاء التواصل مع الدعم.",
    "auth/missing-password": "الرجاء إدخال كلمة المرور.",
    "auth/network-request-failed": "خطأ في الاتصال بالشبكة. الرجاء التحقق من اتصال الإنترنت.",
    "auth/popup-closed-by-user": "تم إغلاق نافذة التسجيل قبل إكمال العملية.",
    "auth/cancelled-popup-request": "تم إلغاء عملية تسجيل الدخول السابقة.",
    "auth/popup-blocked": "تم حظر النافذة المنبثقة. الرجاء السماح بالنوافذ المنبثقة للموقع.",
    "auth/account-exists-with-different-credential": "يوجد حساب بنفس البريد باستخدام طريقة تسجيل مختلفة.",
    "permission-denied": "لا تملك الصلاحية لإكمال هذه العملية.",
    default: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى لاحقاً.",
  };

  return errorMap[errorCode] || errorMap.default;
};

export const useAuth = (): UseAuthReturn => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Track current user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  // Save user to Firestore
  const saveUserToFirestore = async (
    userId: string,
    userEmail: string,
    userName: string
  ) => {
    await setDoc(
      doc(db, "users", userId),
      {
        email: userEmail,
        name: userName,
        createdAt: new Date().toISOString(),
        role: "طالب",
        enrolledCourses: [],
        progress: {},
        photoURL: "",
        lastLogin: new Date().toISOString(),
      },
      { merge: true }
    );
  };

  // Complete signup with name
  const completeSignUpWithName = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    if (!name.trim()) {
      const msg = "الرجاء إدخال اسمك الكامل";
      setError(msg);
      return { success: false, error: msg };
    }

    setLoading(true);
    setError("");

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("no-user");
      }

      await updateProfile(currentUser, { displayName: name });

      await saveUserToFirestore(
        currentUser.uid,
        currentUser.email || email,
        name
      );

      setShowNameInput(false);
      setIsSigningUp(false);
      setName("");
      setError("");

      return { success: true };
    } catch (err: any) {
      const code = err.code || "default";
      const msg =
        getArabicErrorMessage(code) || "فشل في إكمال عملية التسجيل.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email/password
  const signUp = async (): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      const msg = "الرجاء إدخال كل من البريد الإلكتروني وكلمة المرور.";
      setError(msg);
      return { success: false, error: msg };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "البريد الإلكتروني غير صالح. الرجاء إدخال بريد صحيح.";
      setError(msg);
      return { success: false, error: msg };
    }

    if (password.length < 6) {
      const msg = "كلمة المرور يجب أن تكون ٦ أحرف على الأقل.";
      setError(msg);
      return { success: false, error: msg };
    }

    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Move to name step
      setShowNameInput(true);
      setIsSigningUp(true);
      setError("");

      return { success: true };
    } catch (err: any) {
      const code = err.code || "default";
      const msg =
        getArabicErrorMessage(code) || "حدث خطأ أثناء عملية التسجيل.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      const msg = "الرجاء إدخال كل من البريد الإلكتروني وكلمة المرور.";
      setError(msg);
      return { success: false, error: msg };
    }

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await setDoc(
            doc(db, "users", currentUser.uid),
            { lastLogin: new Date().toISOString() },
            { merge: true }
          );
        } catch {
          // ignore lastLogin failure
        }
      }

      setError("");
      return { success: true };
    } catch (err: any) {
      const code = err.code || "default";
      const msg =
        getArabicErrorMessage(code) || "حدث خطأ أثناء تسجيل الدخول.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Google sign in
  const signInWithGoogle = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      try {
        await saveUserToFirestore(
          user.uid,
          user.email || "",
          user.displayName || user.email?.split("@")[0] || "مستخدم"
        );
      } catch (firestoreError: any) {
        const code = firestoreError.code || "default";
        if (code !== "permission-denied") {
          console.log("ملاحظة: تعذر حفظ بيانات المستخدم في Firestore.");
        }
      }

      setError("");
      return { success: true };
    } catch (err: any) {
      const code = err.code || "default";
      const msg =
        getArabicErrorMessage(code) ||
        "حدث خطأ أثناء التسجيل باستخدام Google.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setShowNameInput(false);
      setIsSigningUp(false);
    } catch (err: any) {
      setError("حدث خطأ أثناء تسجيل الخروج. الرجاء المحاولة مرة أخرى.");
    }
  };

  // Clear error when switching to name step or typing fields
  useEffect(() => {
    setError("");
  }, [showNameInput]);

  useEffect(() => {
    // whenever user starts typing, clear old error
    if (error) {
      // only clear if user is editing something
    }
  }, [email, password, name]); 

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    error,
    setError,
    loading,
    isSigningUp,
    setIsSigningUp,
    showNameInput,
    setShowNameInput,
    user,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    completeSignUpWithName,
  };
};

export default useAuth;
