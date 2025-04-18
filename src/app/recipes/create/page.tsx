import RecipeCreateForm from '@/components/recipes/recipeCreateForm'
import { createRecipe, getIngredients } from '@/lib/db'
import { IngredientWithAmount } from '@/models/Ingredient'
import { Typography } from '@mui/material'
import { Fragment } from 'react'

export default async function CreateRecipe() {
  const ingredients = await getIngredients()

  async function submitRecipe(name: string, ingredients: IngredientWithAmount[], instructions: string) {
    'use server'
    try {
      await createRecipe({ name, ingredients, instructions })
    } catch (e) {
      Promise.reject(e)
    }
  }

  return (
    <Fragment>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Neues Rezept
      </Typography>
      <RecipeCreateForm ingredientsProps={ingredients} submit={submitRecipe} />
    </Fragment>
  )
}
