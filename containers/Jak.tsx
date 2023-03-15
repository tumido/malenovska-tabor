import {
  Typography,
  Container,
  MenuItem,
  Grid,
  FormHelperText,
  Button,
  Stack,
  Paper,
} from '@mui/material'
import { Wizard, WizardStep } from '../components/Wizard'
import { TextField, Select, CheckboxWithLabel } from 'formik-mui'
import { DatePicker } from 'formik-mui-x-date-pickers'
import * as Yup from 'yup'
import { Field, useField, ErrorMessage } from 'formik'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import csLocale from 'date-fns/locale/cs'
import React, { MouseEventHandler, useState } from 'react'
import { Box } from '@mui/system'
import { collection, addDoc, getFirestore } from 'firebase/firestore'

type Step = {
  label: string
  validation: object
  layout?: Layout[]
  description: string
  show?: boolean
  note?: string
}

type Registration = {
  address: string
  allergies?: string
  dob: Date
  email?: string
  insurance: string
  name: string
  nick?: string
  parent_address?: string
  parent_email: string
  parent_name: string
  parent_phone: string
  phone?: string
  terms: boolean
}

type Layout = {
  sizing: {
    xs: number
  }
  component: Function
  props: {
    id: string
    label?: string
    Label?: { label: unknown }
    fullWidth?: boolean
    variant?: string
    openTo?: string
    type?: string
    views?: Array<string>
    formControl?: object
    textField?: object
    mask?: string
    slotProps?: Record<string, unknown>
    disableFuture?: boolean
  }
  inputVariant?: string
  options?: {
    label: string
    value: string
  }[]
}

const steps: Step[] = [
  {
    label: 'Vyplň údaje o účastníkovi',
    note: 'Účastník',
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
      dob: Yup.date()
        .typeError('Toto není datum')
        .required('Povinný údaj')
        .max(
          new Date(new Date().setFullYear(new Date().getFullYear() - 12)),
          'Účastník musí být starší 12let'
        ),
      allergies: Yup.string(),
    }),
    layout: [
      {
        sizing: { xs: 4 },
        component: TextField,
        props: {
          id: 'nick',
          label: 'Přezdívka',
          fullWidth: true,
        },
      },
      {
        sizing: { xs: 8 },
        component: TextField,
        props: {
          id: 'name',
          label: 'Celé jméno',
          fullWidth: true,
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'address',
          fullWidth: true,
          label: 'Adresa',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'email',
          label: 'E-mail',
          fullWidth: true,
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'phone',
          fullWidth: true,
          label: 'Telefon',
        },
      },
      {
        sizing: { xs: 8 },
        component: Select,
        props: {
          formControl: { fullWidth: true },
          id: 'insurance',
          label: 'Pojišťovna',
          fullWidth: true,
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
        sizing: { xs: 4 },
        component: DatePicker,
        props: {
          type: 'date',
          slotProps: {
            textField: {
              variant: 'standard',
              fullWidth: true,
              label: 'Datum narození',
            },
          },
          label: 'Datum narození',
          id: 'dob',
          mask: '__.__.____',
          openTo: 'year',
          views: ['year', 'month', 'day'],
          disableFuture: true,
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'allergies',
          label: 'Alergie',
          fullWidth: true,
        },
      },
    ],
    description: `O každém účastníkovi tábora potřebujeme vědět několik věcí, nejenom kontaktní informace ale i pár osobních`,
  },
  {
    label: 'Přidej kontakt na rodiče nebo zákonného zástupce',
    note: 'Zákonný zástupce',
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
        },
      },
      {
        sizing: { xs: 12 },
        component: TextField,
        props: {
          id: 'parent_address',
          fullWidth: true,
          label: 'Adresa (Pokud je jiná než u účastníka)',
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'parent_email',
          label: 'E-mail',
          fullWidth: true,
        },
      },
      {
        sizing: { xs: 6 },
        component: TextField,
        props: {
          id: 'parent_phone',
          fullWidth: true,
          label: 'Telefon',
        },
      },
    ],
    description:
      'I rodiče si zaslouží naši pozornost. Ať už pro případ domluvy před táborem nebo nouzové komunikace v průběhu.',
  },
  {
    label: 'Zamíchej, zkontroluj a nechej chvíli vařit a nezapomeň odeslat',
    validation: Yup.object().shape({
      terms: Yup.boolean().required().oneOf([true], 'Nelze než souhlasit'),
    }),
    show: true,
    layout: [
      {
        sizing: { xs: 12 },
        component: CheckboxWithLabel,
        props: {
          id: 'terms',
          type: 'checkbox',
          Label: {
            label:
              'Souhlasím se zpracováním osobních údajů dle zásad GDPR pro účely pořádáni Tábora',
          },
        },
      },
    ],
    description: `A teď je potřeba pořádně ověřit, že je všechno zadané správně. Po odeslání už data nelze dále upravovat.`,
  },
]

const initialValues = {
  nick: '',
  name: '',
  address: '',
  email: '',
  phone: '',
  insurance: 'VZP (111)',
  dob: null,
  allergies: '',
  parent_name: '',
  parent_address: '',
  parent_email: '',
  parent_phone: '',
  terms: false,
}

const FieldValue = ({ id, label }: { id: string; label: string }) => {
  const [field] = useField(id)

  const value =
    field.value instanceof Date
      ? field.value.toLocaleDateString('cs-CZ')
      : typeof field.value === 'string'
      ? field.value
      : undefined
  if (value !== undefined) {
    return (
      <Typography variant="body2">
        <b>{label}</b>: {value ? value : <i>Neuvedeno</i>}
      </Typography>
    )
  }
  return null
}

const localeDateToUtc = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

const Form = ({ onSubmit }: { onSubmit: Function }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
    <Wizard initialValues={initialValues} onSubmit={onSubmit}>
      {steps.map((s) => (
        <WizardStep
          key={s.label}
          validationSchema={s.validation}
          description={s.description}
          label={s.label}
        >
          <Box sx={{ mb: 2, mt: 2 }}>
            {s.show &&
              steps.map((l) => (
                <React.Fragment key={l.label}>
                  {!l.show && (
                    <Grid container>
                      <Grid item xs={12} sx={{ mt: 1, mb: 6 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography gutterBottom variant="body2">
                              <b>{l.note}</b>
                            </Typography>
                          </Grid>
                          {l.layout?.map((f) => (
                            <Grid item xs={6} key={f.props.id}>
                              <FieldValue
                                id={f.props.id}
                                label={f.props.label || ''}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            <Grid container spacing={2}>
              {s.layout?.map((f) => (
                <Grid item key={f.props.id} {...f.sizing}>
                  <Field
                    variant="standard"
                    {...f.props}
                    id={f.props.id}
                    name={f.props.id}
                    component={f.component}
                  >
                    {f.options?.map((o) => (
                      <MenuItem key={o.value} value={o.value}>
                        {o.value} - {o.label}
                      </MenuItem>
                    ))}
                  </Field>
                  {['checkbox', 'date'].includes(f.props.type || '') && (
                    <ErrorMessage name={f.props.id}>
                      {(msg) => (
                        <FormHelperText error={true}>{msg}</FormHelperText>
                      )}
                    </ErrorMessage>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        </WizardStep>
      ))}
    </Wizard>
  </LocalizationProvider>
)

const Done = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
}) => (
  <Paper
    component={Stack}
    justifyContent="center"
    alignItems="center"
    spacing={4}
    variant="outlined"
    sx={{
      p: 2,
      display: 'flex',
      m: 10,
    }}
  >
    <Typography variant="body1" gutterBottom>
      Příhláška byla odeslána ke zpracování. Brzy Vám přistane na parapetu
      poštovní holub nebo email ve schránce.
    </Typography>
    <Button variant="contained" onClick={onClick}>
      Nová přihláška
    </Button>
  </Paper>
)

const Jak = () => {
  const [showWizard, setShowWizard] = useState(true)

  const handleSubmit = (data: object) => {
    setShowWizard(false)
    const dataWithoutUndefined = Object.entries(data).reduce(
      (acc, [k, v]) => (v !== undefined ? { ...acc, [k]: v } : acc),
      {}
    ) as Registration

    const sanitizedData = {
      ...dataWithoutUndefined,
      dob: localeDateToUtc(dataWithoutUndefined.dob),
    }
    addDoc(collection(getFirestore(), 'registrations'), sanitizedData)
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        Jak?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Registrace je veskrze jednoduchá, nepodepisuje se krví, ani duši není
        třeba odevzdat.Stačí vyplnit pár údajů, kliknout {`"`}Odeslat
        {`"`} a je hotovo. Dále se s vámi organizátoři spojí emailem. Jdeme na
        to:
      </Typography>
      {showWizard ? (
        <Form onSubmit={handleSubmit} />
      ) : (
        <Done onClick={() => setShowWizard(true)} />
      )}
    </Container>
  )
}

export default Jak
