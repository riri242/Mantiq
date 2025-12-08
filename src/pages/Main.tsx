// src/pages/Main.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import Header from "@/components/MainPageComponents/Header";
import Footer from "@/components/MainPageComponents/Footer";
import CourseList from "@/components/UserMain/Courses/CourseList";
import { useCourses } from "@/hooks/useCourses";
import HeroMain from "@/components/UserMain/HeroMain";

export default function Main() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const { courses, loading, error } = useCourses();

 // takes the first three courses to display on the main page
  const limitedCourses = courses.slice(0, 3);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/SignPage");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideLoginButton={true} />

      <main className="flex-1">
        <HeroMain />

        <section className="py-12">
          <CourseList
            courses={limitedCourses}
            loading={loading}
            error={error}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
