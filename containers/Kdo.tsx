import { Grid, Typography, Container } from '@mui/material'
import Logo from '../components/Logo'
import Avatar from '../components/Avatar'

const people = [
  {
    avatar: '/vydra.jpg',
    nick: 'Vydra',
    name: 'Martin Andrýsek',
    role: 'Hlavní vedoucí',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam illo harum accusantium enim est non ut in deleniti ex praesentium recusandae',
  },
  {
    avatar: '/skali.jpg',
    nick: 'Skali',
    name: 'Petr Skalka',
    role: 'Vedoucí',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam illo harum accusantium enim est non ut in deleniti ex praesentium recusandae',
  },
  {
    avatar: '/kuldas.jpg',
    nick: 'Kulďas',
    name: 'Michal Řezáč',
    role: 'Vedoucí',
    desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam illo harum accusantium enim est non ut in deleniti ex praesentium recusandae',
  },
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
      <Grid
        sx={{ mt: 3 }}
        container
        alignItems="stretch"
        justifyContent="center"
        spacing={2}
      >
        {people.map((p) => (
          <Grid key={p.name} item xs={12} sm={6} lg={4}>
            <Avatar {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
)

export default Kdo
