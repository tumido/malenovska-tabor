import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  Grid,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
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
import { ThemeProvider } from '@mui/material/styles'
import { useFormik } from 'formik'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker } from '@mui/lab'
import csLocale from 'date-fns/locale/cs'
import { Box } from '@mui/system'
import * as Yup from 'yup'


const Registration = () => {
  const handleSubmit = async (values) => {
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
      <Wizard
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {steps.map(s =>  
          <WizardStep key={s.label} validation={s.validation}>
            <Grid container spacing={2}>
              {s.layout.map(i => (

              ))}
            </Grid>
          </WizardStep>
        )}
      </Wizard>
        <Grid container spacing={2}>
          {layoutSchema.map((section) => {
            const fields = section.fields.map((i) => (
              <Grid key={i.props.id} item {...i.sizing}>
                {i.component === DatePicker ? (
                  <DatePicker
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
                          validationSchema.fields[i.props.id].spec.presence ===
                          'required'
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
                      formik.touched[i.props.id] && formik.errors[i.props.id]
                    }
                    required={
                      validationSchema.fields[i.props.id].spec.presence ===
                      'required'
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
    </LocalizationProvider>
  )
}

export default Registration
