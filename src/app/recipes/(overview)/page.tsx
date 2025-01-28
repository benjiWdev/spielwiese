import { ButtonSizes } from "@/components/_ui/_enums/Buttons";
import Button from "@/components/_ui/button";
import Card from "@/components/_ui/card";
import { getRecipes } from "@/lib/db";

export default async function RecipesOverview() {
  const recipes = await getRecipes();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl">Rezepte</h1>
        <Button size={ButtonSizes.LARGE}>Neues Rezept</Button>
      </div>
      <div className="grid content-stretch mt-md -mx-sm md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            title={recipe.name}
            className="mt-md mx-sm max-h-[23rem]"
          >
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                <li key={`${recipe.id}-ing-${i}`} className="mb-xs">
                  {ingredient}
                </li>
              ))}
            </ul>
            {recipe.instructions ? (
              <p className="mb-xs">{recipe.instructions}</p>
            ) : undefined}
          </Card>
        ))}
      </div>
    </div>
  );
}
