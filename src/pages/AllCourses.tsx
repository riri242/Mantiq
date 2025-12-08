// src/pages/AllCourses.tsx
import React from "react";
import Header from "@/components/MainPageComponents/Header";
import Footer from "@/components/MainPageComponents/Footer";
import CourseList from "@/components/UserMain/Courses/CourseList";
import { useCourses } from "../hooks/useCourses";
import { useAuthContext } from "@/AuthContext";
import { useNavigate } from "react-router-dom";

const AllCourses: React.FC = () => {
  const { courses, loading, error } = useCourses();
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();

  
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-8 text-white text-center">
          <p>جاري التحقق من حالة تسجيل الدخول...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">

      <Header hideLoginButton={!!user} />

      <main className="flex-1 pt-28 pb-16 px-4 md:px-8 text-white">
        <div className="max-w-6xl mx-auto">
          
          {/* BACK BUTTON */}
          <div className="flex items-center justify-start mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition"
            >
              <span className="text-2xl">←</span>
              <span className="text-sm">رجوع</span>
            </button>
          </div>

          {/* divider line */}
          <div className="w-full h-px bg-white/20 mb-6" />

          {/* PAGE TITLE */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-right">
            جميع المسارات
          </h1>

          {/* LIST */}
          <CourseList
            courses={courses}
            loading={loading}
            error={error}
            hideExploreButton={true}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllCourses;
