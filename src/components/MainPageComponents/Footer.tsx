// src/components/MainPage/Footer.tsx
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/AuthContext";

export default function Footer() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    const { user, loading } = useAuthContext();
    if (user) {
      navigate("/main");
    } else {
      navigate("/welcome");
    }
  };

  return (
    <footer className="relative mt-16">
      {/* The Glow behind footer */}
      <div className="absolute inset-0 rounded-t-3xl bg-white/10 blur-xl opacity-20"></div>

      {/* Footer content */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-6 py-8 
                   flex flex-col md:flex-row items-center justify-between
                   backdrop-blur-lg bg-white/10 rounded-t-3xl shadow-lg text-white"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <button
            type="button"
            onClick={handleHomeClick}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-auto hover:drop-shadow-[0_0_8px_#fff] transition"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-6 text-sm font-semibold justify-center md:justify-center">
          <button
            type="button"
            onClick={handleHomeClick}
            className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition"
          >
            الرئيسية
          </button>

          <a
            href="/courses"
            className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition"
          >
            المسارات
          </a>

          <a
            href="/about"
            className="hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition"
          >
            حولنا
          </a>
        </nav>

{/* Social Media */}
<div className="flex space-x-5 mt-4 md:mt-0 justify-center md:justify-end">

  <a
    href="https://www.linkedin.com/in/renam-adnan-18557a272?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-white hover:drop-shadow-[0_0_10px_#fff] transition"
  >
    <FaLinkedin size={22} />
  </a>


  <a
    href="https://x.com/eng_renam?s=21&t=FtTXVycGoCH3uCr_Ki2WVQ"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-white hover:drop-shadow-[0_0_10px_#fff] transition"
  >
    <FaXTwitter size={22} />
  </a>

  <a
    href="https://github.com/riri242"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-white hover:drop-shadow-[0_0_10px_#fff] transition"
  >
    <FaGithub size={22} />
  </a>

</div>

      </div>
    </footer>
  );
}
