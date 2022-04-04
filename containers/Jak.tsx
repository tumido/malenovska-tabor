import { Typography, Container } from '@mui/material'
import Wizard from '../components/Wizard'

const Jak = () => (
  <Container maxWidth="lg">
    <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
      Jak?
    </Typography>
    <Typography variant="body1" gutterBottom>
      Registrace je veskrze jednoduchá, nepodepisuje se krví, ani duši není
      třeba odevzdat.Stačí vyplnit pár údajů, kliknout {`"`}Odeslat
      {`"`} a je hotovo. Dále se s vámi organizátoři spojí emailem. Jdeme na to:
    </Typography>
    {/* <Registration /> */}
    <Wizard />
  </Container>
)

export default Jak
