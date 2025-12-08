// src/pages/UserInfo.tsx
import React from "react";
import Header from "@/components/MainPageComponents/Header";
import Footer from "@/components/MainPageComponents/Footer";
import { auth } from "@/config/firebase";
import { useNavigate } from "react-router-dom";
import { useUserAccount } from "@/hooks/useUserAccount";

const UserInfoPage: React.FC = () => {
  const navigate = useNavigate();

  const {
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
    handleProfileSave,
    handlePasswordSave,
  } = useUserAccount();

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-8">
          <div className="max-w-xl mx-auto text-center text-white">
            <h1 className="text-2xl font-semibold mb-4">
              يجب تسجيل الدخول للوصول إلى صفحة الحساب
            </h1>
            <a
              href="/SignPage"
              className="inline-block mt-4 px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                         backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                         transition duration-300"
            >
              الذهاب لصفحة التسجيل
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideLoginButton={true} />

      <main className="flex-1 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto space-y-8 text-white">
          {/* Back  */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-full
                         bg-white/5 border border-white/30 text-white/80
                         hover:bg-white hover:text-black transition"
              aria-label="العودة"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            <h1 className="text-2xl md:text-3xl font-semibold text-right flex-1 mr-4">
              حسابي
            </h1>
          </div>
          <div className="border-b border-white/10 mb-4" />

          {profile.memberSince && (
            <p className="text-right text-white/70 text-sm">
              عضو منذ: {profile.memberSince}
            </p>
          )}

          {loading && (
            <p className="text-center text-white/70 mt-10">
              جاري تحميل بيانات الحساب...
            </p>
          )}

          {!loading && (
            <>
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/40 rounded-xl text-sm text-red-100">
                  {error}
                </div>
              )}
              {message && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-sm text-emerald-100">
                  {message}
                </div>
              )}

              {/* 🧾 المعلومات الأساسية */}
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4 text-right">
                  المعلومات الأساسية
                </h2>
                <form
                  onSubmit={handleProfileSave}
                  className="space-y-5"
                  dir="rtl"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">الاسم</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, name: e.target.value }))
                        }
                        className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, email: e.target.value }))
                        }
                        className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-sm
                                   focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                               backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                               transition duration-300"
                  >
                    {savingProfile ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>
                </form>
              </section>

          ``
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4 text-right">
                  تغيير كلمة المرور
                </h2>
                <form
                  onSubmit={handlePasswordSave}
                  className="space-y-4"
                  dir="rtl"
                >
                  <div>
                    <label className="block text-sm mb-2">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg bg-black/40 border border-white/20 px-4 py-2.5 text-sm
                                 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={savingPassword}
                    className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text:white 
                               backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                               transition duration-300 mt-1"
                  >
                    {savingPassword ? "جاري التحديث..." : "تحديث كلمة المرور"}
                  </button>

                  <div className="flex mt-2">
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await auth.signOut();
                          navigate("/welcome");
                        } catch (err) {
                          console.error(err);
                          
                        }
                      }}
                      className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                                 backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                                 transition duration-300"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </form>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserInfoPage;
