import { styled, alpha } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  Stack,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import React, { useState } from 'react'

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
  const [open, setOpen] = useState(false)

  const menu = (
    <>
      <Link legacyBehavior href="/#tabor" passHref>
        <Button component="a" color="primary">
          Tábor
        </Button>
      </Link>
      <Link legacyBehavior href="/#org-tym" passHref>
        <Button component="a" color="primary">
          Organizátoři
        </Button>
      </Link>
      <Link legacyBehavior href="/#registrace" passHref>
        <Button component="a" color="primary">
          Registrace
        </Button>
      </Link>
      <Link legacyBehavior href="/gdpr" passHref>
        <Button component="a" color="primary">
          GDPR
        </Button>
      </Link>
    </>
  )

  const menuLoggedIn = (
    <>
      {user && [
        <Link legacyBehavior href="/admin" passHref key="admin">
          <Button component="a" color="primary">
            Administrace
          </Button>
        </Link>,
        <Tooltip title="Odhlásit se" enterDelay={300} key="logout">
          <IconButton
            color="primary"
            onClick={() => firebase.auth().signOut()}
            sx={{ px: '8px' }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>,
      ]}
    </>
  )

  return (
    <StyledAppBar>
      <Toolbar variant="dense" disableGutters={true}>
        <Hidden mdUp>
          <IconButton
            color="primary"
            sx={{ border: '2px solid', borderRadius: '10px' }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <GrowingDiv />
        <Hidden mdDown>
          <Stack direction="row" spacing={1.3}>
            {menu}
            {user && <Divider orientation="vertical" flexItem />}
            {menuLoggedIn}
          </Stack>
        </Hidden>
      </Toolbar>
      <Hidden mdUp>
        <Drawer open={open} anchor="left" onClose={() => setOpen(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <List>
              {React.Children.map(menu.props.children, (e, idx) => (
                <ListItem key={idx}>{e}</ListItem>
              ))}
              {user && <Divider />}
              {React.Children.map(menuLoggedIn.props.children, (e, idx) => (
                <ListItem key={idx}>{e}</ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Hidden>
    </StyledAppBar>
  )
}

export default Header
