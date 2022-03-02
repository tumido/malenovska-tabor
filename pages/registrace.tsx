import type { NextPage } from 'next'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Frame from '../components/Frame'
import { styled } from '@mui/material/styles'
import {
  Container,
  Typography,
  Chip,
  Button,
  Grid,
  Skeleton,
  List,
  ListItem,
  Breadcrumbs,
  Card,
} from '@mui/material'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import ArrowRight from '@mui/icons-material/ArrowForwardIos'
import Dialog from '../components/Dialog'
import { RegistrationListItem } from '../components/RegistrationListItem'
import Logo from '../components/Logo'
import { ThemeProvider } from '@mui/material/styles'
import { brandingDarkTheme } from '../components/theme'

const StyledRegistrations = styled(Card)(({ theme }) => ({
  background: theme.palette.primaryDark[900],
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  [theme.breakpoints.up('lg')]: {
    borderRadius: theme.spacing(1),
  },
}))

const BannerCard = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  height: '60vh',
  backgroundColor: theme.palette.primaryDark[800],
  backgroundImage: "url('/bg.png')",
  backgroundPosition: 'left center',
  backgroundSize: 'auto 600px',
  backgroundRepeat: 'no-repeat',
  marginBottom: -150,
}))

const Banner = () => {
  const tags = ['Ročník 2022', 'Křekov']
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <BannerCard>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item>
            <Typography variant="h1" gutterBottom>
              Larp
              <Logo />
              vý Táb
              <Logo />r /{` `}
              <Typography color="text.primary" variant="h1" component="span">
                Registrace
              </Typography>
            </Typography>
            {tags &&
              tags.map((t, idx) => (
                <Chip key={idx} label={t} variant="outlined" />
              ))}
          </Grid>
        </Grid>
      </BannerCard>
    </ThemeProvider>
  )
}

const Overview: NextPage = () => {
  const [user, userLoading, userError] = useAuthState(getAuth() as any)
  const router = useRouter()
  const db = getFirestore()
  const [open, setOpen] = useState(false)
  const [entry, setEntry] = useState(null)
  const [registrations, registrationsLoading, registrationsError] =
    useCollection(collection(db, 'users', user?.uid || 'null', 'registrations'))

  if (userLoading || registrationsLoading) {
    return (
      <Frame>
        <Banner />
        <ThemeProvider theme={brandingDarkTheme}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} lg={6}>
              <StyledRegistrations>
                <RegistrationListItem isLoading />
              </StyledRegistrations>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Frame>
    )
  }
  if (!user || userError) {
    router.push('/login')
  }

  const handleEdit = (entry) => () => {
    setEntry(entry)
    setOpen(true)
  }

  const regsForEvent = registrations
    ? registrations.docs.map((r) => {
        return (
          <RegistrationListItem
            onEdit={handleEdit(r)}
            key={r.id}
            id={r.id}
            data={r.data()}
          />
        )
      })
    : []

  return (
    <Frame>
      <Banner />
      <Grid container justifyContent="center" spacing={4} alignItems="center">
        <Grid item xs={12} lg={6}>
          <Container maxWidth="lg">
            <ThemeProvider theme={brandingDarkTheme}>
              <StyledRegistrations elevation={2}>
                {regsForEvent.length ? (
                  <>
                    <List>{regsForEvent}</List>
                    <Button
                      sx={{ ml: 1, mt: 1 }}
                      variant="text"
                      onClick={() => {
                        setEntry(null)
                        setOpen(true)
                      }}
                    >
                      + Přidat další
                    </Button>
                  </>
                ) : (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h6" gutterBottom>
                        Ještě nemáte vytvořenou žádnou registraci
                      </Typography>
                    </Grid>
                    <Grid item>
                      <EmojiNatureIcon
                        sx={{ fontSize: '5rem', color: 'gray' }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEntry(null)
                          setOpen(true)
                        }}
                      >
                        Zaregistrovat <ArrowRight />
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </StyledRegistrations>
            </ThemeProvider>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Typography variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
              ab voluptatem eligendi culpa illo corporis temporibus quod officia
              ut, laboriosam sapiente et officiis esse, unde numquam fugiat quis
              magni! Repellat deserunt, non praesentium assumenda molestias
              temporibus porro nostrum vitae pariatur, aliquid aperiam quod
              reprehenderit. Delectus neque suscipit rerum sint consequatur
              dolores, voluptatem ipsum at sapiente quibusdam. Odit laboriosam
              iure hic, eius adipisci illo enim? Maiores, eius! Deserunt
              repellendus omnis perferendis at. Cum nemo porro sapiente. Quas et
              voluptas neque eos aut soluta nobis quidem non pariatur,
              reprehenderit nihil corporis modi ab fuga, fugit magnam sequi
              obcaecati deleniti sed? Amet, tempora?
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Dialog
        user={user}
        entry={entry}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Frame>
  )
}

export default Overview
