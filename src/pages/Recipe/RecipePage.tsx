import { motion } from "framer-motion";
import { ChevronLeft, Clock3, Gauge, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AppContainer } from "../../components/layout/AppContainer";
import { Button, ButtonLink } from "../../components/ui/Button";
import { useRecipe } from "../../hooks/queries/useRecipe";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { MacroVisualization } from "./components/MacroVisualization";

function RecipeDetailSkeleton() {
  return (
    <AppContainer className="py-10">
      <div
        aria-label="Loading recipe"
        className="animate-pulse motion-reduce:animate-none"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="aspect-[16/11] rounded-surface bg-surface-muted" />
          <div className="space-y-4 py-4">
            <div className="h-4 w-1/4 rounded bg-surface-muted" />
            <div className="h-11 w-3/4 rounded bg-surface-muted" />
            <div className="h-5 w-full rounded bg-surface-muted" />
            <div className="h-16 w-full rounded bg-surface-muted" />
          </div>
        </div>
        <div className="mt-8 h-56 rounded-surface bg-surface-muted" />
      </div>
    </AppContainer>
  );
}

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isPending, isError, refetch } = useRecipe(id);

  if (isPending) return <RecipeDetailSkeleton />;
  if (isError)
    return (
      <AppContainer className="py-12">
        <section className="mx-auto max-w-lg rounded-surface border border-border bg-surface p-6 text-center shadow-surface">
          <h1 className="text-section-title">We couldn’t load this recipe.</h1>
          <p className="mt-3 text-text-secondary">Please try again.</p>
          <Button
            onClick={() => void refetch()}
            className="mt-5 w-full min-[430px]:w-auto"
          >
            Try Again
          </Button>
        </section>
      </AppContainer>
    );
  if (!recipe)
    return (
      <AppContainer className="py-12">
        <section className="mx-auto max-w-lg rounded-surface border border-border bg-surface p-6 text-center shadow-surface">
          <p className="text-meta text-accent">Recipe not found</p>
          <h1 className="text-section-title mt-3">
            This recipe may no longer be available.
          </h1>
          <ButtonLink
            to="/nutrition"
            className="mt-6 w-full min-[430px]:w-auto"
          >
            Browse Recipes
          </ButtonLink>
        </section>
      </AppContainer>
    );

  const nutrition = [
    { label: "Calories", value: `${recipe.calories} kcal` },
    { label: "Protein", value: `${recipe.proteinGrams}g` },
    { label: "Carbs", value: `${recipe.carbohydrateGrams}g` },
    { label: "Fat", value: `${recipe.fatGrams}g` },
  ];

  return (
    <AppContainer className="min-w-0 py-8 sm:py-12">
      <div className="mx-auto min-w-0 max-w-5xl">
        <Link
          to="/nutrition"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-text-secondary transition-colors hover:text-accent"
        >
          <ChevronLeft
            aria-hidden="true"
            className="size-4"
          />
          Back to Nutrition
        </Link>
        <motion.article
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-4 grid min-w-0 gap-8"
        >
          <motion.header
            variants={fadeUp}
            className="grid min-w-0 overflow-hidden rounded-surface border border-border bg-surface shadow-surface lg:grid-cols-[1.08fr_0.92fr]"
          >
            <img
              src={recipe.imageUrl}
              alt={`${recipe.title} recipe`}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/11] h-full max-h-[30rem] w-full object-cover"
            />
            <div className="min-w-0 p-5 sm:p-8 lg:self-center">
              <p className="text-meta capitalize text-accent">
                {recipe.mealType}
              </p>
              <h1 className="text-page-title mt-3">{recipe.title}</h1>
              <p className="text-body mt-4 text-text-secondary">
                {recipe.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-text-secondary">
                <span className="inline-flex items-center gap-2">
                  <Clock3
                    aria-hidden="true"
                    className="size-4 text-accent"
                  />
                  {recipe.preparationMinutes} min
                </span>
                <span className="inline-flex items-center gap-2 capitalize">
                  <Gauge
                    aria-hidden="true"
                    className="size-4 text-accent"
                  />
                  {recipe.difficulty}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users
                    aria-hidden="true"
                    className="size-4 text-accent"
                  />
                  Serves {recipe.servings}
                </span>
              </div>
            </div>
          </motion.header>

          <motion.section
            variants={fadeUp}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            aria-label="Nutrition information"
          >
            {nutrition.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-control border border-border bg-background-secondary p-4"
              >
                <p className="text-xl font-bold sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-xs text-text-muted">{item.label}</p>
              </div>
            ))}
          </motion.section>

          <motion.div variants={fadeUp}>
            <MacroVisualization recipe={recipe} />
          </motion.div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-2">
            <motion.section
              variants={fadeUp}
              className="min-w-0 rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6"
              aria-labelledby="ingredients-heading"
            >
              <h2
                id="ingredients-heading"
                className="text-section-title"
              >
                Ingredients
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                For {recipe.servings}{" "}
                {recipe.servings === 1 ? "serving" : "servings"}
              </p>
              <ul className="mt-5 divide-y divide-border">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={`${ingredient.name}-${ingredient.amount ?? ""}`}
                    className="flex min-w-0 items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <span className="min-w-0 text-sm font-medium">
                      {ingredient.name}
                    </span>
                    {ingredient.amount ? (
                      <span className="shrink-0 text-right text-sm text-text-secondary">
                        {ingredient.amount}
                        {ingredient.unit ? ` ${ingredient.unit}` : ""}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.section>
            <motion.section
              variants={staggerContainer}
              className="min-w-0 rounded-surface border border-border bg-surface p-5 shadow-surface sm:p-6"
              aria-labelledby="instructions-heading"
            >
              <h2
                id="instructions-heading"
                className="text-section-title"
              >
                Preparation
              </h2>
              <ol className="mt-5 grid gap-5">
                {recipe.instructions.map((instruction, index) => (
                  <motion.li
                    key={instruction}
                    variants={fadeUp}
                    className="grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] gap-3"
                  >
                    <span className="text-sm font-bold tabular-nums text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-text-secondary">
                      {instruction}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </motion.section>
          </div>
        </motion.article>
      </div>
    </AppContainer>
  );
}
