import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import React from 'react'

type ConfirmDialogProps = {
  title: string
  content: string
  onSubmit: () => void
  children: React.ReactNode
}

const ConfirmDialog = ({
  title,
  children,
  content,
  onSubmit,
}: ConfirmDialogProps) => {
  const [open, setOpen] = React.useState(false)

  const handleClose = (result: boolean) => {
    setOpen(false)
    if (result) {
      onSubmit()
    }
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>{children}</IconButton>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} autoFocus>
            Ne
          </Button>
          <Button onClick={() => handleClose(true)}>Ano</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
