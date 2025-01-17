import { getRecipes } from "@/lib/db";
import Link from "next/link";
import Button from "@/components/ui/button";

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <div>
      <Link
        href={'recipes'}
      >
        <Button />
      </Link>
      <main>
        {recipes.map((recipe) =>
          <h2 key={recipe.id}>{recipe.name}</h2>)}
      </main>
    </div>
  );
}
