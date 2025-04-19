import { createIngredient, deleteIngredient, getIngredients } from '@/lib/db'
import { Ingredient, Routes } from '@/models'
import { Typography } from '@mui/material'
import { Fragment } from 'react'
import IngredientCreateForm from '@/components/ingredients/ingredientCreateForm'
import { revalidatePath } from 'next/cache'
import IngredientElement from '@/components/ingredients/ingredientElement'

export default async function Ingredients() {
  let ingredients: Ingredient[] = []

  try {
    ingredients = await getIngredients()
  } catch (e) {
    Promise.reject(e)
  }

  async function submit(name: string): Promise<void> {
    'use server'
    try {
      await createIngredient(name)
      revalidatePath(Routes.INGREDIENTS)
    } catch (e) {
      Promise.reject(e)
    }
  }

  async function remove(ingredient: Ingredient): Promise<void> {
    'use server'
    try {
      await deleteIngredient(ingredient.id)
      revalidatePath(Routes.INGREDIENTS)
    } catch (e) {
      Promise.reject(e)
    }
  }

  return (
    <Fragment>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Zutaten
      </Typography>
      <IngredientCreateForm submit={submit} />
      {ingredients.map((ingredient) => (
        <IngredientElement key={ingredient.id} ingredient={ingredient} remove={remove} />
      ))}
    </Fragment>
  )
}
