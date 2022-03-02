import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import {
  validationSchema,
  layoutSchema,
  initialValues,
} from '../firebase/schema'
import { brandingDarkTheme } from './theme'
import { ThemeProvider } from '@mui/material/styles'
import { useFormik } from 'formik'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker } from '@mui/lab'
import csLocale from 'date-fns/locale/cs'

type DialogProps = {
  open: boolean
  onClose: any
  entry?: any
  user: any
}

const Dialog = ({ open, onClose, entry, user }: DialogProps) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const db = getFirestore()
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      if (!user) {
        return
      }

      if (entry) {
        setDoc(
          doc(db as any, 'users', user.uid, 'registrations', entry.id),
          data
        )
      } else {
        addDoc(collection(db, 'users', user.uid, 'registrations'), data)
      }

      onClose()
    },
  })
  console.log(formik.values)

  useEffect(() => {
    const sourced = entry
      ? Object.fromEntries(
          Object.entries(entry?.data()).map(([k, v]) => [
            k,
            v.toDate ? v.toDate() : v,
          ])
        )
      : {}
    formik.setValues({
      ...initialValues,
      ...sourced,
    })
  }, [entry])

  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
        <MuiDialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
          aria-labelledby="edit"
          maxWidth="lg"
        >
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                {layoutSchema.map((section) => {
                  const fields = section.fields.map((i) => (
                    <Grid key={i.props.id} item {...i.sizing}>
                      {i.component === DatePicker ? (
                        <i.component
                          value={formik.values[i.props.id] || null}
                          {...i.props}
                          clearable
                          mask="__.__.____"
                          onChange={(value) =>
                            formik.setFieldValue(i.props.id, value, true)
                          }
                          renderInput={(props) => (
                            <TextField
                              {...props}
                              {...i.renderProps}
                              error={
                                formik.touched[i.props.id] &&
                                Boolean(formik.errors[i.props.id])
                              }
                              helperText={
                                formik.touched[i.props.id] &&
                                formik.errors[i.props.id]
                              }
                              required={
                                validationSchema.fields[i.props.id].spec
                                  .presence === 'required'
                              }
                              onBlur={() =>
                                formik.setFieldTouched(i.props.id, true, true)
                              }
                            />
                          )}
                        />
                      ) : (
                        <i.component
                          {...i.props}
                          value={
                            i.options && !Boolean(formik.values[i.props.id])
                              ? i.options[0].value
                              : formik.values[i.props.id]
                          }
                          onChange={formik.handleChange(i.props.id)}
                          error={
                            formik.touched[i.props.id] &&
                            Boolean(formik.errors[i.props.id])
                          }
                          helperText={
                            formik.touched[i.props.id] &&
                            formik.errors[i.props.id]
                          }
                          required={
                            validationSchema.fields[i.props.id].spec
                              .presence === 'required'
                          }
                        >
                          {i.options?.map((o) => (
                            <MenuItem key={o.value} value={o.value}>
                              {o.value} - {o.label}
                            </MenuItem>
                          ))}
                        </i.component>
                      )}
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
              <Button
                onClick={() => {
                  formik.resetForm()
                  onClose()
                }}
              >
                Zrušit
              </Button>
              <Button type="submit">Uložit</Button>
            </DialogActions>
          </form>
        </MuiDialog>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default Dialog
