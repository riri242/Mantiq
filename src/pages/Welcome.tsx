import React from "react";

import Header from "../components/MainPageComponents/Header";
import Hero from "../components/MainPageComponents/Hero";
import Section2 from "../components/MainPageComponents/Section2";
import Section4 from "../components/MainPageComponents/Section4";
import Section3 from "../components/MainPageComponents/Section3";
import Footer from "../components/MainPageComponents/Footer";
import "../index.css";

export default function Welcome() {
  return (
    <div className="flex flex-col space-y-120"> 
      <Header />
      <Hero />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}
