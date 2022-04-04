import { TextField } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker'
import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  nick: Yup.string(),
  name: Yup.string()
    .required('Povinný údaj')
    .min(5, 'Celé jméno musí být určitě delší než 5 znaků'),
  address: Yup.string()
    .required('Povinný údaj')
    .min(10, 'Je velmi velmi nepravděpodobné, že je vaše adresa tak krátká'),
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
  parent_name: Yup.string()
    .required('Povinný údaj')
    .minP(5, 'Celé jméno musí být určitě delší než 5 znaků'),
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
})

export const initialValues = Object.keys(validationSchema.fields).reduce(
  (acc, k) => ({
    ...acc,
    [k]: '',
  }),
  {}
)
initialValues.insurance = 'VZP (111)'

export const layoutSchema = [
  {
    fields: [
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
    ],
  },
  {
    title: 'Kontakt na účastníka',
    fields: [
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
    ],
  },
  {
    title: 'Zdravotní',
    fields: [
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
  },
  {
    title: 'Kontakt na rodiče',
    fields: [
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
  },
]
