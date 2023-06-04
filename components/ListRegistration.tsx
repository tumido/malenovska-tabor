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
  Tooltip,
  Button,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SickIcon from '@mui/icons-material/Sick'
import OutboxIcon from '@mui/icons-material/Outbox'
import SyncProblemIcon from '@mui/icons-material/SyncProblem'
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend'
import { Registration } from '../firebase/schema'
import ConfirmDialog from './ConfirmDialog'
import { Timestamp } from 'firebase/firestore'

type RowProps = {
  row: Registration
  onDeleteEntry: (id: string) => Promise<void>
}

const emailPhaseText = (phase?: string) => {
  switch (phase) {
    case 'pending':
      return 'Email se brzy odešle, pokud nedojde ke změně stavu do několika minut, zkuste opakovat akci.'
    case 'sending':
      return 'Email se odesílá, pokud nedojde ke změně stavu do několika minut, zkuste opakovat akci.'
    case 'sent':
      return 'Odesláno'
    default:
      return 'Problém s odesláním emailu, opakujete akci.'
  }
}

const emailPhase = (phase?: string) => {
  switch (phase) {
    case 'pending':
      return <ScheduleSendIcon />
    case 'sending':
      return <OutboxIcon />
    case 'sent':
      return null
    default:
      return <SyncProblemIcon />
  }
}

const dateOfBirth = (dob: Timestamp) => {
  const date = dob.toDate() as Date
  const dateString = date.toLocaleDateString('cs-CZ', { timeZone: 'UTC' })
  const age = Math.abs(new Date(Date.now() - date).getUTCFullYear() - 1970)

  return `${dateString} (${age} let)`
}

const Row = ({ row, onDeleteEntry }: RowProps) => {
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
        <TableCell>
          <Grid container spacing={1}>
            {row.allergies && (
              <Grid item>
                <Tooltip title={`Alergie: ${row.allergies}`}>
                  <SickIcon sx={{ color: 'lightgrey' }} />
                </Tooltip>
              </Grid>
            )}
            {row.email_phase !== 'sent' && (
              <Grid item>
                <Tooltip title={emailPhaseText(row.email_phase)}>
                  {emailPhase(row.email_phase)!}
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </TableCell>
        <TableCell align="right">
          {open && (
            <ButtonGroup>
              <IconButton disabled>
                <EditIcon />
              </IconButton>
              <ConfirmDialog
                onSubmit={() => onDeleteEntry(row.id)}
                title="Smazat registraci?"
                content={`Opravdu chcete smazat registraci pro "${row.name}"`}
              >
                <DeleteIcon />
              </ConfirmDialog>
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
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          sx={{
            pl: {
              xs: 1,
              sm: '50px',
            },
          }}
          colSpan={5}
        >
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
                        Jméno
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Přezdívka
                      </TableCell>
                      <TableCell>{row.nick}</TableCell>
                    </TableRow>
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
                      <TableCell>
                        <Link
                          href={`https://mapy.cz/zakladni?q=${encodeURIComponent(
                            row.address
                          )}`}
                          target="_blank"
                        >
                          {row.address}
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Datum narození
                      </TableCell>
                      <TableCell>{dateOfBirth(row.dob)}</TableCell>
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
              <Grid
                container
                item
                xs={12}
                lg={6}
                justifyContent="space-between"
              >
                <Grid item xs={12}>
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
                          Jméno
                        </TableCell>
                        <TableCell>{row.parent_name}</TableCell>
                      </TableRow>
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
                        <TableCell>
                          <Link
                            href={`https://mapy.cz/zakladni?q=${encodeURIComponent(
                              row.parent_address
                            )}`}
                            target="_blank"
                          >
                            {row.parent_address}
                          </Link>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom component="div">
                    Registrační e-mail
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
                          Stav
                        </TableCell>
                        <TableCell>{emailPhaseText(row.email_phase)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell />
                        <TableCell>
                          <Button
                            variant="outlined"
                            endIcon={<ScheduleSendIcon />}
                          >
                            Znovu odeslat
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

type ListRegistrationProps = {
  data: Registration[]
  onDeleteEntry: (id: string) => Promise<void>
}

const ListRegistration = ({ data, onDeleteEntry }: ListRegistrationProps) => (
  <TableContainer component={Paper}>
    <Table style={{ tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell width="50px" />
          <TableCell width="150px">Přezdívka</TableCell>
          <TableCell>Jméno</TableCell>
          <TableCell>Upozornění</TableCell>
          <TableCell width="200px" />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <Row key={row.id} row={row} onDeleteEntry={onDeleteEntry} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export default ListRegistration
