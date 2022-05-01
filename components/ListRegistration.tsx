import * as React from 'react'
import {
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Typography,
  ButtonGroup,
  Grid,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Registration } from '../firebase/schema'

const Row = ({ row }: { row: Registration }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow
        sx={{
          '& > td': { borderBottom: 'unset' },
          '&:nth-of-type(4n+1)': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <TableCell sx={{ width: '50px' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.nick}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="right">
          {open && (
            <ButtonGroup>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          '&:nth-of-type(4n+2)': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container sx={{ margin: 1 }}>
              <Grid item xs={12} lg={6}>
                <Typography variant="h6" gutterBottom component="div">
                  Účastník
                </Typography>
                <Table
                  size="small"
                  sx={{
                    '& td, & th': { border: 0 },
                    '& th': { width: '200px' },
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        E-mail
                      </TableCell>
                      <TableCell>
                        <Link href={`mailto:${row.email}`}>{row.email}</Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Telefon
                      </TableCell>
                      <TableCell>
                        <Link href={`tel:${row.phone}`}>
                          {row.phone.replace(/([0-9]{3})/g, '$1 ')}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Adresa
                      </TableCell>
                      <TableCell>{row.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Datum narození
                      </TableCell>
                      <TableCell>
                        {(row.dob.toDate() as Date).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Pojišťovna
                      </TableCell>
                      <TableCell>{row.insurance}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Alergie
                      </TableCell>
                      <TableCell>{row.allergies}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography variant="h6" gutterBottom component="div">
                  Rodič
                </Typography>
                <Table
                  size="small"
                  sx={{
                    '& td, & th': { border: 0 },
                    '& th': { width: '200px' },
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        E-mail
                      </TableCell>
                      <TableCell>
                        <Link href={`mailto:${row.parent_email}`}>
                          {row.parent_email}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Telefon
                      </TableCell>
                      <TableCell>
                        <Link href={`tel:${row.parent_phone}`}>
                          {row.parent_phone.replace(/([0-9]{3})/g, '$1 ')}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Adresa
                      </TableCell>
                      <TableCell>{row.parent_address}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const ListRegistration = ({ data }: { data: Registration[] }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>Přezdívka</TableCell>
          <TableCell>Jméno</TableCell>
          <TableCell width="200px" />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default ListRegistration
