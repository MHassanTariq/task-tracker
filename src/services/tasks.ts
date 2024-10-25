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
  for (let i = 0; i < localStorage.length; i++) {
    const keyDate = localStorage.key(i);
    if (keyDate && isValidKey(keyDate)) {
      const tasks = getObjectFromString<StoredTasks>(
        localStorage.getItem(keyDate)
      );
      if (
        (tasks?.taskList.length ?? -1 > 0) ||
        (tasks?.completedList.length ?? -1 > 0)
      ) {
        highlightedTasks.push(convertDateAndDayToDateObject(keyDate));
      }
    }
  }
  return highlightedTasks;
}

export function storeBacklogTasks(tasks: Task[]) {
  localStorage.setItem("Backlog", JSON.stringify(tasks));
}
export function getBacklogTasks(): Task[] {
  const tasks = getObjectFromString<Task[]>(
    localStorage.getItem("Backlog") ?? ""
  );
  return tasks ?? [];
}

export function appendBacklogTask(task: Task) {
  const currentTasks = getBacklogTasks();
  currentTasks.push(task);
  storeBacklogTasks(currentTasks);
}

export function getLastWorkingDate() {
  const allDates = getTaskedDatesInMonth();
  if (allDates.length === 0) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date-only comparison

  // Filter out dates beyond today and also exclude today's date
  const pastDates = allDates.filter((date) => date.getTime() < today.getTime());

  if (pastDates.length === 0) {
    return null;
  }

  // Sort past dates in descending order to get the latest past working date
  pastDates.sort((a, b) => b.getTime() - a.getTime());

  return pastDates[0];
}

function getRemovedDatedTaskList(tasks: Task[], date: Date, type: TaskTypes) {
  const previousTasks = getDatedTasks(type, date);
  const remainingTasks = previousTasks.filter(
    (task) => !tasks.some((t) => t.id === task.id)
  );
  return remainingTasks;
}
export function deleteDatedTasks(tasks: Task[], date: Date) {
  const taskList = getRemovedDatedTaskList(tasks, date, "taskList");
  const completedList = getRemovedDatedTaskList(tasks, date, "completedList");

  saveDatedTasks(date, { taskList, completedList });
}

export function addMultipleTasksToDate(date: Date, tasks: Task[]) {
  const savedTaskList = getDatedTasks("taskList", date);
  const completedList = getDatedTasks("completedList", date);
  saveDatedTasks(date, {
    taskList: savedTaskList.concat(tasks),
    completedList,
  });
}
