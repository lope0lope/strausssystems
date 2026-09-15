import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import CasesSection from "@/components/CasesSection";
import AboutSection from "@/components/AboutSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  useReveal();
  return (
    <>
      <Helmet>
        <title>Strauss-Strategies | Business Systems Consulting</title>
        <meta
          name="description"
          content="Custom software and operational systems for business owners across South Africa."
        />
        <link rel="canonical" href="https://strausssystems.lovable.app/" />
        <meta property="og:title" content="Strauss-Strategies | Business Systems Consulting" />
        <meta
          property="og:description"
          content="Custom software and operational systems for business owners across South Africa."
        />
        <meta property="og:url" content="https://strausssystems.lovable.app/" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <CasesSection />
        <AboutSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
