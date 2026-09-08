import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "../../../assets/images/fitlife-hero.webp";
import { AppContainer } from "../../../components/layout/AppContainer";
import { ButtonLink } from "../../../components/ui/Button";
import { usePlanDestination } from "../../../hooks/usePlanDestination";
import { fadeUp, staggerContainer } from "../../../lib/motion";

export function HeroSection() {
  const planDestination = usePlanDestination();
  return (
    <section className="overflow-hidden pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-24 lg:pt-16">
      <AppContainer className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-meta uppercase text-accent"
          >
            Simple fitness for everyday life
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-hero mt-4 text-text-primary"
          >
            Build a healthier routine, one day at a time.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-body mt-5 max-w-xl text-text-secondary sm:text-lg"
          >
            Short workouts, simple nutrition ideas, and a fitness plan built
            around your goals and schedule.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col gap-3 min-[430px]:flex-row"
          >
            <ButtonLink
              to={planDestination.to}
              size="large"
              icon={ArrowRight}
              className="w-full min-[430px]:w-auto"
            >
              {planDestination.label}
            </ButtonLink>
            <ButtonLink
              to="/workouts"
              size="large"
              variant="secondary"
              icon={Play}
              className="w-full min-[430px]:w-auto"
            >
              Explore Workouts
            </ButtonLink>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="text-meta mt-4 text-text-muted"
          >
            No equipment required · Start in a few minutes
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface shadow-surface">
            <img
              src={heroImage}
              alt="Woman stretching during a home workout"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              fetchPriority="high"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0f14]/90 via-[#0b0f14]/25 to-transparent p-5 pt-20 text-white">
              <p className="text-meta uppercase text-emerald-300">
                Today’s session
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-card-title">Full Body Reset</p>
                  <p className="mt-1 text-sm text-slate-300">
                    20 min · Beginner
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <Play
                    aria-hidden="true"
                    className="size-4 fill-current"
                  />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AppContainer>
    </section>
  );
}
