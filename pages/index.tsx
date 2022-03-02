import type { NextPage } from 'next'
import Head from 'next/head'
import {
  ListItem,
  Box,
  ListItemText,
  Container,
  Grid,
  Card,
} from '@mui/material'
import Frame from '../components/Frame'
import { styled } from '@mui/material/styles'

const Main = styled('div')(() => ({
  backgroundImage: 'url(/spring.jpg)',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: 'center bottom',
  backgroundSize: 'auto 700px',
  backgroundColor: '#afd0df',
  width: '100%',
  height: '100vh',
}))

const Home: NextPage = () => {
  return (
    <Frame theme="light">
      <Head>
        <title>Malenovský tábor</title>
        <meta name="description" content="Tábor v mezihoří" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item>
              <Card>Tábor</Card>
            </Grid>
            <Grid item>
              <Card>Organizátoři</Card>
            </Grid>
            <Grid item>
              <Card>Registrace</Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Frame>
  )
}

export default Home
