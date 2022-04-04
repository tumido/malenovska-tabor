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

const steps = [
  {
    label: 'Vyplň údaje o účastníkovi',
    validation: Yup.object().shape({
      nick: Yup.string(),
      name: Yup.string()
        .required('Povinný údaj')
        .min(5, 'Celé jméno musí být určitě delší než 5 znaků'),
      address: Yup.string()
        .required('Povinný údaj')
        .min(
          10,
          'Je velmi velmi nepravděpodobné, že je vaše adresa tak krátká'
        ),
      email: Yup.string()
        .required('Povinný údaj')
        .email('Toto není emailová adresa'),
      phone: Yup.string().matches(/^(\+\d{3})?\d{9}$/g, {
        message: 'Toto není platné telefonní číslo',
        excludeEmptyString: true,
      }),
      insurance: Yup.string().required('Povinný údaj'),
      dob: Yup.date().required('Povinný údaj'),
      allergies: Yup.string(),
    }),
    layout: [
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'nick',
          label: 'Přezdívka',
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 8 },
        component: TextField,
        props: {
          id: 'name',
          label: 'Celé jméno',
          fullWidth: true,
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'address',
          fullWidth: true,
          label: 'Adresa',
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'email',
          label: 'E-mail',
          fullWidth: true,
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'phone',
          fullWidth: true,
          label: 'Telefon',
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 4 },
        component: TextField,
        props: {
          id: 'insurance',
          label: 'Pojišťovna',
          variant: 'standard',
          fullWidth: true,
          select: true,
        },
        options: [
          { value: 'VZP (111)', label: 'Všeobecná zdravotní pojišťovna' },
          { value: 'VOZP (201)', label: 'Vojenská zdravotní pojišťovna' },
          {
            value: 'ČPZP (205)',
            label: 'Česká průmyslová zdravotní pojišťovna',
          },
          {
            value: 'OZP (207)',
            label:
              'Oborová zdravotní pojišťovna zaměstnanců bank, pojišťoven a stavebnictví',
          },
          { value: 'ZPŠ (209)', label: 'Zaměstnanecká pojišťovna Škoda' },
          {
            value: 'ZP MV ČR (211)',
            label: 'Zdravotní pojišťovna ministerstva vnitra České republiky',
          },
          {
            value: 'RBP (213)',
            label: 'Revírní bratrská pokladna, zdravotní pojišťovna',
          },
        ],
      },
      {
        sizing: { xs: 8 },
        component: DatePicker,
        renderProps: {
          label: 'Datum narození',
          variant: 'standard',
          fullWidth: true,
        },
        props: {
          id: 'dob',
          openTo: 'year',
          views: ['year', 'month', 'day'],
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'allergies',
          label: 'Alergie',
          variant: 'standard',
          fullWidth: true,
        },
      },
    ],
    description: `O každém účastníkovi tábora potřebujeme vědět několik věcí, nejenom kontaktní informace ale i pár osobních`,
  },
  {
    label: 'Přidej kontakt na rodiče nebo zákonného zástupce',
    validation: Yup.object().shape({
      parent_name: Yup.string()
        .required('Povinný údaj')
        .min(5, 'Celé jméno musí být určitě delší než 5 znaků'),
      parent_address: Yup.string().min(
        10,
        'Je velmi velmi nepravděpodobné, že je vaše adresa tak krátká'
      ),
      parent_email: Yup.string()
        .required('Povinný údaj')
        .email('Toto není emailová adresa'),
      parent_phone: Yup.string()
        .matches(/^(\+\d{3})?\d{9}$/g, {
          message: 'Toto není platné telefonní číslo',
        })
        .required('Povinný údaj'),
    }),
    layout: [
      {
        sizing: { xs: 8 },
        component: TextField,
        props: {
          id: 'parent_name',
          label: 'Celé jméno',
          fullWidth: true,
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'parent_address',
          fullWidth: true,
          label: 'Adresa (Pokud je jiná než u účastníka)',
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'parent_email',
          label: 'E-mail',
          fullWidth: true,
          variant: 'standard',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'parent_phone',
          fullWidth: true,
          label: 'Telefon',
          variant: 'standard',
        },
      },
    ],
    description:
      'I rodiče si zaslouží naši pozornost. Ať už pro případ domluvy před táborem nebo nouzové komunikace v průběhu.',
  },
  {
    label: 'Zamíchej, zkontroluj a nechej chvíli vařit a nezapomeň odeslat',
    validation: Yup.object().shape({}),
    description: `A teď je potřeba pořádně ověřit, že je všechno zadané správně. Po odeslání už data nelze dále upravovat.`,
  },
]
const initialValues = {
  nick: '',
  name: '',
  address: '',
  email: '',
  phone: '',
  insurance: '',
  dob: 0,
  allergies: '',
  parent_name: '',
  parent_address: '',
  parent_email: '',
  parent_phone: '',
}

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
