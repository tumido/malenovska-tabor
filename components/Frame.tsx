import type { NextPage } from 'next'
import { CssBaseline, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import { brandingDarkTheme, brandingLightTheme } from './theme'

const Frame: NextPage = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={brandingDarkTheme}>
        <Header />
      </ThemeProvider>
      {children}
    </>
  )
}

export default Frame
