import { Grid, Typography, Container, Button } from '@mui/material'
import Logo from '../components/Logo'
import OrderedList from '../components/OrderedList'
import Image from '../components/Image'

const Co = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        C<Logo size="uppercase" />?
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <OrderedList>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              accusamus iusto voluptatum dicta atque commodi exercitationem.
              Voluptatibus commodi optio ullam doloremque illo vel temporibus
              dicta! Enim eaque nulla optio nemo! Molestiae repudiandae eius ad
              a odio? Aliquid nobis ad tempore ratione, minima et quod quos, quo
              labore optio quidem debitis! Suscipit, labore distinctio! Sunt
              nobis repudiandae nulla placeat aut!
            </li>
            <li>
              Tradiční Larpový tábor pro účastníky ze všech koutků ČR se letos
              přesouvá na novou základnu. Tábor proběhne na Křekově u Valašských
              Klobouk
              <Button
                variant="text"
                size="large"
                href="https://www.facebook.com/SMRzakladna/"
              >
                Facebookové stránky základny
              </Button>
              <Button
                variant="text"
                size="large"
                href="https://www.facebook.com/SMRzakladna/"
              >
                Mapy.cz
              </Button>
            </li>
            <li>Termín: 20.8.2022 - 26.8.2022</li>
            <li>Cena: 4000 Kč</li>
          </OrderedList>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Image src="/smr_zakladna.jpg" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Co
