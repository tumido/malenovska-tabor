import { TextField } from '@mui/material'
const schema = [
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
        },
      },
      {
        sizing: { xs: 8 },
        component: TextField,
        props: {
          id: 'dob',
          label: 'Datum narození',
          variant: 'standard',
          fullWidth: true,
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
    repeatable: true,
    id: 'parent',
    fields: [
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
    ],
  },
]

export default schema
