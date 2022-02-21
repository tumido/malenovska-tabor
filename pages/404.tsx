import { Container } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

const Custom404 = () => {
  return (
    <Container maxWidth="lg">
      <h1>Nenalezeno</h1>
      <Box sx={{ height: 500, position: 'relative' }}>
        <Image src="/404.svg" alt="Stránka nenalezena" layout="fill" />
      </Box>
    </Container>
  )
}

export default Custom404
