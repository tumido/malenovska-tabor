import type { AppProps } from 'next/app'

import { styled } from '@mui/material/styles'

const Main = styled('main')(({ theme }) => ({
  display: 'flex',
  '& #main-content': {
    outline: 0,
  },
  width: '100%',
}))

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  )
}

export default MyApp
