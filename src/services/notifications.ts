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

const NOTIFICATION_COOLDOWN = 2000;


export function setLastNotification(type: string) {
  const currentTime = Date.now();
  localStorage.setItem("lastNotificationType", type);
  localStorage.setItem("lastNotificationTime", currentTime.toString());
}

export function shouldShowNotificationType(type: string, NOTIFICATION_COOLDOWN: number): boolean {
  const lastType = localStorage.getItem("lastNotificationType");
  const lastTime = localStorage.getItem("lastNotificationTime");
  const now = Date.now();

  if (lastType === type && lastTime) {
    const timeElapsed = now - parseInt(lastTime, 10);
    return timeElapsed >= NOTIFICATION_COOLDOWN; // Return true if cooldown has passed
  }

  return true;
}