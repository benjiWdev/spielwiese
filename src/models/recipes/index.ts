import { IngredientWithAmount } from '..'

export type Recipe = {
  id: string
  name: string
  ingredients: IngredientWithAmount[]
  instructions?: string
}

export type RecipeRequest = {
  name: string
  ingredients: IngredientWithAmount[]
  instructions?: string
}

export type RecipeResponse = {
  id: string
  name: string
  instructions?: string
}
