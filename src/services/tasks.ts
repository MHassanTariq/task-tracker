import dayjs from "dayjs";
import {
  convertDateAndDayToDateObject,
  formatDateAndDay,
  weekDays,
} from "../helpers/dateTimeHelper";
import { getObjectFromString } from "../helpers/parserHelpers";
import { StoredTasks, Task, TaskTypes } from "../helpers/taskHelpers";

export function getDatedTasks(key: TaskTypes, date: Date): Task[] {
  const tasks = getObjectFromString<StoredTasks>(
    localStorage.getItem(formatDateAndDay(date))
  );

  if (!tasks) {
    // XXX: This can be removed after a week
    const backwardCompatibleTasks = getObjectFromString<Task[]>(
      localStorage.getItem(key)
    );

    if (backwardCompatibleTasks) return backwardCompatibleTasks;
    return [];
  }

  if (key === "taskList") return tasks.taskList;
  return tasks.completedList;
}

export function saveDatedTasks(date: Date, storageTasks: StoredTasks): void {
  localStorage.setItem(formatDateAndDay(date), JSON.stringify(storageTasks));
}

function isValidKey(key: string): boolean {
  return (
    key.includes(" - ") && weekDays.some((weekDay) => key.includes(weekDay))
  );
}
export function getTaskedDatesInMonth(): Date[] {
  const highlightedTasks: Date[] = [];
  //   console.log(localStorage.length);
  for (let i = 0; i < localStorage.length; i++) {
    const keyDate = localStorage.key(i);
    // console.log(keyDate);
    if (keyDate && isValidKey(keyDate)) {
      const tasks = getObjectFromString<StoredTasks>(
        localStorage.getItem(keyDate)
      );
      if (
        (tasks?.taskList.length ?? -1 > 0) ||
        (tasks?.completedList.length ?? -1 > 0)
      ) {
        console.log(localStorage.getItem(keyDate));
        highlightedTasks.push(convertDateAndDayToDateObject(keyDate));
      }
    }
  }
  console.log(highlightedTasks);
  return highlightedTasks;
}
