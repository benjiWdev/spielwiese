export type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  instructions?: string;
};

export type RecipeRequest = {
  name: string;
  ingredients: string[];
  instructions?: string;
};
