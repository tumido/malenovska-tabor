import { useState } from 'react'
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import schema from '../firebase/schema'

type DialogProps = {
  open: boolean
  onClose: any
  entry?: any
  user: any
}

const Parent = () => {
  return (
    <>
      <Grid item xs={6}>
        <TextField
          fullWidth
          id="parentName"
          label="Celé jméno"
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth id="address" label="Adresa" variant="standard" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="email" label="E-mail" variant="standard" />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth id="phone" label="Telefon" variant="standard" />
      </Grid>
    </>
  )
}

const Dialog = ({ open, onClose, entry, user }: DialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const handleSave = () => {
    if (!user) {
      return null
    }
    const sanitizedData = Object.entries(data).reduce(
      (acc, [k, v]) => (v !== undefined ? { ...acc, [k]: v } : acc),
      {}
    )
    addDoc(
      collection(getFirestore(), 'users', user.uid || 'null', 'registrations'),
      sanitizedData
    )
  }
  const [data, setData] = useState({
    name: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    phone: user.phone,
  })

  const updateData = (field, idx) => (event) => {
    if (idx) {
      const newValue = data[field]
      newValue[idx] = event.target.value
      setData({ ...data, [field]: newValue })
    } else {
      setData({ ...data, [field]: event.target.value })
    }
  }

  console.log(data)

  return (
    <MuiDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="edit"
      maxWidth="lg"
    >
      {/* <DialogTitle id="edit">
        {entry ? 'Upravit registraci' : 'Nová registrace'}
      </DialogTitle> */}
      <DialogContent>
        <Grid container spacing={2}>
          {schema.map((section) => {
            if (section.repeatable) {
              const idx = data[section.id]?.length || 0
            }
            const fields = section.fields.map((i) => (
              <Grid key={i.props.id} item {...i.sizing}>
                <i.component
                  {...i.props}
                  value={data[i.props.id]}
                  onChange={updateData(i.props.id)}
                />
              </Grid>
            ))

            return (
              <>
                <Grid item xs={12}></Grid>
                {section.title && (
                  <Grid item xs={12}>
                    <Typography variant="h5">{section.title}</Typography>
                  </Grid>
                )}
                {fields}
              </>
            )
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zrušit</Button>
        <Button
          onClick={() => {
            handleSave()
            onClose()
          }}
          autoFocus
        >
          Uložit
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}

export default Dialog
