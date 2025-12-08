// src/App.tsx
import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";

import SignPage from "./pages/SignPage";
import Main from "./pages/Main";
import AllCourses from "./pages/AllCourses";
import CourseDetailsPage from "./pages/CourseDetails";
import UserInfoPage from "./pages/UserInfo";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#000212] via-[#52195F] via-[#727886] to-[#52195F] text-white">
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/SignPage" element={<SignPage />} />
          <Route path="/main" element={<Main />} />

          {/* Courses list + details */}
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

          {/* User account page */}
          <Route path="/user-info" element={<UserInfoPage />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          <Route path="/about" element={<AboutUs />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">الصفحة غير موجودة</p>
                <a
                  href="/welcome"
                  className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  العودة للصفحة الرئيسية
                </a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
