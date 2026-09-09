import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { ButtonLink } from "../../../components/ui/Button";
import { usePlanDestination } from "../../../hooks/usePlanDestination";
import { fadeUp } from "../../../lib/motion";
import { trackEvent } from "../../../lib/analytics/analytics";

export function FinalCtaSection() {
  const planDestination = usePlanDestination();
  const isAcquisitionCta = planDestination.label !== "View My Plan";
  return (
    <Section>
      <AppContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="overflow-hidden rounded-[1.5rem] border border-border bg-surface px-5 py-10 text-center shadow-surface sm:px-10 sm:py-14"
        >
          <p className="text-meta uppercase text-accent">Ready to start?</p>
          <h2 className="text-section-title mx-auto mt-3 max-w-xl">
            Create a fitness routine that fits your day.
          </h2>
          <p className="text-body mx-auto mt-3 max-w-lg text-text-secondary">
            Choose your goal, set your pace, and take the first small step.
          </p>
          <ButtonLink
            to={planDestination.to}
            onClick={() => {
              if (isAcquisitionCta)
                trackEvent("click_start", { location: "final_cta" });
            }}
            size="large"
            icon={ArrowRight}
            className="mt-7 w-full min-[430px]:w-auto"
          >
            {planDestination.label === "View My Plan"
              ? planDestination.label
              : "Start My Plan"}
          </ButtonLink>
        </motion.div>
      </AppContainer>
    </Section>
  );
}
