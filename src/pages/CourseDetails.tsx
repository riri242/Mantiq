// src/pages/CourseDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/MainPageComponents/Header";
import Footer from "@/components/MainPageComponents/Footer";
import { useCourseDetails } from "@/hooks/useCourseDetails";
import { useAuthContext } from "@/AuthContext";
import { useCourseComments } from "@/hooks/useCourseComments";

type RouteParams = {
  courseId: string;
};

type CommentsProps = {
  courseId: string;
  courseName?: string;
};

const CommentsSection: React.FC<CommentsProps> = ({ courseId, courseName }) => {
  const {
    comments,
    text,
    setText,
    loading,
    error,
    currentUser,
    handleAdd,
    handleDelete,
  } = useCourseComments(courseId);

  return (
    <section className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-4">التعليقات على المسار</h3>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-sm text-red-100">
          {error}
        </div>
      )}

      {loading && (
        <p className="text-sm text-white/60 mb-4">جاري تحميل التعليقات...</p>
      )}

      {!loading && comments.length === 0 ? (
        <p className="text-sm text-white/60 mb-4">
          لم تتم إضافة أي تعليقات بعد. كن أول من يشارك رأيه في هذا المسار
        </p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white/90">{c.author}</span>
                <span className="text-xs text-white/50">
                  {c.createdAt
                    ? c.createdAt.toLocaleDateString("ar-SA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>

              <p className="text-white/80 leading-relaxed mb-2">{c.text}</p>

              {currentUser && c.userId === currentUser.uid && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-400/70 text-xs font-semibold text-red-100 
                               bg-red-500/10 hover:bg-red-500/30 hover:text-white transition duration-200"
                  >
                    حذف التعليق
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add comment */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-white/80 text-right">
          أضف تعليقك
        </label>

        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-white/15 px-4 py-3 text-sm text-white
                     placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          placeholder="شارك رأيك أو تجربتك..."
          dir="rtl"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                       backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black transition duration-300"
          >
            نشر التعليق
          </button>
        </div>
      </div>
    </section>
  );
};

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const { user: currentUser, loading: authLoading } = useAuthContext();
  const { course, loading: courseLoading, error } = useCourseDetails(courseId);

  const [activeTab, setActiveTab] = React.useState<"about" | "comments">(
    "about",
  );

  const lessonsCount = course?.lessonsNumber ?? 0;

  const fakeLessons = course?.lessons?.length
    ? course.lessons
    : Array.from({ length: lessonsCount || 5 }).map((_, i) => ({
        title: `الدرس ${i + 1}`,
        duration: "00:45",
      }));

  if (authLoading || courseLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-8 text-center text-white/70">
          جاري تحميل بيانات المسار...
        </main>
        <Footer />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-28 pb-16 px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center text-white">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 mt-24">
              تحتاج إلى تسجيل الدخول لعرض تفاصيل هذا المسار
            </h1>

            <p className="text-white/70 mb-6 text-sm md:text-base">
              قم بتسجيل الدخول لمتابعة محتوى المسار والتعليقات
            </p>

            <button
              onClick={() => navigate("/SignPage")}
              className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                         backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black transition"
            >
              تسجيل الدخول
            </button>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideLoginButton={true} />

      <main
        className="flex-1 bg-gradient-to-b 
        from-[#000212] via-[#52195F] to-[#727886] 
        pt-28 pb-16 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Back button */}
          <div className="flex items-center justify-start mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition"
            >
              <span className="text-2xl">←</span>
              <span className="text-sm">رجوع</span>
            </button>
          </div>

          <div className="w-full h-px bg-white/20 mb-6" />

          {/* Error */}
          {error && <p className="text-center text-red-300">{error}</p>}

          {/* Course Content */}
          {!error && course && (
            <>
              {/* TOP SECTION */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT — video + title */}
                <div className="lg:w-2/3 space-y-4">
                  <p className="text-sm text-white/60">المسار</p>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {course.name}
                  </h1>

                  {/* Clean video play button */}
                  <div
                    className="relative aspect-video rounded-3xl overflow-hidden
                               bg-gradient-to-br from-[#ffcc70] via-[#ff8ba7] to-[#004e92]
                               shadow-xl border border-white/10"
                  >
                    <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />

                    <button className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="h-16 w-16 rounded-full bg-white/20 border border-white/50
                                   flex items-center justify-center backdrop-blur-md"
                      >
                        
                        <div
                          className="w-0 h-0 
                                     border-l-[18px] border-y-[10px] 
                                     border-l-white border-y-transparent ml-1"
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* lessons + info */}
                <aside className="lg:w-1/3 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">محتوى المسار</h2>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3 space-y-3">
                      {fakeLessons.map((lesson, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-xl bg-black/30
                                     px-4 py-3 text-sm text-white/90 hover:bg-black/40 transition"
                        >
                          <span dir="rtl">{lesson.title}</span>
                          <span className="text-xs text-white/60">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm space-y-2">
                    <p className="flex justify-between text-white/80">
                      <span>عدد الدروس</span>
                      <span className="font-semibold">{lessonsCount} درس</span>
                    </p>

                    <p className="flex justify-between text-white/80">
                      <span>عدد الساعات</span>
                      <span className="font-semibold">{course.hours} ساعة</span>
                    </p>
                  </div>
                </aside>
              </div>

              {/* TABS */}
              <div className="border-b border-white/10 mt-4">
                <nav className="flex gap-6 text-sm md:text-base">
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`pb-3 transition ${
                      activeTab === "about"
                        ? "border-b-2 border-purple-400 text-purple-300 font-medium"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    عن المسار
                  </button>

                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`pb-3 transition ${
                      activeTab === "comments"
                        ? "border-b-2 border-purple-400 text-purple-300 font-medium"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    التعليقات
                  </button>
                </nav>
              </div>

              {/* ABOUT SECTION */}
              {activeTab === "about" && (
                <section className="mt-6 space-y-4 text-sm md:text-base leading-relaxed text-white/80">
                  <h3 className="text-lg md:text-xl font-semibold text-right mb-6">
                    عن هذا المسار
                  </h3>

                  {course.description ? (
                    <p dir="rtl">{course.description}</p>
                  ) : (
                    <p className="text-white/50" dir="rtl">
                      لا يوجد وصف متاح حالياً لهذا المسار.
                    </p>
                  )}
                </section>
              )}

              {/* COMMENTS TAB */}
              {activeTab === "comments" && courseId && (
                <CommentsSection courseId={courseId} courseName={course.name} />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
