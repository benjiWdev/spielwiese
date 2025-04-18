import Card from '@/components/_ui/card'
import { getRecipes } from '@/lib/db'
import { Routes } from '@/models/enums/Routes'
import { Recipe } from '@/models/Recipe'
import { Button, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Rezepte</Typography>
        <Link href={Routes.RECIPES_CREATE}>
          <Button variant="contained">Neues Rezept</Button>
        </Link>
      </Stack>
      <Grid container>
        {recipes.map((recipe) => (
          <Grid size={4} key={recipe.id}>
            <Card title={recipe.name}>
              <List>
                {recipe.ingredients.map((ingredient, i) => (
                  <ListItem key={`${recipe.id}-ing-${i}`}>
                    <ListItemText primary={ingredient.name}></ListItemText>
                  </ListItem>
                ))}
              </List>
              {recipe.instructions ? <Typography variant="body1">{recipe.instructions}</Typography> : undefined}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  )
}
