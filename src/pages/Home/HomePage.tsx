import { Footer } from "../../components/navigation/Footer";
import { BenefitsSection } from "./components/BenefitsSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { NutritionPreviewSection } from "./components/NutritionPreviewSection";
import { PopularWorkoutsSection } from "./components/PopularWorkoutsSection";
import { ProgressPreviewSection } from "./components/ProgressPreviewSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <PopularWorkoutsSection />
      <HowItWorksSection />
      <NutritionPreviewSection />
      <ProgressPreviewSection />
      <FinalCtaSection />
      <Footer />
    </>
  );
}
