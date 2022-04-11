import { Typography, Container, MenuItem, Grid, Paper } from '@mui/material'
import { Wizard, WizardStep } from '../components/Wizard'
import { TextField, Select, Switch } from 'formik-mui'
import { DatePicker } from 'formik-mui-lab'
import * as Yup from 'yup'
import { Field } from 'formik'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import csLocale from 'date-fns/locale/cs'
import React from 'react'
import { useField } from 'formik'

type Step = {
  label: string
  validation: object
  layout?: Layout[]
  description: string
  show?: boolean
  note?: string
}

type Layout = {
  sizing: {
    xs?: number
  }
  component: Function
  props: object & { id: string }
  inputVariant?: string
  formControl?: object
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
      dob: Yup.date().required('Povinný údaj'),
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
        sizing: { xs: 4 },
        component: Select,
        formControl: { fullWidth: true },
        props: {
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
        sizing: { xs: 8 },
        component: DatePicker,
        inputVariant: 'standard',
        formControl: {
          fullWidth: true,
        },
        props: {
          label: 'Datum narození',
          id: 'dob',
          openTo: 'year',
          views: ['year', 'month', 'day'],
          inputFormat: 'dd. MM. yyyy',
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
    show: true,
    layout: [
      {
        sizing: { sx: 12 },
        component: Switch,
        props: {
          id: 'terms',
          fullWidth: true,
          label:
            'Souhlasím se zpracováním osobních údajů pro účely pořádáni Tábora',
        },
      },
    ],
    description: `A teď je potřeba pořádně ověřit, že je všechno zadané správně. Po odeslání už data nelze dále upravovat.`,
  },
]

const initialValues = {
  nick: '',
  name: 'babsbsb asa',
  address: 'asdas asdsa ad as',
  email: 'a@v.cz',
  phone: '',
  insurance: 'VZP (111)',
  dob: new Date(),
  allergies: '',
  parent_name: 'dadsad asdas',
  parent_address: 'asda sadsa dsa',
  parent_email: 'a@b.cz',
  parent_phone: '123333333',
  terms: true,
}

const FieldValue = ({ id, label }: { id: string; label: string }) => {
  const [field] = useField(id)

  const value =
    field.value instanceof Date
      ? field.value.toLocaleDateString()
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

const Jak = () => (
  <Container maxWidth="lg">
    <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
      Jak?
    </Typography>
    <Typography variant="body1" gutterBottom>
      Registrace je veskrze jednoduchá, nepodepisuje se krví, ani duši není
      třeba odevzdat.Stačí vyplnit pár údajů, kliknout {`"`}Odeslat
      {`"`} a je hotovo. Dále se s vámi organizátoři spojí emailem. Jdeme na to:
    </Typography>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
      <Wizard
        initialValues={initialValues}
        onSubmit={(a) => {
          console.log(a)
        }}
      >
        {steps.map((s) => (
          <WizardStep
            key={s.label}
            validationSchema={s.validation}
            description={s.description}
            label={s.label}
          >
            <>
              {s.show &&
                steps.map((l) => (
                  <>
                    {!l.show && (
                      <Grid container key={l.label}>
                        <Grid item xs={12} sx={{ m: '40px' }}>
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
                                  label={f.props.label}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </>
                ))}
              <Grid container spacing={2}>
                {s.layout?.map((f) => (
                  <Grid item key={f.props.id} {...f.sizing}>
                    <Field
                      inputVariant="standard"
                      variant="standard"
                      {...f.props}
                      formControl={f.formControl}
                      id={f.props.id}
                      name={f.props.id}
                      component={f.component}
                    >
                      {f.options?.map((o) => (
                        <MenuItem key={o.value} value={o.value}>
                          {o.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                ))}
              </Grid>
            </>
          </WizardStep>
        ))}
      </Wizard>
    </LocalizationProvider>
  </Container>
)

export default Jak
