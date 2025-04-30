import { IconButton, Stack, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ChangeEvent } from 'react'

interface RecipeCreateInstructionProps {
  instruction: string
  index: number
  changeInstructionStep: (value: string, index: number) => void
  removeInstructionStep: (index: number) => void
}

export default function RecipeCreateInstruction({
  instruction,
  index,
  changeInstructionStep,
  removeInstructionStep,
}: RecipeCreateInstructionProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={() => removeInstructionStep(index)}>
        <DeleteIcon />
      </IconButton>
      <TextField
        className="mb-md"
        label={`Schritt ${index + 1}`}
        name="instructions"
        multiline
        value={instruction}
        onChange={(event: ChangeEvent<HTMLInputElement>) => changeInstructionStep(event.target.value, index)}
        sx={{ flexGrow: 1 }}
      />
    </Stack>
  )
}
