import type { NextPage } from 'next'
import Head from 'next/head'
import { Stack, Typography, CssBaseline } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import Logo from '../components/Logo'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { theme } from '../utils/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Co from '../containers/Co'
import Kdo from '../containers/Kdo'
import Jak from '../containers/Jak'

const Item = styled('div')(() => ({
  minHeight: '80vh',
}))

const Home: NextPage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>Larpový tábor</title>
      <meta name="description" content="Tábor v Mezihoří" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Stack spacing={4} justifyContent="center">
      <Banner endIcon={<KeyboardDoubleArrowDownIcon fontSize="inherit" />}>
        <Typography variant="subtitle1" color="primary.light">
          Připrav se! Začíná
        </Typography>
        <Typography variant="h1" color="primary.dark" gutterBottom>
          Larp
          <Logo size="lowercase" />
          vý táb
          <Logo size="lowercase" />r
        </Typography>
      </Banner>
      <Item id="tabor">
        <Co />
      </Item>
      <Item id="org-tym">
        <Kdo />
      </Item>
      <Item id="registrace">
        <Jak />
      </Item>
      <Footer />
    </Stack>
  </ThemeProvider>
)

export default Home
