import RecipeCreateForm from '@/components/recipes/recipeCreateForm'
import { getIngredients } from '@/lib/db'
import { IngredientWithAmount } from '@/models/Ingredient'
import { Typography } from '@mui/material'

export default async function CreateRecipe() {
  const ingredients = await getIngredients()

  async function submitRecipe(name: string, ingredients: IngredientWithAmount[], instructions: string) {
    'use server'
    // await createRecipe({
    //   name,
    //   ingredients,
    //   instructions,
    // });
    console.log({ name, ingredients, instructions })
    for (const i of ingredients) {
      console.log(i)
    }
  }

  return (
    <div>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Neues Rezept
      </Typography>
      <RecipeCreateForm ingredientsProps={ingredients} submit={submitRecipe} />
    </div>
  )
}
