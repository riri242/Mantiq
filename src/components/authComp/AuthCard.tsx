import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AuthCard: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Tabs: "signup" or "login"
  const [activeTab, setActiveTab] = React.useState<"signup" | "login">("signup");

  // When we enter the name step, always stay on signup tab
  React.useEffect(() => {
    if (auth.showNameInput) {
      setActiveTab("signup");
    }
  }, [auth.showNameInput]);

  // Handlers
  const handleBackToSignUp = () => {
    auth.setShowNameInput(false);
    auth.logout();
  };

  const handleCompleteSignUp = async () => {
    const result = await auth.completeSignUpWithName();
    if (result.success) navigate("/main");
  };

  const handleSignIn = async () => {
    const result = await auth.signIn();
    if (result.success) navigate("/main");
  };

  const handleGoogleSignIn = async () => {
    const result = await auth.signInWithGoogle();
    if (result.success) navigate("/main");
  };

  const handleSignUp = async () => {
    await auth.signUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="
  w-full 
  max-w-xl
  bg-white 
  rounded-3xl 
  shadow-2xl 
  overflow-visible
  min-h-[700px]         
  px-8 py-17            
  flex flex-col 
  justify-start
">

        {/* Tabs */}
        {!auth.showNameInput && (
          <div className="flex">
            <button
              className={`w-1/2 py-3 text-sm font-semibold ${
                activeTab === "signup"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Sign up
            </button>
            <button
              className={`w-1/2 py-3 text-sm font-semibold ${
                activeTab === "login"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Log in
            </button>
          </div>
        )}

        {/* Inner content */}
        <div className="px-8 py-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-900 mb-8">
            {auth.showNameInput
              ? "أكمل ملفك الشخصي"
              : activeTab === "signup"
              ? "تسجيل جديد"
              : "تسجيل الدخول"}
          </h1>

          {/* Name (after signup) */}
          {auth.showNameInput ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <div className="w-16 h-1 bg-green-500" />
                  <div className="w-3 h-3 bg-gray-300 rounded-full" />
                </div>
              </div>

              {/* Name input */}
              <div className="mb-8">
                <label className="block text-gray-800 text-sm font-medium mb-2 text-right">
                  الاسم
                </label>
                <input
                  type="text"
                  value={auth.name}
                  onChange={(e) => auth.setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/80 focus:border-transparent transition text-right"
                  placeholder="أدخل اسمك"
                  dir="rtl"
                  autoFocus
                />
                <p className="text-gray-500 text-xs mt-2 text-right">
                  سيظهر هذا الاسم في ملفك الشخصي والدورات التدريبية
                </p>
              </div>

              {/* Error */}
              {auth.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-right">{auth.error}</p>
                </div>
              )}

              {/* Loading */}
              {auth.loading && (
                <div className="mb-6 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                  <span className="mr-3 text-gray-800">جاري إنشاء الحساب...</span>
                </div>
              )}

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-2 pt-2">
                <button
                  onClick={handleCompleteSignUp}
                  disabled={auth.loading || !auth.name.trim()}
                  className="px-4 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  إنهاء التسجيل
                </button>

                <button
                  onClick={handleBackToSignUp}
                  disabled={auth.loading}
                  className="px-4 py-3 bg-gray-100 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
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
                  رجوع
                </button>
              </div>
            </>
          ) : (
            <>
              {/* SOCIAL / GOOGLE SECTION  */}
              <button
                onClick={handleGoogleSignIn}
                disabled={auth.loading}
                className="w-full mb-6 px-4 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {activeTab === "signup"
                  ? "التسجيل باستخدام Google"
                  : "تسجيل الدخول باستخدام Google"}
              </button>

              {/* Divider */}
              <div className="flex items-center mb-6">
                <div className="flex-grow border-t border-gray-200" />
                <span className="mx-4 text-gray-400 text-xs">أو</span>
                <div className="flex-grow border-t border-gray-200" />
              </div>

              {/* Inputs shared between signup / login */}
              <div className="mb-5">
                <label className="block text-gray-800 text-sm font-medium mb-2 text-right">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={auth.email}
                  onChange={(e) => auth.setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/80 focus:border-transparent transition text-right"
                  placeholder="example@email.com"
                  dir="rtl"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-medium mb-2 text-right">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={auth.password}
                  onChange={(e) => auth.setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/80 focus:border-transparent transition text-right"
                  placeholder="••••••••"
                  dir="rtl"
                />
                <p className="text-gray-500 text-xs mt-2 text-right">
                  كلمة المرور يجب أن تكون ٦ أحرف على الأقل
                </p>
              </div>

              {/* Error */}
              {auth.error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-right">{auth.error}</p>
                </div>
              )}

              {/* Loading */}
              {auth.loading && (
                <div className="mb-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
                  <span className="mr-3 text-gray-800">جاري المعالجة...</span>
                </div>
              )}

              {/* Primary button */}
              <button
                onClick={activeTab === "signup" ? handleSignUp : handleSignIn}
                disabled={auth.loading}
                className="w-full mt-4 px-4 py-3 bg-gray-900 text-white font-medium rounded-2xl hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {activeTab === "signup" ? "تسجيل جديد" : "تسجيل الدخول"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
