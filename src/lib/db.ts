'use server'

import { Recipe, RecipeRequest, RecipeResponse, Ingredient, RecipeIngredientResponse } from '@/models'
import { Client, neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const responseRecipes = (await sql`SELECT * FROM cooklet.recipes`) as RecipeResponse[]
    const responseRecipeIngredients =
      (await sql`select ri.recipe_id, i.name as name, i.id as id, ri.amount, ri.measurement from cooklet.recipe_ingredients ri 
      LEFT JOIN cooklet.ingredients i ON ri.ingredient_id = i.id`) as RecipeIngredientResponse[]

    return responseRecipes.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      instructions: recipe.instructions,
      ingredients: responseRecipeIngredients
        .filter((recipeIngredient) => recipeIngredient.recipe_id === recipe.id)
        .map((filteredIngredient) => ({
          id: filteredIngredient.id,
          name: filteredIngredient.name,
          amount: { count: filteredIngredient.amount, measurement: filteredIngredient.measurement },
        })),
    }))
  } catch (e) {
    return Promise.reject(e)
  }
}

export const createRecipe = async (recipeRequest: RecipeRequest): Promise<void> => {
  const client = new Client(process.env.DATABASE_URL)
  await client.connect()

  try {
    await client.query('BEGIN')
    const result = await client.query(`INSERT INTO cooklet.recipes (name, instructions) VALUES ($1, $2) RETURNING id`, [
      recipeRequest.name,
      recipeRequest.instructions,
    ])
    await client.query(
      `INSERT INTO cooklet.recipe_ingredients (recipe_id, ingredient_id, amount, measurement)
       SELECT recipeid, id, amountcount, amountmeasurement FROM jsonb_to_recordset($1::jsonb) AS t (recipeid int, id int, amountcount int, amountmeasurement cooklet.measurements)`,
      [
        JSON.stringify(
          recipeRequest.ingredients.map((ingredient) => ({
            recipeid: result.rows[0].id,
            id: ingredient.id,
            amountcount: ingredient.amount.count,
            amountmeasurement: ingredient.amount.measurement,
          }))
        ),
      ]
    )
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    Promise.reject(e)
  } finally {
    client.end()
  }
}

export const getIngredients = async (): Promise<Ingredient[]> => {
  try {
    const response = await sql`SELECT * FROM cooklet.ingredients`
    return response as Ingredient[]
  } catch (e) {
    return Promise.reject(e)
  }
}

export const createIngredient = async (ingredientName: string): Promise<void> => {
  try {
    await sql`INSERT INTO cooklet.ingredients (name) VALUES (${ingredientName})`
  } catch (e) {
    return Promise.reject(e)
  }
}

export const deleteIngredient = async (ingredientId: string): Promise<void> => {
  try {
    await sql`DELETE FROM cooklet.ingredients WHERE ID = ${ingredientId}`
  } catch (e) {
    return Promise.reject(e)
  }
}
