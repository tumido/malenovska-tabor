import Banner from '../components/Banner'
import { Typography } from '@mui/material'

const Loading = () => (
  <Banner height={'100vh'}>
    <Typography variant="subtitle1" color="primary.light">
      Načítám informace o účtu...
    </Typography>
  </Banner>
)

export default Loading
