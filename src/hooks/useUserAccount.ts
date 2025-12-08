// src/hooks/useUserAccount.ts
import { useEffect, useState, useCallback } from "react";
import { auth, db } from "@/config/firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface ProfileState {
  name: string;
  email: string;
  memberSince?: string;
}

export function useUserAccount() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // listen to auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // load profile data from Firestore
  const loadProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const baseName =
        user.displayName || user.email?.split("@")[0] || "مستخدم";
      const baseEmail = user.email || "";

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      let memberSince: string | undefined;

      if (snap.exists()) {
        const data = snap.data() as any;
        if (data.createdAt) {
          const d = new Date(data.createdAt);
          memberSince = d.toLocaleDateString("ar-SA", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      } else if (user.metadata?.creationTime) {
        const d = new Date(user.metadata.creationTime);
        memberSince = d.toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

      setProfile({
        name: baseName,
        email: baseEmail,
        memberSince,
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل بيانات الحساب.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);
// save profile changes
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setMessage(null);
    setSavingProfile(true);

    try {
      if (profile.name && profile.name !== user.displayName) {
        await updateProfile(user, { displayName: profile.name });
      }

      if (profile.email && profile.email !== user.email) {
        await updateEmail(user, profile.email);
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: profile.name,
          email: profile.email,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      setMessage("تم تحديث معلومات الحساب بنجاح.");
    } catch (err: any) {
      console.error(err);
      setError(
        "تعذر تحديث المعلومات. قد تحتاج إلى تسجيل الدخول مرة أخرى، ثم المحاولة.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // change password
  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    setError(null);
    setMessage(null);

    if (newPassword.length < 6) {
      setError("كلمة المرور الجديدة يجب أن تكون ٦ أحرف على الأقل.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("تأكيد كلمة المرور لا يطابق الكلمة الجديدة.");
      return;
    }

    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);

      await updatePassword(user, newPassword);

      setMessage("تم تحديث كلمة المرور بنجاح.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setError(
        "تعذر تغيير كلمة المرور. تأكد من كلمة المرور الحالية أو قم بتسجيل الدخول مرة أخرى.",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return {
    // state
    user,
    profile,
    setProfile,
    loading,
    savingProfile,
    savingPassword,
    message,
    error,
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,

    // handlers
    handleProfileSave,
    handlePasswordSave,
  };
}
