import { Container, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import Logo from './Logo'

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.light, 0.2),
  paddingTop: '3em',
}))

const Footer = () => (
  <StyledFooter>
    <Container maxWidth="lg">
      <Typography variant="button" textAlign="center">
        <Logo size="uppercase" /> Zlišky ❤️
      </Typography>
    </Container>
  </StyledFooter>
)
export default Footer
