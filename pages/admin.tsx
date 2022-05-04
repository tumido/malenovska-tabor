import React, { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Button,
  ButtonProps,
} from '@mui/material'
import { ThemeProvider, styled } from '@mui/material/styles'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocumentOnce } from 'react-firebase-hooks/firestore'
import { collection } from 'firebase/firestore'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { CSVLink } from 'react-csv'
import { theme } from '../utils/theme'
import firebase from '../firebase/clientApp'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ListRegistration from '../components/ListRegistration'
import DashboardTile from '../components/DashboardTile'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import DoneIcon from '@mui/icons-material/Done'
import { Registration } from '../firebase/schema'

const StyledWrapper = styled('div')({
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#fff2ca',
  backgroundPosition: 'bottom center',
  backgroundImage: "url('/forest.png')",
  backgroundSize: '100% auto',
  minHeight: '100vh',
  backgroundAttachment: 'fixed',
})

const CopyButton = ({
  onClick: handleClick,
  children,
  startIcon,
  variant,
  ...props
}: ButtonProps) => {
  const [customVariant, setCustomVariant] = useState(variant)
  const [customChildren, setCustomChildren] = useState(children)
  const [customStartIcon, setCustomStartIcon] = useState(startIcon)

  return (
    <Button
      {...props}
      variant={customVariant}
      startIcon={customStartIcon}
      onClick={(e) => {
        setCustomVariant('contained')
        setCustomStartIcon(<DoneIcon />)
        setCustomChildren(<>Zkopírováno</>)
        setTimeout(() => {
          setCustomVariant(variant)
          setCustomChildren(children)
          setCustomStartIcon(startIcon)
        }, 1000)
        handleClick && handleClick(e)
      }}
    >
      {customChildren}
    </Button>
  )
}

const Admin = () => {
  const [user, loading, error] = useAuthState(firebase.auth() as any)
  const router = useRouter()
  const csvRef = useRef() as any
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

  const handleDeleteEntry = async (id: string) => {
    await firebase.firestore().collection('registrations').doc(id).delete()
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 15 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <DashboardTile title="Přihlášených účastníku" count={data.length} />
          <div style={{ flexGrow: 1 }} />
          <CopyButton
            startIcon={<AlternateEmailIcon />}
            variant="outlined"
            onClick={() => handleCopyEmailToClipboard('email')}
          >
            E-mail účastníkům
          </CopyButton>
          <CopyButton
            startIcon={<AlternateEmailIcon />}
            variant="outlined"
            onClick={() => handleCopyEmailToClipboard('parent_email')}
          >
            E-mail rodičům
          </CopyButton>
          <Button
            startIcon={<FileDownloadIcon />}
            variant="outlined"
            onClick={() => csvRef?.current?.link.click()}
          >
            Exportovat do CSV
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ListRegistration data={data} onDeleteEntry={handleDeleteEntry} />
        </Grid>
      </Grid>
      <CSVLink ref={csvRef} data={data} filename="export.csv" />
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
