"use client";

import Button from "@/components/_ui/button";
import Textfield from "@/components/_ui/textfield";
import { createRecipe } from "@/lib/db";
import { useState } from "react";

interface Inputs {
  name: string;
  ingredient: string;
  instructions: string;
}

export default function CreateRecipe() {
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    ingredient: "",
    instructions: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };
  async function onSubmit() {
    const request = {
      name: inputs.name,
      ingredients: [inputs.ingredient],
      instructions: inputs.instructions,
    };
    await createRecipe(request);
  }

  return (
    <div>
      <h1 className="text-4xl mb-md">Neues Rezept</h1>
      <form action={onSubmit}>
        <Textfield
          label="Name"
          name="name"
          required
          value={inputs.name}
          onChange={handleChange}
        />
        <Textfield
          label="Zutaten"
          name="ingredient"
          required
          value={inputs.ingredient}
          onChange={handleChange}
        />
        <Textfield
          label="Zubereitung"
          name="instructions"
          required
          value={inputs.instructions}
          onChange={handleChange}
        />
        <Button type="submit">Erstellen</Button>
      </form>
    </div>
  );
}
