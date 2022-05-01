import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { CssBaseline, Typography, Container, Grid, Button } from '@mui/material'
import { ThemeProvider, styled } from '@mui/material/styles'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import { theme } from '../utils/theme'
import firebase from '../firebase/clientApp'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ListRegistration from '../components/ListRegistration'
import DashboardTile from '../components/DashboardTile'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { Registration } from '../firebase/schema'

const StyledWrapper = styled('div')({
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#fff2ca',
  backgroundPosition: 'bottom center',
  backgroundImage: "url('forest.png')",
  height: '100vh',
  backgroundAttachment: 'fixed',
  overflowY: 'scroll',
})

const Admin = () => {
  const [user, loading, error] = useAuthState(firebase.auth() as any)
  const router = useRouter()
  const [registrations, loadingRegistrations, errorRegistrations] =
    useCollection(collection(firebase.firestore(), 'registrations'))

  if (loading || loadingRegistrations) {
    return (
      <Banner height={'100vh'}>
        <Typography variant="subtitle1" color="primary.light">
          Načítám informace...
        </Typography>
      </Banner>
    )
  }

  if (error || !user || errorRegistrations) {
    router.push('/login')
    return (
      <Banner height={'100vh'}>
        <Typography variant="subtitle1" color="primary.light">
          Přesměrovávám...
        </Typography>
      </Banner>
    )
  }

  const data = (registrations?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) || []) as Registration[]

  const handleCopyEmailToClipboard = (property: keyof Registration) => {
    navigator.clipboard.writeText(data.map((doc) => doc[property]).join(', '))
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 15 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
          <DashboardTile title="Přihlášených účastníku" count={data.length} />
          <Button
            startIcon={<AlternateEmailIcon />}
            variant="outlined"
            sx={{ ml: 'auto' }}
            onClick={() => handleCopyEmailToClipboard('email')}
          >
            E-mail účastníkům
          </Button>
          <Button
            startIcon={<AlternateEmailIcon />}
            variant="outlined"
            onClick={() => handleCopyEmailToClipboard('parent_email')}
          >
            E-mail rodičům
          </Button>
          <Button startIcon={<FileDownloadIcon />} variant="outlined">
            Exportovat do CSV
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ListRegistration data={data} />
        </Grid>
      </Grid>
    </Container>
  )
}

const AdminWrapper: NextPage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StyledWrapper>
      <Header />
      <Admin />
    </StyledWrapper>
  </ThemeProvider>
)

export default AdminWrapper
