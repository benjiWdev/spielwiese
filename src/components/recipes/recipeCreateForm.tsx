'use client'

import { Measurements } from '@/models/enums/Measurements'
import { Ingredient, IngredientWithAmount } from '@/models/Ingredient'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { Autocomplete, Box, TextField } from '@mui/material'
import RecipeCreateIngredient from './recipeCreateIngredient'

interface RecipeCreateFormProps {
  ingredientsProps: Ingredient[]
  submit: (name: string, ingredients: IngredientWithAmount[], instructions: string) => Promise<void>
}

export default function RecipeCreateForm({ ingredientsProps, submit }: RecipeCreateFormProps) {
  const [name, setName] = useState('')
  const [ingredients] = useState<Ingredient[]>(ingredientsProps)
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientWithAmount[]>([])
  const [instructions, setInstructions] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const unselectedIngredients = ingredients.filter(
    (ingredient) => !selectedIngredients.some((selectedIngredient) => selectedIngredient.id === ingredient.id)
  )

  const addSelectedIngredient = (selectedIngredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, { ...selectedIngredient, amount: { count: 0 } }])
  }

  const changeIngredientAmount = (value: string, index: number) => {
    console.log(value)
    setSelectedIngredients(
      selectedIngredients.map((selectedIngredient, i) =>
        index === i
          ? {
              ...selectedIngredient,
              amount: {
                ...selectedIngredient.amount,
                count: Number(value),
              },
            }
          : selectedIngredient
      )
    )
  }

  const changeIngredientMeasurement = (value: Measurements, index: number) => {
    setSelectedIngredients(
      selectedIngredients.map((selectedIngredient, i) =>
        index === i
          ? {
              ...selectedIngredient,
              amount: {
                ...selectedIngredient.amount,
                measurement: value,
              },
            }
          : selectedIngredient
      )
    )
  }

  const removeSelectedIngredient = (index: number) => {
    setSelectedIngredients(selectedIngredients.toSpliced(index, 1))
  }

  const submitValues = async () => {
    try {
      setLoading(true)
      await submit(name, selectedIngredients, instructions)
    } catch (e) {
      console.error(e)
      Promise.resolve()
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={submitValues}>
      <Box sx={{ width: '50%', mb: 2 }}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
      </Box>
      <Box sx={{ width: '50%', mb: 2 }}>
        <Autocomplete
          options={unselectedIngredients}
          getOptionLabel={(option) => option.name}
          fullWidth
          onChange={(_, newInputValue) => {
            if (newInputValue) {
              addSelectedIngredient(newInputValue)
            }
          }}
          renderInput={(params) => <TextField {...params} label="Zutaten durchsuchen" />}
        />
      </Box>
      {selectedIngredients.map((selectedIngredient, i) => (
        <Box key={`selected-ingredient-${i}`} sx={{ width: '50%', mb: 2 }}>
          <RecipeCreateIngredient
            ingredient={selectedIngredient}
            index={i}
            changeIngredientAmount={changeIngredientAmount}
            changeIngredientMeasurement={changeIngredientMeasurement}
            removeSelectedIngredient={removeSelectedIngredient}
          />
        </Box>
      ))}
      <Box sx={{ width: '50%', mb: 2 }}>
        <TextField
          className="mb-md"
          label="Zubereitung"
          name="instructions"
          multiline
          fullWidth
          value={instructions}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInstructions(event.target.value)}
        />
      </Box>
      <Button variant="contained" type="submit">
        Erstellen
      </Button>
      {loading && <p>Loading...</p>}
    </form>
  )
}
