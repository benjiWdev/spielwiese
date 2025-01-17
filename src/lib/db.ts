import { Recipe } from '@/models/Recipe';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

const getRecipes = async (): Promise<Recipe[]> => {
    try {
        const response = await sql`SELECT * FROM cooklet.recipes`;
        return response as Recipe[];
    } catch (e) {
        return Promise.reject(e)
    }
}

export { getRecipes }