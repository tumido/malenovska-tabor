import type { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import Banner from '../components/Banner'
import {
  CssBaseline,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
  InputAdornment,
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-mui'
import firebase from '../firebase/clientApp'
import { theme } from '../utils/theme'
import { useRouter } from 'next/router'
import Loading from '../components/Loading'
import Header from '../components/Header'

type Creds = {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
})
const initialValues = { email: '', password: '' }

const domain = '@malenovska.cz'

const Login = () => {
  const auth = firebase.auth()
  const [user, loading, error] = useAuthState(auth as any)
  const router = useRouter()

  const handleSubmit = (
    { email, password }: Creds,
    { setSubmitting, setFieldError }: FormikHelpers<Creds>
  ) => {
    signInWithEmailAndPassword(auth, email + domain, password).catch((r) => {
      setFieldError('password', 'Špatné heslo')
      setSubmitting(false)
    })
  }

  const handleReset = async (
    { email }: { email: string },
    setFieldError: (field: string, message: string | undefined) => void
  ) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email + domain,
        Math.random().toString(36).slice(2, 10)
      )
    } catch {}
    await signOut(auth)
    await sendPasswordResetEmail(auth, email + domain)
    setFieldError('password', 'Nové heslo bylo odesláno')
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <Banner height={'100vh'}>
        <Typography variant="subtitle1" color="primary.light">
          Nezdařilo se načíst administraci...
        </Typography>
      </Banner>
    )
  }

  if (user) {
    router.push('/admin')

    return (
      <Banner height={'100vh'}>
        <Typography variant="subtitle1" color="primary.light">
          Otevírám Administraci...
        </Typography>
      </Banner>
    )
  }

  return (
    <Banner height={'100vh'}>
      <Typography variant="subtitle1" color="primary.light" gutterBottom>
        První se přihlaste
      </Typography>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm, isSubmitting, values, setFieldError }) => (
              <Form>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}
                >
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="email"
                      id="email"
                      type="text"
                      label="Email"
                      fullWidth={true}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {domain}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      name="password"
                      id="password"
                      type="password"
                      label="Heslo"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Přihlásit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="text"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={() => handleReset(values, setFieldError)}
                    >
                      Obnovit heslo
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Banner>
  )
}

const LoginWrapper: NextPage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    <Login />
  </ThemeProvider>
)

export default LoginWrapper
