import PickersCalendar from '@mui/lab/CalendarPicker/PickersCalendar'

import {
  isWithinRange,
  isStartOfRange,
  isEndOfRange,
} from '@mui/lab/internal/pickers/date-utils'
import { useUtils } from '@mui/lab/internal/pickers/hooks/useUtils'

import DateRangePickerDay from '@mui/lab/DateRangePickerDay'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DateRange } from '@mui/lab/DateRangePicker'
import csLocale from 'date-fns/locale/cs'
import { Stack, Typography } from '@mui/material'

type CalendarProps = {
  date: DateRange<TDate>
}

const Calendar = ({ date }: CalendarProps) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={csLocale}>
    <CalendarView date={date} />
  </LocalizationProvider>
)

const CalendarView = ({ date }: CalendarProps) => {
  const utils = useUtils()
  const monthOnIteration = utils.setMonth(date[0], utils.getMonth(date[0]))

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="subtitle1">
        {utils.format(monthOnIteration, 'monthAndYear')}
      </Typography>
      <PickersCalendar
        currentMonth={date[0]}
        focusedDay={new Date()}
        isDateDisabled={() => false}
        isMonthSwitchingAnimating={false}
        onFocusedDayChange={() => {}}
        onMonthSwitchingAnimationEnd={() => {}}
        reduceAnimations={true}
        slideDirection="left"
        date={date}
        renderDay={(day, __, DayProps) => (
          <DateRangePickerDay
            isPreviewing={false}
            isStartOfPreviewing={false}
            isEndOfPreviewing={false}
            isHighlighting={
              isWithinRange(utils, day, date) ||
              isStartOfRange(utils, day, date)
            }
            isStartOfHighlighting={isStartOfRange(utils, day, date)}
            isEndOfHighlighting={isEndOfRange(utils, day, date)}
            onMouseEnter={() => {}}
            {...DayProps}
          />
        )}
        onChange={() => {}}
      />
    </Stack>
  )
}

export default Calendar
