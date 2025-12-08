// src/hooks/useCourses.ts
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface Course {
  id: string;
  name: string;
  hours: number;
  lessonsNumber: number;
  rating: number;
  imageURL?: string;
  level?: string; 
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const coursesRef = collection(db, "Courses");

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(coursesRef);

      const data: Course[] = snapshot.docs.map((doc) => {
        const raw = doc.data() as any;
        return {
          id: doc.id,
          name: raw.Name || "",
          hours: raw.Hours ?? 0,
          lessonsNumber: raw["Lessons Number"] ?? 0,
          rating: raw.Rating ?? 0,
          imageURL: raw.imageURL || "",   
          level: raw.Level || "", 
        };
      });

      setCourses(data);
      setError(null);
    } catch (err) {
      console.error("Error loading courses:", err);
      setError("حدث خطأ أثناء تحميل المسارات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error };
}
