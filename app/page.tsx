"use client"
import { useState } from "react";
// import Header
import Pricing from "@/components/(website)/Pricing";
import Dashboard from "@/components/(website)/Dashboard";
import Payments from "@/components/(website)/Payments";
import Features from "@/components/(website)/Features";
import WhyChooseUs from "@/components/(website)/WhyChooseUs";
import Footer from "@/components/(website)/Footer";
import HowItWorks from "@/components/(website)/HowItWorks";
import Faqs from "@/components/(website)/Faqs";
import About from "@/components/(website)/About";
import CTA from "@/components/(website)/CTA";
import Hero from "@/components/(website)/Hero";
import FeatureStroll from "@/components/(website)/FeatureStroll";
// import PricingCTA from "@/components/(website)/PricingCTA";
import Modal from "@/components/(website)/Modal";

import "./index.css";
import { Header } from "@/components/(website)/Header";
const Page = () => {
  const [pricingIndex, setPricingIndex] = useState(2);

  return (
    <div className="bg-white relative overflow-x-hidden h-screen">
      <Header />
      <Hero />

      <About />
      <HowItWorks />

      <Features />
      <WhyChooseUs />
      <Payments />
      <Dashboard />
      <Pricing index={pricingIndex} setIndex={setPricingIndex} />

      <Modal />

      <FeatureStroll />

      <CTA />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Page;
