import type { NextPage } from 'next'
import { Container, CssBaseline } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import { brandingDarkTheme, brandingLightTheme } from './theme'

const Main = styled('main')(() => ({
  backgroundImage: 'url(/bg.png)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left top',
  backgroundSize: '800px auto',
  width: '100%',
}))

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: '30vh',
  }
})

const Frame: NextPage = ({ theme: themePreference, children }) => {
  const theme =
    themePreference === 'blue' ? brandingDarkTheme : brandingLightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main>
        <StyledContainer maxWidth="lg">{children}</StyledContainer>
      </Main>
    </ThemeProvider>
  )
}

export default Frame
