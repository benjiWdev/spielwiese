'use client'

import { Ingredient, IngredientWithAmount, Measurements } from '@/models'
import { ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import RecipeCreateIngredient from './recipeCreateIngredient'
import RecipeCreateInstruction from './recipeCreateInstruction'

interface RecipeCreateFormProps {
  ingredientsProps: Ingredient[]
  submit: (name: string, ingredients: IngredientWithAmount[], instructions: string[]) => Promise<void>
}

export default function RecipeCreateForm({ ingredientsProps, submit }: RecipeCreateFormProps) {
  const [name, setName] = useState('')
  const [ingredients] = useState(ingredientsProps)
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientWithAmount[]>([])
  const [instructions, setInstructions] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)

  const unselectedIngredients = ingredients.filter(
    (ingredient) => !selectedIngredients.some((selectedIngredient) => selectedIngredient.id === ingredient.id)
  )

  const addSelectedIngredient = (selectedIngredient: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, { ...selectedIngredient, amount: { count: 0 } }])
  }

  const changeIngredientAmount = (value: string, index: number) => {
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

  const changeInstructionStep = (value: string, index: number) => {
    setInstructions(instructions.map((instruction, i) => (index === i ? value : instruction)))
  }

  const removeInstructionStep = (index: number) => {
    setInstructions(instructions.toSpliced(index, 1))
  }

  const submitValues = async () => {
    try {
      setLoading(true)
      await submit(
        name,
        selectedIngredients,
        instructions.filter((instruction) => !!instruction)
      )
      setName('')
      setSelectedIngredients([])
      setInstructions([])
    } catch (e) {
      Promise.reject(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={submitValues}>
      <Box sx={{ width: { md: '50%' }, mb: 4 }}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
      </Box>
      <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
        Zutaten
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ width: { md: '50%' }, mb: 2 }}>
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
          <Box key={`selected-ingredient-${i}`} sx={{ width: { md: '50%' }, pb: 2 }}>
            <RecipeCreateIngredient
              ingredient={selectedIngredient}
              index={i}
              changeIngredientAmount={changeIngredientAmount}
              changeIngredientMeasurement={changeIngredientMeasurement}
              removeSelectedIngredient={removeSelectedIngredient}
            />
          </Box>
        ))}
      </Box>
      <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
        Zubereitung
      </Typography>
      {instructions.map((instruction, i) => (
        <Box key={`instruction-${i}`} sx={{ width: { md: '50%' }, mb: 2 }}>
          <RecipeCreateInstruction
            instruction={instruction}
            index={i}
            removeInstructionStep={removeInstructionStep}
            changeInstructionStep={changeInstructionStep}
          />
        </Box>
      ))}
      <Button
        variant="contained"
        type="button"
        size="small"
        onClick={(e) => {
          e.preventDefault(), setInstructions([...instructions, ''])
        }}
      >
        <Typography variant="caption">Schritt hinzufügen +</Typography>
      </Button>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" type="submit" loading={loading}>
          Erstellen
        </Button>
      </Box>
    </form>
  )
}
