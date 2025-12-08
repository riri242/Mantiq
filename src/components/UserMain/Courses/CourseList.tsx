// src/components/UserMain/Courses/CourseList.tsx
import React from "react";
import type { Course } from "@/hooks/useCourses";
import { Link } from "react-router-dom";
import { IoMdBook } from "react-icons/io";
import { CiAlarmOn } from "react-icons/ci";

interface CourseListProps {
  courses: Course[];
  loading?: boolean;
  error?: string | null;
  hideExploreButton?: boolean;
}

export default function CourseList({
  courses,
  loading,
  error,
  hideExploreButton = false,
}: CourseListProps) {
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] =
    React.useState<"all" | "design" | "doc" | "dev">("all");

  const filteredCourses = (courses ?? []).filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-6 py-12 text-white">
      {/* Top breadcrumb / pill */}
      <div className="flex justify-center mb-4">
        <span className="px-4 py-1 rounded-full bg-white/10 text-sm text-white/80 border border-white/20">
          أفضل المسارات
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        اكتشف المسارات
      </h1>

      {/* Search bar */}
      <div className="flex justify-center mb-20">
        <div className="w-full md:w-2/3 lg:w-1/2 relative">
          <input
            type="text"
            placeholder="ابحث عن مسار..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full py-3 pr-5 pl-14 bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none"
          />
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-center text-white/70 mt-10">
          جاري تحميل المسارات...
        </p>
      )}
      {error && !loading && (
        <p className="text-center text-red-400 mt-10">{error}</p>
      )}

      {/* Courses grid */}
      {!loading && !error && (
        <>
          {filteredCourses.length === 0 ? (
            <p className="text-center text-white/70 mt-10">
              لا توجد مسارات مطابقة لبحثك.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col shadow-lg hover:border-[#f9a76a] transition"
                >
                  {/* Image */}
                  <div className="rounded-xl h-32 mb-4 overflow-hidden">
                    {course.imageURL ? (
                      <img
                        src={course.imageURL}
                        alt={course.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#f9a76a] via-[#f5cba7] to-[#fdfbfa]" />
                    )}
                  </div>

                  {/* LEVEL TAG */}
                  {course.level && (
                    <div className="mb-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-[#f9a76a]/20 text-[#f9a76a] border border-[#f9a76a]/30">
                        {course.level}
                      </span>
                    </div>
                  )}

                  {/* Name */}
                  <h2 className="text-base md:text-lg font-semibold mb-3">
                    {course.name}
                  </h2>

                  {/* Meta info row */}
                  <div className="mt-auto pt-3 border-t border-white/10 text-xs text-white/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IoMdBook className="w-4 h-4 text-purple-200" />
                      <span>{course.lessonsNumber} دروس</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CiAlarmOn className="w-4 h-4 text-purple-200" />
                      <span>{course.hours} ساعة</span>
                    </div>
                  </div>

                  {/* Details button */}
                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-4 w-full px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                               text-center backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                               transition duration-300"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Explore all button */}
      {!hideExploreButton && (
        <div className="flex justify-center mt-25">
          <Link
  to="/courses"
  className="
    inline-block
    px-10 py-3          
    rounded-lg
    border border-white
    text-sm font-semibold text-white
    backdrop-blur-sm bg-white/5
    hover:bg-white hover:text-black
    transition duration-300 shadow-lg
    text-center
  "
>
  استكشف جميع المسارات
</Link>

        </div>
      )}
    </div>
  );
}
