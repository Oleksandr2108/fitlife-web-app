import { motion } from "framer-motion";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    number: "01",
    title: "Choose your goal",
    description: "Tell us what you want to focus on.",
  },
  {
    number: "02",
    title: "Get your plan",
    description: "Build a practical seven-day routine.",
  },
  {
    number: "03",
    title: "Start moving",
    description: "Follow short sessions at your own pace.",
  },
];

export function HowItWorksSection() {
  return (
    <Section className="border-y border-border bg-background-secondary">
      <AppContainer>
        <SectionHeading
          eyebrow="How it works"
          title="Your routine in three simple steps"
        />
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {steps.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              className="relative rounded-surface border border-border bg-surface p-5 sm:p-6"
            >
              <span className="text-meta text-accent">{step.number}</span>
              <h3 className="text-card-title mt-8">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </AppContainer>
    </Section>
  );
}
