import type { NextPage } from 'next'
import { collection, getFirestore, deleteDoc, doc } from 'firebase/firestore'
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
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
} from '@mui/material'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowRight from '@mui/icons-material/ArrowForwardIos'
import Dialog from '../components/Dialog'
import EditIcon from '@mui/icons-material/Edit'

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    background: theme.palette.primaryDark[900],
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    borderRadius: theme.spacing(1),
  }
})

const StyledListItem = styled(ListItem)(({ theme }) => {
  return {
    // background: 'rgba(255,255,255,0.08)',
    background: theme.palette.primaryDark[900],
    borderRadius: 6,
    // margin: theme.spacing(1),
    marginLeft: 0,
    '&:hover': {
      background: theme.palette.primaryDark[600],
    },
  }
})

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary[400],
}))
const Registration = ({ id, name, nick, progress }) => {
  const [user] = useAuthState(getAuth() as any)
  const handleDelete = () => {
    if (!user) {
      return null
    }
    console.log(id)
    deleteDoc(
      doc(getFirestore(), 'users', user.uid || 'null', 'registrations', id)
    )
  }
  const initials = name
    .split(/\s+/)
    .map((v) => v[0])
    .join('')
  return (
    <StyledListItem
      secondaryAction={
        <>
          <IconButton edge="start" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon onClick={handleDelete} />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <StyledAvatar>{initials}</StyledAvatar>
      </ListItemAvatar>
      <ListItemText primary={nick || name} secondary={nick ? name : ''} />
    </StyledListItem>
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

  if (userLoading) {
    return (
      <Frame>
        <Typography variant="h2" gutterBottom>
          <Skeleton width={200} />
        </Typography>
        <Skeleton width={50} />
        <StyledContainer>
          <Skeleton width={250} />
          <Skeleton width={250} />
          <Skeleton width={150} />
        </StyledContainer>
      </Frame>
    )
  }
  if (!user || userError) {
    router.push('/login')
  }

  const regsForEvent = registrations
    ? registrations.docs.map((r) => {
        return <Registration key={r.id} id={r.id} {...r.data()} />
      })
    : []

  const tags = ['Ročník 2022', 'Křekov']

  return (
    <Frame theme="blue">
      <Typography variant="h2" gutterBottom>
        Malenovský tábor
      </Typography>
      {tags &&
        tags.map((t, idx) => <Chip key={idx} label={t} variant="outlined" />)}
      <StyledContainer>
        {regsForEvent.length ? (
          <>
            <List>{regsForEvent}</List>
            <Button
              variant="text"
              onClick={() => {
                setEntry()
                setOpen(true)
              }}
            >
              + Přidat další
            </Button>
          </>
        ) : registrationsLoading ? (
          <>
            <Skeleton width={250} />
            <Skeleton width={250} />
            <Skeleton width={150} />
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
              <EmojiNatureIcon sx={{ fontSize: '5rem', color: 'gray' }} />
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
      </StyledContainer>
      <Dialog user={user} open={open} onClose={() => setOpen(false)} />
    </Frame>
  )
}

export default Overview
