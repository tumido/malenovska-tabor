import type { NextPage } from 'next'
import Head from 'next/head'
import { Grid, Stack, Typography, CssBaseline } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import Logo from '../components/Logo'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import Slide from '@mui/material/Slide'
import { theme } from '../utils/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Co from '../containers/Co'
import Kdo from '../containers/Kdo'
import Jak from '../containers/Jak'

const Banner = styled('div')(({ theme }) => ({
  backgroundColor: '#fff2ca',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  [theme.breakpoints.up('xl')]: {
    backgroundSize: '100% auto',
  },
  backgroundImage: "url('forest.png')",
  width: '100%',
  height: '80vh',
}))
const Item = styled('div')(() => ({
  minHeight: '80vh',
}))

const Home: NextPage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>Larpový tábor</title>
      <meta name="description" content="Tábor v mezihoří" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Stack spacing={4} justifyContent="center">
      <Banner>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary.light">
              Připrav se! Začíná
            </Typography>
            <Typography variant="h1" color="primary.dark" gutterBottom>
              Larp
              <Logo size="lowercase" />
              vý táb
              <Logo size="lowercase" />r
            </Typography>
          </Grid>
          <Grid item xs={12} alignSelf="flex-end">
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
              <Typography
                variant="h1"
                component="div"
                color="primary.contrastText"
              >
                <KeyboardDoubleArrowDownIcon fontSize="inherit" />
              </Typography>
            </Slide>
          </Grid>
        </Grid>
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
