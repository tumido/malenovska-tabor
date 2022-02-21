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
import { useState } from 'react'
import Dialog from '../components/Dialog'
import { getAuth } from 'firebase/auth'
import firebase from '../firebase/clientApp'
import { useCollection } from 'react-firebase-hooks/firestore'
import {
  addDoc,
  doc,
  collection,
  deleteDoc,
  getFirestore,
} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
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

const Registration = ({ id, firstName, lastName, progress }) => {
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
        <StyledAvatar>{`${firstName[0]}${lastName[0]}`}</StyledAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${firstName} ${lastName}`}
        secondary={'Secondary text'}
      />
    </StyledListItem>
  )
}

type EventProps = {
  name: string
  tags: string[]
  isLoading: boolean
}

const Event = ({ id, name, tags, isOpen, isLoading }: EventProps) => {
  const [user] = useAuthState(getAuth() as any)
  const [open, setOpen] = useState(false)
  const [entry, setEntry] = useState(null)
  // const db = firebase.firestore()
  const [registrations, registrationsLoading, registrationsError] =
    useCollection(
      collection(getFirestore(), 'users', user?.uid || 'null', 'registrations')
    )

  if (isLoading) {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          <Skeleton width={200} />
        </Typography>
        <Skeleton width={50} />
        <StyledContainer>
          <Skeleton width={250} />
          <Skeleton width={250} />
          <Skeleton width={150} />
        </StyledContainer>
      </div>
    )
  }

  const regsForEvent = registrations
    ? registrations.docs
        .map((r) => {
          if (r.data().event !== id) {
            return null
          }
          return <Registration key={r.id} id={r.id} {...r.data()} />
        })
        .filter((n) => n)
    : []

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {name}
      </Typography>
      {tags &&
        tags.map((t, idx) => <Chip key={idx} label={t} variant="outlined" />)}
      <StyledContainer>
        {regsForEvent.length ? (
          <>
            <List>{regsForEvent}</List>
            {/* <Button
              variant="text"
              onClick={() => {
                setEntry()
                setOpen(true)
              }}
            >
              + Přidat další
            </Button> */}
          </>
        ) : registrationsLoading ? (
          <>
            <Skeleton width={250} />
            <Skeleton width={250} />
            <Skeleton width={150} />
          </>
        ) : isOpen ? (
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
        ) : (
          <>Registrace ukončena...</>
        )}
      </StyledContainer>
      <Dialog user={user} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default Event
