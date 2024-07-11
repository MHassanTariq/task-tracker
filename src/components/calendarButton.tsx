import { useState } from "react";
import { Badge, IconButton, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; // Adjust the import path based on your setup
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { areTwoDatesSame } from "../helpers/dateTimeHelper";

interface Props {
  currentSelectedDate: Date;
  highlightedDays?: Date[];
  onDateChange: (date: Date) => void;
}

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: Date[] }
) {
  const {
    highlightedDays = [] as Date[],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    Boolean(highlightedDays.find((hday) => areTwoDatesSame(day, hday)));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🔴" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const CalendarIconWithDatePicker = ({
  currentSelectedDate,
  onDateChange,
  highlightedDays = [],
}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleIconClick}>
        <CalendarMonthIcon style={{ color: "gainsboro" }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            views={["day"]}
            value={dayjs(currentSelectedDate)}
            defaultValue={dayjs(new Date())}
            onChange={(value) => {
              onDateChange(new Date(value));
            }}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </LocalizationProvider>
      </Popover>
    </div>
  );
};

export default CalendarIconWithDatePicker;
