import Card from "@/components/_ui/card";
import { getRecipes } from "@/lib/db";

export default async function RecipesOverview() {
  const recipes = await getRecipes();
  return (
    <div className="grid content-stretch -mx-sm md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <Card key={recipe.id} title={recipe.name} className="mt-md mx-sm max-h-[23rem]">
          {recipe.ingredients.map((ingredient, i) => (
            <p key={`${recipe.id}-ing-${i}`} className="mb-xs">
              {ingredient}
            </p>
          ))}
          {recipe.instructions ? (
            <p className="mb-xs">{recipe.instructions}</p>
          ) : undefined}
        </Card>
      ))}
    </div>
  );
}
