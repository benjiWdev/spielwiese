'use client'

import { createIngredient } from '@/lib/db'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Fragment, useState } from 'react'

export default function CreateRecipe() {
  const [name, setName] = useState('')

  async function onSubmit() {
    await createIngredient(name)
    setName('')
  }

  return (
    <Fragment>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Neue Zutat hinzufügen
      </Typography>
      <form action={onSubmit}>
        <Box sx={{ width: '50%', mb: 2 }}>
          <TextField label="Name" required fullWidth value={name} onChange={(event) => setName(event.target.value)} />
        </Box>
        <Button variant="contained" type="submit">
          Erstellen
        </Button>
      </form>
    </Fragment>
  )
}
