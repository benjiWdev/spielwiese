import { getIngredients } from '@/lib/db'
import { Routes } from '@/models/enums/Routes'
import { Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment } from 'react'

export default async function Ingredients() {
  const ingredients = await getIngredients()
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
