// src/components/UserMain/HeroMain.tsx
import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useAuth } from "@/hooks/useAuth";

const userMainAnimation = new URL("../../assets/UserMain.json", import.meta.url)
  .href;

const HeroMain: React.FC = () => {
  const auth = useAuth();
  const anyAuth = auth as any;

  const rawName =
    anyAuth.user?.displayName ||
    anyAuth.name ||
    (anyAuth.user?.email ? anyAuth.user.email.split("@")[0] : "");

  const displayName = rawName?.trim() || "ضيف/ة";

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "صباحك خير";
    if (hour > 18) return "مساءك خير";
    return "ليلتك سعيدة";
  })();

  return (
    <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20">

        {/* LEFT – Lottie */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start my-30">
          <div className="w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[420px] md:h-[420px]">
            <Player
              src={userMainAnimation}
              autoplay
              loop
              renderer="svg"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
{/* RIGHT – Text */}
<div className="w-full md:w-1/2 flex justify-center md:justify-end">
  <div className="text-right">
    <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug text-white drop-shadow-x3">
      أهلاً <span className="text-purple-300">{displayName}</span>
    </h1>

    {/* Greeting shifted LEFT properly */}
    <h2 className="font-mono mt-4 text-3xl sm:text-4xl md:text-5xl text-white mr-30">
      {greeting}
    </h2>
  



          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMain;
