import { formatDateAndDay } from "../helpers/dateTimeHelper";

export function setLastNotificationShownDate() {
  localStorage.setItem(
    "lastNotificationShownDate",
    formatDateAndDay(new Date())
  );
}

export function shouldShowNotification() {
  const lastShownDate = localStorage.getItem("lastNotificationShownDate");
  return lastShownDate ? lastShownDate !== formatDateAndDay(new Date()) : true;
}
