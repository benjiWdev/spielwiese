import { Measurements } from './enums/Measurements'

export type Ingredient = {
  id: string
  name: string
}

export type IngredientWithAmount = {
  id: string
  name: string
  amount: Amount
}

export type Amount = {
  count: number
  measurement?: Measurements
}

export type RecipeIngredientResponse = {
  recipe_id: string
  name: string
  id: string
  amount: number
  measurement: Measurements
}
