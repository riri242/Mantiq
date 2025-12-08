import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hero() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = () => {
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  return (
    <div className="relative">

      {/* POPUP massage */}
      {showPopup && (
        <div className="fixed top-6 right-189 z-50 bg-white/10 backdrop-blur-xl border border-white/20 
                        text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-down">
          <span> تم تسجيل بريدك بنجاح</span>
          <button
            onClick={() => setShowPopup(false)}
            className="text-white/70 hover:text-white transition"
          >
            ✖
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col-reverse md:flex-row items-center gap-16">

        {/* Left Section */}
        <div className="mt-30">
          <DotLottieReact
            src="src/assets/Leadership.lottie"
            loop
            autoplay
            style={{ width: 600, height: 600 }}
          />
        </div>

        {/* Right Section */}
        <div className="flex-1 text-center md:text-right space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#ffffff] leading-snug mb-10 mt-35">
            رحلتك في هندسة البرمجيات هنا تبدأ
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            في "مَنطِق"، نتجاوز لغات البرمجة لنسلّط الضوء على جوهر هندسة
            البرمجيات: التخطيط، التصميم، التوثيق، والممارسات التي تحوّل المبرمج
            إلى مهندس محترف وذي قيمة حقيقية في سوق العمل
          </p>

          <div className="pt-2">
            <p className="text-sm mb-3 text-gray-500">
              انضم إلى النشرة البريدية واحصل على وصول لكامل المحتوى
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-end">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none 
                           focus:ring-2 focus:ring-indigo-400 w-full sm:w-64 text-right"
              />

              <button
                onClick={handleSubscribe}
                className="bg-[#FF7759] hover:bg-[#ff6440] text-white font-semibold px-6 py-3 
                           rounded-lg shadow transition"
              >
                اشترك
              </button>
            </div>
          </div>

          <div className="mt-10 flex justify-center md:justify-end">
            <a
              href="/SignPage"
              className="flex items-center justify-center gap-2 rounded-full bg-[#FF7759] px-9 py-3 
                         font-semibold text-white shadow hover:bg-[#ff6440] transition"
            >
              سجل الان وابدأ رحلتك
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Animation for popup */}
      <style>
        {`
          .animate-fade-in-down {
            animation: fade-in-down 0.4s ease-out;
          }

          @keyframes fade-in-down {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
