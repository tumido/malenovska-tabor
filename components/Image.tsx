import { Theme, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

type ImageBaseProps = {
  src: string
  theme?: Theme
}

const ImageBase = styled('div')(({ src, theme }: ImageBaseProps) => ({
  [theme?.breakpoints.up('md') as string]: {
    maxWidth: '600px',
  },
  [theme?.breakpoints.down('md') as string]: {
    maxWidth: '300px',
  },
  width: '100%',
  border: `4px solid ${theme?.palette.primary.main}`,
  borderRadius: '50%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
  position: 'relative',
  margin: '20px auto',
  '&:after': {
    content: '""',
    display: 'block',
    paddingBottom: '100%',
  },
}))

const Image = ({ src }: { src: string }) => <ImageBase src={src} />

export default Image
