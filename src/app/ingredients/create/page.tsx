import IngredientCreateForm from '@/components/ingredients/ingredientCreateForm'
import { createIngredient } from '@/lib/db'
import { Typography } from '@mui/material'
import { Fragment } from 'react'

export default function CreateRecipe() {
  async function submit(name: string): Promise<void> {
    'use server'
    try {
      await createIngredient(name)
    } catch (e) {
      Promise.reject(e)
    }
  }

  return (
    <Fragment>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Neue Zutat hinzufügen
      </Typography>
      <IngredientCreateForm submit={submit} />
    </Fragment>
  )
}
