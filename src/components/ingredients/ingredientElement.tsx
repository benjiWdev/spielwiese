'use client'

import { Ingredient } from '@/models'
import { Grid, Typography, Button } from '@mui/material'
import { useState } from 'react'

export default function IngredientElement({
  ingredient,
  remove,
}: {
  ingredient: Ingredient
  remove: (ingredient: Ingredient) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const triggerRemove = async (): Promise<void> => {
    try {
      setLoading(true)
      await remove(ingredient)
    } catch (e) {
      setLoading(false)
      Promise.reject(e)
    }
  }

  return (
    <Grid key={ingredient.id} container sx={{ mb: 2 }}>
      <Grid size={6}>
        <Typography variant="h5" component="p">
          {ingredient.name}
        </Typography>
      </Grid>
      <Grid size={6}>
        <Button variant="contained" loading={loading} onClick={triggerRemove}>
          Löschen
        </Button>
      </Grid>
    </Grid>
  )
}
