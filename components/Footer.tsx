import {
  Container,
  Divider,
  Typography,
  Grid,
  Paper,
  Link,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import Logo from './Logo'
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded'

const StyledFooter = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(10),
}))

const Footer = () => (
  <StyledFooter>
    <Divider />
    <Container maxWidth="lg" sx={{ my: 4, mx: 'auto' }}>
      <Grid container spacing={{ xs: 5, md: 4 }} alignItems="center">
        <Grid item xs={12} sm={6} md={6} sx={{ mb: { md: 4 } }}>
          <Typography variant="h2" sx={{ maxWidth: 460, mb: 1 }}>
            Táb
            <Logo size="uppercase" />r bude!
          </Typography>
          <Typography color="grey.800" sx={{ mt: 1, mb: 2, maxWidth: 450 }}>
            Tábor pořádá organizace Strážci Mezihoří, z.s.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6} container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              component={Link}
              href="https://malenovska.cz"
              variant="outlined"
              sx={{
                p: 2,
                height: '100%',
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                Malenovská
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Pořádáme i bitvy Malenovská a Malenovská Šarvátka
              </Typography>
              <Typography
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                Další informace{' '}
                <KeyboardArrowRightRounded
                  fontSize="small"
                  sx={{ verticalAlign: 'middle' }}
                />
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              component={Link}
              href="https://zlisky.cz"
              variant="outlined"
              sx={{
                p: 2,
                height: '100%',
                display: 'block',
                textDecoration: 'none',
              }}
            >
              <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                Zlišky
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Na akci se podílí dřevárnická skupina přátel Zlišky
              </Typography>
              <Typography
                color="primary"
                variant="body2"
                fontWeight="bold"
                sx={{
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                Další informace{' '}
                <KeyboardArrowRightRounded
                  fontSize="small"
                  sx={{ verticalAlign: 'middle' }}
                />
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </StyledFooter>
)
export default Footer
