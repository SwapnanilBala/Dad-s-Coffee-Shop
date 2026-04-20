import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickOrderPanel from "@/components/QuickOrderPanel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-pastel-cream">
      <Navbar />
      <HeroSection />
      <QuickOrderPanel />
      <Footer />
    </div>
  );
}
