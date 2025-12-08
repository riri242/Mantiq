// src/pages/AboutUs.tsx
import React from "react";
import Header from "@/components/MainPageComponents/Header";
import Footer from "@/components/MainPageComponents/Footer";
import { Player } from "@lottiefiles/react-lottie-player";
import aboutAnimation from "@/assets/Rocket.json"; 

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <Header />

      
      <main className="flex-grow px-6 py-12 max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
  
  
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]">
              <Player
                src={aboutAnimation}
                autoplay
                loop
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>


          <div
            className=" w-full md:w-1/2 text-right text-white space-y-4"
            dir="rtl"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-10 mt-55">
              عن منطق
            </h1>

            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              منطق هي مساحة تعليمية تساعدك على فهم أساسيات هندسة البرمجيات، ليس
              فقط من الناحية النظرية، بل عبر مسارات عملية وأنشطة تفاعلية تعزز
              طريقة تفكيرك المنطقي أثناء بناء الأنظمة والمنتجات الرقمية
            </p>

            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              صممنا التجربة لتكون بسيطة، مرتبة، ومناسبة للطلاب والمطورين الذين
              يرغبون في بناء أساس قوي قبل الانتقال إلى التقنيات والأدوات
              المتقدمة. كل مسار يركز على مهارة محددة، مع تقسيم واضح للدروس
              والساعات ومتابعة لتقدمك
            </p>

            <ul className="text-sm md:text-base text-white/80 space-y-2 list-disc pr-5">
              <li>مسارات منظمة تغطي أساسيات هندسة البرمجيات.</li>
              <li>واجهة عربية مريحة، وتجربة استخدام متناسقة وبسيطة.</li>
              <li>
                إمكانية تطوير المنصة مستقبلاً لإضافة تقييمات، شارات، ونقاط
              </li>
            </ul>

            <div className="pt-4 flex mt-10">
              <a
                href="/courses"
                className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                           backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                           transition duration-300"
              >
                تصفح المسارات
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
