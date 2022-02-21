import type { NextPage } from 'next'
import Head from 'next/head'
import { ListItem, Box, ListItemText } from '@mui/material'
import Frame from '../components/Frame'

const Home: NextPage = () => {
  return (
    <Frame>
      <Head>
        <title>Malenovský tábor</title>
        <meta name="description" content="Tábor v mezihoří" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <ListItem>
          <ListItemText>A</ListItemText>
        </ListItem>
        <ListItem>A</ListItem>
        <ListItem>A</ListItem>
        <ListItem>A</ListItem>
      </Box>
    </Frame>
  )
}

export default Home
