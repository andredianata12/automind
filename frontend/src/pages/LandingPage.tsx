import Navbar from "../components/shared/Navbar";
import Hero from "../components/landing/Hero";
import PlatformShowcase from "../components/landing/PlatformShowcase";
import HowItWorks from "../components/landing/HowItWorks";
import FeatureCards from "../components/landing/FeatureCards";
import LiveDemo from "../components/landing/LiveDemo";
import Pricing from "../components/landing/Pricing";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PlatformShowcase />
      <HowItWorks />
      <FeatureCards />
      <LiveDemo />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}
