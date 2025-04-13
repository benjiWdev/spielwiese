import Link from 'next/link'
import { Fragment } from 'react'
import { Routes } from '@/models/enums/Routes'
import { Button } from '@mui/material'

export default async function Dashboard() {
  return (
    <Fragment>
      <Link href={Routes.RECIPES_OVERVIEW}>
        <Button variant="contained">Rezepte</Button>
      </Link>
    </Fragment>
  )
}
