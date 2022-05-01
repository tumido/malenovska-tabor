import { Paper, Typography } from '@mui/material'

type DashboardTileProps = {
  count: number
  title: string
}

const DashboardTile = ({ count, title }: DashboardTileProps) => (
  <Paper sx={{ display: 'flex' }}>
    <Typography variant="h6" sx={{ flex: 2, p: 2 }}>
      {title}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        p: 2,
        width: 'calc(1.25rem * 1.6 + 32px)',
        backgroundColor: 'primary.light',
        textAlign: 'center',
      }}
    >
      {count}
    </Typography>
  </Paper>
)

export default DashboardTile
