import { styled } from '@mui/material/styles'

const OrderedList = styled('ol')(({ theme }) => ({
  listStyle: 'none',
  counterReset: 'count',
  '& li': {
    counterIncrement: 'count',
    position: 'relative',
    margin: '2em 0',
    '&::before': {
      content: 'counter(count)',
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(0.5),
      display: 'inline-block',
      width: '2em',
      height: '2em',
      lineHeight: '2em',
      textAlign: 'center',
      marginRight: '1em',
      position: 'absolute',
      right: '100%',
    },
  },
}))
export default OrderedList
