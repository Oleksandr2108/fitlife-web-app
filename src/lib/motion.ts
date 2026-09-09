import type { Variants } from "framer-motion";

export const motionTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: motionTransition },
};

export const pageEntrance: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, when: "beforeChildren" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const onboardingStep: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 20 : -20 }),
  center: { opacity: 1, x: 0, transition: motionTransition },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -20 : 20,
    transition: { duration: 0.2 },
  }),
};

export const subtleScale = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 },
} as const;
