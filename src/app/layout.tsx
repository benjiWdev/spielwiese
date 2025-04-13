import type { Metadata } from 'next'
import '@/styles/globals.css'
import NavBar from '@/components/navigation/navbar'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { Container, Grid } from '@mui/material'

export const metadata: Metadata = {
  title: 'Cooklet',
  description: 'Rezepte speichern leicht gemacht!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body>
        <AppRouterCacheProvider>
          <NavBar />
          <Container sx={{ mt: 4 }}>
            <main>{children}</main>
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
