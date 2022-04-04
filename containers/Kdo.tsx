import { Grid, Typography, Container } from '@mui/material'
import Logo from '../components/Logo'
import Avatar from '../components/Avatar'

const people = [
  { avatar: '/vydra.jpg', name: 'Vydra' },
  { avatar: '/skali.jpg', name: 'Skali' },
  { avatar: '/kuldas.jpg', name: 'Kulďas' },
]

const Kdo = () => (
  <>
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        Kd
        <Logo size="uppercase" />?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam illo
        harum accusantium enim est non ut in deleniti ex praesentium recusandae
        dolorem vero qui aut perferendis officiis nihil facere, eos sit illum
        incidunt! Soluta veniam alias provident voluptatem esse, illo mollitia.
        Exercitationem eaque accusantium ullam nisi distinctio ut aut suscipit!
      </Typography>
    </Container>
    <Grid container alignItems="center" justifyContent="center">
      {people.map((p) => (
        <Grid key={p.name} item>
          <Avatar src={p.avatar} name={p.name} />
        </Grid>
      ))}
    </Grid>
  </>
)

export default Kdo
