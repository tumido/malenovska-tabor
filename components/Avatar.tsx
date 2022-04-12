import { Theme, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

type AvatarBaseProps = {
  src: string
  hasLabel: boolean
  variant: 'large' | 'small'
  theme?: Theme
}

const AvatarBase = styled('div', {
  shouldForwardProp: (p) => p === 'children',
})(({ src, hasLabel, variant, theme }: AvatarBaseProps) => ({
  height: variant === 'large' ? '600px' : '300px',
  width: variant === 'large' ? '600px' : '300px',
  border: `4px solid ${theme?.palette.primary.main}`,
  borderRadius: '50%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
  position: 'relative',
  margin: '20px',
  '& > *': hasLabel && {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    background: 'rgba(0,0,0,.5)',
    color: theme?.palette.primary.contrastText,
    padding: '10px',
  },
}))

type AvatarProps = {
  name?: string
  src: string
  variant?: 'large' | 'small'
}

const Avatar = ({ name, src, variant = 'small' }: AvatarProps) => (
  <AvatarBase src={src} hasLabel={Boolean(name)} variant={variant}>
    <Typography variant="button">{name}</Typography>
  </AvatarBase>
)

export default Avatar
