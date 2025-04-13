'use server'

import { Ingredient } from '@/models/Ingredient'
import { Recipe, RecipeRequest } from '@/models/Recipe'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await sql`SELECT * FROM cooklet.recipes`
    return response as Recipe[]
  } catch (e) {
    return Promise.reject(e)
  }
}

const createRecipe = async (recipeRequest: RecipeRequest): Promise<void> => {
  try {
    await sql`INSERT INTO cooklet.recipes (name, ingredients, instructions) VALUES (${recipeRequest.name}, ${recipeRequest.ingredients}, ${recipeRequest.instructions})`
  } catch (e) {
    return Promise.reject(e)
  }
}

const getIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await sql`SELECT * FROM cooklet.ingredients`
    return response as Ingredient[]
  } catch (e) {
    return Promise.reject(e)
  }
}

const createIngredient = async (ingredientName: string): Promise<void> => {
  try {
    await sql`INSERT INTO cooklet.ingredients (name) VALUES (${ingredientName})`
  } catch (e) {
    return Promise.reject(e)
  }
}

export { getRecipes, createRecipe, getIngredients, createIngredient }
