'use client'

import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'

interface IngredientCreateFormProps {
  submit: (name: string) => Promise<void>
}

export default function IngredientCreateForm({ submit }: IngredientCreateFormProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const submitValues = async () => {
    try {
      setLoading(true)
      await submit(name)
      setName('')
    } catch (e) {
      Promise.reject(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={submitValues}>
      <Box sx={{ width: '50%', mb: 2 }}>
        <TextField label="Name" required fullWidth value={name} onChange={(event) => setName(event.target.value)} />
      </Box>
      <Button variant="contained" type="submit">
        Erstellen
      </Button>
      {loading && <p>Loading...</p>}
    </form>
  )
}
