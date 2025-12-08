// src/hooks/useCourseDetails.ts
import { useEffect, useState, useCallback } from "react";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface CourseLesson {
  title: string;
  duration?: string; 
}

export interface CourseDetails {
  id: string;
  name: string;
  hours: number;
  lessonsNumber: number;


  description?: string;
  level?: string;           
  pointsRequired?: number;  
  imageURL?: string;
  lessons?: CourseLesson[]; 
}

export interface UseCourseDetailsResult {
  course: CourseDetails | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}



export function useCourseDetails(courseId?: string): UseCourseDetailsResult {
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) {
      setCourse(null);
      setError("لم يتم اختيار مسار لعرض تفاصيله.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const ref = doc(db, "Courses", courseId);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        setCourse(null);
        setError("لم يتم العثور على هذا المسار.");
        return;
      }

      const raw = snap.data() as any;

      //  ربط بيانات Firestore بالواجهة الأمامية
      const mapped: CourseDetails = {
        id: snap.id,
        name: raw.Name || "مسار بدون اسم",
        hours: typeof raw.Hours === "number" ? raw.Hours : 0,
        lessonsNumber:
          typeof raw["Lessons Number"] === "number" ? raw["Lessons Number"] : 0,

    
        description: raw.Description || "",
        level: raw.Level || "",
        pointsRequired:
          typeof raw.PointsRequired === "number" ? raw.PointsRequired : undefined,
        imageURL: raw.imageURL || "",

        lessons: Array.isArray(raw.lessons)
          ? raw.lessons.map((l: any) => ({
              title: String(l.title ?? "درس بدون عنوان"),
              duration: l.duration ? String(l.duration) : undefined,
            }))
          : undefined,
      };

      setCourse(mapped);
    } catch (err) {
      console.error("Error loading course details:", err);
      setCourse(null);
      setError("حدث خطأ أثناء تحميل بيانات المسار.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      await fetchCourse();
    };

    if (isMounted) load();

    return () => {
      isMounted = false;
    };
  }, [fetchCourse]);

  return { course, loading, error, refetch: fetchCourse };
}
