import { styled, alpha, ThemeProvider } from '@mui/material/styles'
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import LoginIcon from '@mui/icons-material/LoginOutlined'
import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

const StyledAppBar = styled(AppBar)(({ theme }) => {
  return {
    padding: theme.spacing(1, 2),
    transition: theme.transitions.create('width'),
    boxShadow: 'none',
    backdropFilter: 'blur(20px)',
    borderStyle: 'solid',
    borderColor: alpha(theme.palette.primary.light, 0.08),
    borderWidth: 0,
    borderBottomWidth: 'thin',
    background: 'transparent',
    color: theme.palette.grey[500],
  }
})

const GrowingDiv = styled('div')({
  flex: '1 1 auto',
})

const Header = () => {
  const [user] = useAuthState(getAuth() as any)
  return (
    <StyledAppBar>
      <Toolbar variant="dense" disableGutters={true}>
        <GrowingDiv />
        <Stack direction="row" spacing={1.3}>
          <Link href="/#tabor" passHref>
            <Button component="a" color="primary">
              Tábor
            </Button>
          </Link>
          <Link href="/#org-tym" passHref>
            <Button component="a" color="primary">
              Organizátoři
            </Button>
          </Link>
          <Link href="/#registrace" passHref>
            <Button component="a" color="primary">
              Registrace
            </Button>
          </Link>
          {user && (
            <Tooltip title="Odhlásit se" enterDelay={300}>
              <IconButton
                color="primary"
                onClick={() => firebase.auth().signOut()}
                sx={{ px: '8px' }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  )
}

export default Header
