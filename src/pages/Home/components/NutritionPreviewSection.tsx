import { motion } from "framer-motion";
import { ArrowRight, Clock3 } from "lucide-react";
import { AppContainer } from "../../../components/layout/AppContainer";
import { Section } from "../../../components/layout/Section";
import { ButtonLink } from "../../../components/ui/Button";
import { useRecipes } from "../../../hooks/queries/useRecipes";
import { fadeUp, staggerContainer } from "../../../lib/motion";
import type { Recipe } from "../../../types";
import { SectionHeading } from "./SectionHeading";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="overflow-hidden rounded-surface border border-border bg-surface shadow-surface">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-card-title">{recipe.title}</h3>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-text-muted">
          <span>{recipe.calories} kcal</span>
          <span>{recipe.proteinGrams}g protein</span>
          <span className="inline-flex items-center gap-1">
            <Clock3
              aria-hidden="true"
              className="size-3.5"
            />
            {recipe.preparationMinutes} min
          </span>
        </div>
      </div>
    </article>
  );
}

function RecipeSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-surface border border-border bg-surface">
      <div className="aspect-[4/3] bg-surface-muted" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-surface-muted" />
        <div className="h-3 w-full rounded bg-surface-muted" />
      </div>
    </div>
  );
}

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
                <RecipeSkeleton key={index} />
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
