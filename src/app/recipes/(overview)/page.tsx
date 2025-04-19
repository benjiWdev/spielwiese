import { getRecipes } from '@/lib/db'
import { Recipe, Routes } from '@/models'
import { getAmountMeasurementString } from '@/utils'
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment } from 'react'

export default async function RecipesOverview() {
  let recipes: Recipe[] = []
  try {
    recipes = await getRecipes()
  } catch (e) {
    Promise.reject(e)
  }
  return (
    <Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h2">Rezepte</Typography>
        <Link href={Routes.RECIPES_CREATE}>
          <Button variant="contained" size="large">
            Neues Rezept
          </Button>
        </Link>
      </Stack>
      <Grid container>
        {recipes.map((recipe) => (
          <Grid size={4} key={recipe.id}>
            <Card>
              <CardContent>
                <Typography component="h3" variant="h5">
                  {recipe.name}
                </Typography>
                <Grid container sx={{ mt: 2 }}>
                  {recipe.ingredients.map((ingredient, i) => (
                    <Fragment key={`${recipe.id}-ing-${i}`}>
                      <Grid size={3}>
                        <Typography variant="body1">{getAmountMeasurementString(ingredient.amount)}</Typography>
                      </Grid>
                      <Grid size={9}>
                        <Typography variant="body1">{ingredient.name}</Typography>
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
                {recipe.instructions ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {recipe.instructions}
                  </Typography>
                ) : undefined}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}
