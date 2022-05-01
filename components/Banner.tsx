import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Slide from '@mui/material/Slide'
import { ReactNode } from 'react'

type StyledDivProps = {
  height: string
}

const StyledDiv = styled('div', {
  shouldForwardProp: (p) => p !== 'height',
})<StyledDivProps>(({ theme, height }) => ({
  backgroundColor: '#fff2ca',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  [theme.breakpoints.up('xl')]: {
    backgroundSize: '100% auto',
  },
  backgroundImage: "url('forest.png')",
  width: '100%',
  height,
}))

type BannerProps = {
  endIcon?: ReactNode
  children: ReactNode
  height?: string
}

const Banner = ({ endIcon, children, height = '80vh' }: BannerProps) => (
  <StyledDiv height={height}>
    <Grid
      container
      sx={{ height: '100%' }}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Grid item xs={12}>
        {children}
      </Grid>
      {endIcon && (
        <Grid item xs={12} alignSelf="flex-end">
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Typography
              variant="h1"
              component="div"
              color="primary.contrastText"
            >
              {endIcon}
            </Typography>
          </Slide>
        </Grid>
      )}
    </Grid>
  </StyledDiv>
)

export default Banner
