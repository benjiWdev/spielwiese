import { Measurements } from '@/models/enums/Measurements'
import { IngredientWithAmount } from '@/models/Ingredient'
import {
  Select,
  MenuItem,
  IconButton,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface RecipeCreateIngredientProps {
  ingredient: IngredientWithAmount
  index: number
  changeIngredientAmount: (value: string, index: number) => void
  changeIngredientMeasurement: (value: Measurements, index: number) => void
  removeSelectedIngredient: (index: number) => void
}

export default function RecipeCreateIngredient({
  ingredient,
  index,
  changeIngredientAmount,
  changeIngredientMeasurement,
  removeSelectedIngredient,
}: RecipeCreateIngredientProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <IconButton onClick={() => removeSelectedIngredient(index)}>
        <DeleteIcon />
      </IconButton>
      <FormControl>
        <InputLabel>Anzahl</InputLabel>
        <OutlinedInput
          label="Anzahl"
          type="number"
          size="small"
          value={ingredient.amount.count}
          sx={{ width: 100 }}
          inputProps={{ min: 0 }}
          onChange={(event) => changeIngredientAmount(event.target.value, index)}
        ></OutlinedInput>
      </FormControl>
      <FormControl sx={{ minWidth: 100 }}>
        <InputLabel size="small">Art</InputLabel>
        <Select
          label="Art"
          size="small"
          value={ingredient.amount.measurement || ''}
          onChange={(event) => changeIngredientMeasurement(event.target.value as Measurements, index)}
        >
          <MenuItem value={undefined}>-</MenuItem>
          <MenuItem value={Measurements.PIECE}>Stück</MenuItem>
          <MenuItem value={Measurements.TL}>TL</MenuItem>
          <MenuItem value={Measurements.EL}>EL</MenuItem>
          <MenuItem value={Measurements.ML}>ML</MenuItem>
          <MenuItem value={Measurements.G}>Gramm</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h5" component="p">
        {ingredient.name}
      </Typography>
    </Stack>
  )
}
