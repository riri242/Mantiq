// src/hooks/useCourseComments.ts
import React from "react";
import { db } from "@/config/firebase";
import { useAuthContext } from "@/AuthContext";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export interface Comment {
  id: string;
  author: string;
  text: string;
  userId: string;
  createdAt?: Date | null;
}

export function useCourseComments(courseId?: string) {
  const { user: currentUser } = useAuthContext();

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Listen to comments in Firestore 
  React.useEffect(() => {
    if (!courseId) return;

    const q = query(
      collection(db, "Courses", courseId, "Comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: Comment[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            author: data.author || "مستخدم",
            text: data.text || "",
            userId: data.userId || "",
            createdAt:
              data.createdAt && data.createdAt.toDate
                ? data.createdAt.toDate()
                : null,
          };
        });
        setComments(list);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError("حدث خطأ أثناء تحميل التعليقات.");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [courseId]);

  //  Add comment
  const handleAdd = async () => {
    if (!text.trim()) return;
    if (!currentUser || !courseId) return;

    try {
      setError(null);
      await addDoc(collection(db, "Courses", courseId, "Comments"), {
        text: text.trim(),
        author:
          currentUser.displayName ||
          currentUser.email?.split("@")[0] ||
          "مستخدم",
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (err) {
      console.error(err);
      setError("تعذر إضافة التعليق، حاول مرة أخرى.");
    }
  };

  //  Delete comment (only owner)
  const handleDelete = async (id: string) => {
    if (!currentUser || !courseId) return;
    const comment = comments.find((c) => c.id === id);
    if (!comment || comment.userId !== currentUser.uid) return;

    try {
      setError(null);
      await deleteDoc(doc(db, "Courses", courseId, "Comments", id));
    } catch (err) {
      console.error(err);
      setError("تعذر حذف التعليق، حاول مرة أخرى.");
    }
  };

  return {
    comments,
    text,
    setText,
    loading,
    error,
    currentUser,
    handleAdd,
    handleDelete,
  };
}
