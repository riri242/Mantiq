import React from "react";
import { Link } from "react-router-dom";

export default function Section3() {
  return (
    <div>
      <section className="mt-50 flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-white-900 mb-4">
          تعلم اسس هندسة البرمجيات الصحيحة
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          اتقنها بجدارة ومارسها عبر أنشطة تفاعلية
        </p>

        <Link
          to="/courses"
          className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white rounded-lg 
             hover:bg-white hover:text-gray-900 transition duration-300"
        >
          تصفح المسارات
        </Link>
      </section>
    </div>
  );
}
