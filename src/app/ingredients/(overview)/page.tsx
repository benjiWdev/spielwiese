import { getIngredients } from '@/lib/db'
import { Ingredient, Routes } from '@/models'
import { Button, Stack, Typography } from '@mui/material'
import { Fragment } from 'react'
import Link from 'next/link'

export default async function Ingredients() {
  let ingredients: Ingredient[] = []
  try {
    ingredients = await getIngredients()
  } catch (e) {
    Promise.reject(e)
  }
  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h2">Zutaten</Typography>
        <Link href={Routes.INGREDIENTS_CREATE}>
          <Button variant="contained">Neue Zutat</Button>
        </Link>
      </Stack>
      {ingredients.map((ingredient) => (
        <Typography key={ingredient.id}>{ingredient.name}</Typography>
      ))}
    </Fragment>
  )
}
