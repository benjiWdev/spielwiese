'use client'

import { Box, TextField, Button, Stack } from '@mui/material'
import { useState } from 'react'

interface IngredientCreateFormProps {
  submit: (name: string) => Promise<void>
}

export default function IngredientCreateForm({ submit }: IngredientCreateFormProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

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
      <Stack direction="row" alignItems="center" sx={{ mb: 4 }}>
        <Box sx={{ width: '50%', mr: 2 }}>
          <TextField label="Name" required fullWidth value={name} onChange={(event) => setName(event.target.value)} />
        </Box>
        <Button variant="contained" type="submit" size="large" loading={loading}>
          Erstellen
        </Button>
      </Stack>
    </form>
  )
}
