import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Frame from '../components/Frame'
import firebase from '../firebase/clientApp'
import { ThemeProvider, styled } from '@mui/material/styles'
import { brandingDarkTheme } from '../components/theme'

const uiConfig = {
  signInSuccessUrl: '/registrace',
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primaryDark[800],
  height: '100vh',
}))

function SignInScreen() {
  return (
    <Frame>
      <ThemeProvider theme={brandingDarkTheme}>
        <StyledGrid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Container maxWidth="sm">
              <Card>
                <CardContent>
                  <Typography
                    textAlign="center"
                    variant="h5"
                    color="text.secondary"
                    gutterBottom
                  >
                    Nejprve se musíte přihlásit
                  </Typography>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </CardContent>
              </Card>
            </Container>
          </Grid>
        </StyledGrid>
      </ThemeProvider>
    </Frame>
  )
}

export default SignInScreen
