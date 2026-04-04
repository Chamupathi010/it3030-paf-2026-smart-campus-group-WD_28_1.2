import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ResourceSection from "../components/ResourceSection";
import Reporting from "../components/Reporting";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-background font-body text-on-surface">
      <Navbar />
      <Hero />
      <Features />
      <ResourceSection />
      <Reporting />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;