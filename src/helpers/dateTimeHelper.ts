import { Dayjs } from "dayjs";

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatDateAndDay(
  fullDate: Date,
  shouldIncludeDay: boolean = true
) {
  const date = fullDate.getDate();
  const month = fullDate.toLocaleString("default", { month: "short" });
  const year = fullDate.getFullYear();
  const day = shouldIncludeDay ? ` - ${weekDays[fullDate.getDay()]}` : "";

  return `${date} ${month}, ${year}${day}`;
}

export function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Set the time part of today and yesterday to 00:00:00 for comparison purposes
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0); // Set the time part of the input date to 00:00:00 for comparison purposes

  const diffTime = Math.abs(today.getTime() - inputDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return weekDays[inputDate.getDay()];
  } else {
    return formatDateAndDay(date, false);
  }
}

export function convertDateAndDayToDateObject(dateAndDay: string): Date {
  const datePart = dateAndDay.split(" - ")[0];
  const date = new Date(datePart);
  return date;
}

export function areTwoDatesSame(date1: Dayjs, date2: Date): boolean {
  return date1.isSame(date2);
}
