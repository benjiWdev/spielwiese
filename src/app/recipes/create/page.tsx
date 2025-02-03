"use client";

import Button from "@/components/_ui/button";
import Textfield from "@/components/_ui/textfield";
import { createRecipe } from "@/lib/db";
import { useState } from "react";

export default function CreateRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.toSpliced(index, 1));
  };

  function handleIngredientChange(value: string, index: number) {
    setIngredients(
      ingredients.map((ingredient, i) => {
        return index === i ? value : ingredient;
      })
    );
  }

  async function onSubmit() {
    await createRecipe({
      name,
      ingredients,
      instructions,
    });
  }

  return (
    <div>
      <h1 className="text-4xl mb-md">Neues Rezept</h1>
      <form action={onSubmit}>
        <Textfield
          className="mb-md"
          label="Name"
          name="name"
          required
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
        {ingredients.map((ingredient, i) => (
          <div key={`ingredient-${i}`} className="flex items-center mb-sm">
            <Textfield
              label={`Zutat ${i + 1}`}
              name={`ingredient-${i}`}
              value={ingredients[i]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleIngredientChange(event.target.value, i)
              }
            />
            <Button className="ml-sm" onClick={() => removeIngredient(i)}>
              X
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addIngredient} className="mb-md">
          Zutat hinzufügen
        </Button>
        <Textfield
          className="mb-md"
          label="Zubereitung"
          name="instructions"
          value={instructions}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInstructions(event.target.value)
          }
        />
        <Button type="submit">Erstellen</Button>
      </form>
    </div>
  );
}
