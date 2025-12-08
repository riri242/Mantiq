import React from "react";

export default function Section4() {
  return (
    <div className="flex justify-center p-8 w-full mt-80 mb-70">
      <div className="relative group w-full max-w-3xl">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#c0bcd1] to-[#c0bcd1] opacity-30 blur-xl group-hover:opacity-50 transition duration-500"></div>

        {/* Card content */}
        <div
          className="relative backdrop-blur-lg bg-white/10 rounded-3xl shadow-xl
                 flex flex-col items-center gap-6 p-10
                 w-full min-h-[350px] overflow-hidden space-y-5"
        >
          {/* Logo on top */}
          <div className="flex justify-center ">
            <img
              src="logo.svg"
              alt="Logo"
              className="w-45 h-auto object-contain"
            />
          </div>

          {/* Text below logo */}
          <div className="text-center">
            <h1 className="mt-4 text-base text-center sm:text-lg lg:text-x1 text-gray-300 leading-relaxed">
              سواء إذا كنت مبتدئاً أو لديك سنوات من الخبرة، ستجد هنا شيئاً
              جديداً لتتعلمه. فنحن نؤمن بأن كل مهندس برمجيات يمكنه التحسن
              والتطور مع الأدوات والمعرفة المناسبة
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
