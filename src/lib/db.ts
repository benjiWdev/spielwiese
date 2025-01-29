"use server";

import { Recipe, RecipeRequest } from "@/models/Recipe";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const getRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await sql`SELECT * FROM cooklet.recipes`;
    return response as Recipe[];
  } catch (e) {
    return Promise.reject(e);
  }
};

const createRecipe = async (recipeRequest: RecipeRequest): Promise<void> => {
  try {
    await sql`INSERT INTO cooklet.recipes (name, ingredients, instructions) VALUES (${recipeRequest.name}, ${recipeRequest.ingredients}, ${recipeRequest.instructions})`;
  } catch (e) {
    return Promise.reject(e);
  }
};

export { getRecipes, createRecipe };
