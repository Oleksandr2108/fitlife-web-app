import { BenefitsSection } from "./components/BenefitsSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { HeroSection } from "./components/HeroSection";
import { HomeFooter } from "./components/HomeFooter";
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
      <HomeFooter />
    </>
  );
}
