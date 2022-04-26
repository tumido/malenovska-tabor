import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Theme,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

type AvatarImageProps = {
  image: string
  theme?: Theme
}

const AvatarImage = styled('div')(({ image, theme }: AvatarImageProps) => ({
  height: '300px',
  width: '300px',
  border: `4px solid ${theme?.palette.primary.main}`,
  borderRadius: '50%',
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover',
  overflow: 'hidden',
  margin: '20px',
}))

type AvatarProps = {
  nick: string
  name: string
  desc: string
  role: string
  avatar: string
}

const Avatar = ({ nick, avatar, name, desc, role }: AvatarProps) => (
  // <AvatarBase src={src} hasLabel={Boolean(name)}>
  //   <Typography variant="button">{name}</Typography>
  // </AvatarBase>
  <Container sx={{ textAlign: 'center', mt: 4 }}>
    <AvatarImage image={avatar} />
    <Typography variant="subtitle2" component="h3">
      {nick}
    </Typography>
    <Typography variant="subtitle1" component="h4" gutterBottom>
      {name}
    </Typography>
    <Typography variant="body1" component="h5" gutterBottom>
      {role}
    </Typography>
    <Typography variant="body2">{desc}</Typography>
  </Container>
)

export default Avatar
