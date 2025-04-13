'use client'

import { Routes } from '@/models/enums/Routes'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const navigationElements = [
    {
      name: 'Dashboard',
      link: Routes.DASHBOARD,
    },
    {
      name: 'Rezepte',
      link: Routes.RECIPES_OVERVIEW,
    },
    {
      name: 'Zutaten',
      link: Routes.INGREDIENTS,
    },
  ]

  const pathname = usePathname()

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography component="h1" variant="h3" color="primary">
          Cooklet
        </Typography>
        <div>
          {navigationElements.map((elem) => (
            <Link key={`nav-${elem.name}`} href={elem.link}>
              <Button variant={elem.link === pathname ? 'outlined' : 'text'} sx={{ mx: 1, px: 3 }}>
                {elem.name}
              </Button>
            </Link>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  )
}
