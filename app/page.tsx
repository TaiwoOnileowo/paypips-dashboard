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

import "./index.css";
import Header from "@/components/(website)/Header";

import { navLinks } from "@/lib/data/websitedata";
const Page = () => {
  return (
    <div className="bg-white relative overflow-x-hidden ">
      <Header/>
      <Hero />

      <About />
      <HowItWorks />

      <Features />
      <WhyChooseUs />
      <Payments />
      <Dashboard />
      <Pricing />

      <FeatureStroll />

      <CTA />
      <Faqs />
      <Footer />
    </div>
  );
};

export default Page;
