import { getFirestore, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { styled } from '@mui/material/styles'
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
  LinearProgress,
  Skeleton,
  Hidden,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box } from '@mui/system'

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary[400],
}))

type RegistrationListItemProps = {
  id?: string
  name?: string
  nick?: string
  isLoading?: boolean
  onEdit?: any
}
export const RegistrationListItem = ({
  id,
  isLoading,
  onEdit,
  data,
}: RegistrationListItemProps) => {
  const [user] = useAuthState(getAuth() as any)

  const handleDelete = () => {
    if (!user || !id) {
      return null
    }
    deleteDoc(
      doc(
        getFirestore() as any,
        'users',
        user.uid || 'null',
        'registrations',
        id
      )
    )
  }

  if (isLoading) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton width={200} />}
          secondary={<Skeleton width={100} />}
        />
      </ListItem>
    )
  }

  const initials = data.name
    ? data.name
        .split(/\s+/)
        .map((v) => v[0])
        .join('')
    : ''

  return (
    <ListItem
      divider
      secondaryAction={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Hidden mdDown>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Čeká na schválení
                </Typography>
              </Box>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={40} />
              </Box>
            </Box>
          </Hidden>
          <IconButton onClick={onEdit} edge="start" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemAvatar>
        <StyledAvatar>{initials}</StyledAvatar>
      </ListItemAvatar>
      <ListItemText
        primary={data.nick || data.name}
        secondary={data.nick ? data.name : ''}
      />
    </ListItem>
  )
}

export default RegistrationListItem
