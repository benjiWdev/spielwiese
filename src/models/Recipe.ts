import { IngredientWithAmount } from './Ingredient'

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
