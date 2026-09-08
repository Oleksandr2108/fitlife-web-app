import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { RecipeCard } from "../../../components/nutrition/RecipeCard";
import { RecipeCardSkeleton } from "../../../components/nutrition/RecipeCardSkeleton";
import { ButtonLink } from "../../../components/ui/Button";
import { useRecipes } from "../../../hooks/queries/useRecipes";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import { SectionHeading } from "./SectionHeading";

export function NutritionPreviewSection() {
  const { data, isPending, isError, refetch } = useRecipes();
  return (
    <Section>
      <AppContainer>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Everyday nutrition"
            title="Simple ideas for your next meal"
            description="Practical inspiration for balanced, enjoyable meals."
          />
          <ButtonLink
            to="/nutrition"
            variant="ghost"
            icon={ArrowRight}
            className="self-start sm:self-auto"
          >
            Explore Nutrition
          </ButtonLink>
        </div>
        {isError ? (
          <div className="mt-8 rounded-surface border border-border bg-surface p-5">
            <p className="text-text-secondary">We couldn’t load recipes.</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 min-h-11 font-semibold text-accent"
            >
              Try again
            </button>
          </div>
        ) : null}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {isPending
            ? Array.from({ length: 3 }, (_, index) => (
                <RecipeCardSkeleton key={index} />
              ))
            : data?.slice(0, 3).map((recipe) => (
                <motion.div
                  key={recipe.id}
                  variants={fadeUp}
                >
                  <RecipeCard recipe={recipe} />
                </motion.div>
              ))}
        </motion.div>
      </AppContainer>
    </Section>
  );
}
