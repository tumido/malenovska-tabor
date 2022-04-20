import { deepmerge } from '@mui/utils'
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded'
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  Theme,
  alpha,
} from '@mui/material/styles'

export const primary = {
  light: '#a3b08b',
  main: '#59815b',
  dark: '#364f42',
  contrastText: '#fff2ca',
}

export const theme = createTheme({
  palette: {
    primary,
    secondary: {
      main: '#fff2ca',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 900,
      color: primary.dark,
    },
    h2: {
      marginTop: '1em',
      fontWeight: 900,
      color: primary.main,
      textTransform: 'uppercase',
    },
    h4: {
      marginTop: '1em',
      color: primary.main,
    },
    subtitle1: {
      color: primary.light,
      textTransform: 'uppercase',
      fontWeight: 900,
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'h2', gutterBottom: true },
          style: {
            marginBottom: '1em',
          },
        },
      ],
    },
  },
})

export default theme
