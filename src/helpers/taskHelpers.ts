import { v4 as uuid } from "uuid";
import { formatDateAndDay } from "./dateTimeHelper";

export type Task = {
  text: string;
  isCompleted: boolean;
  id: string;
};

export type StoredTasks = {
  taskList: Task[];
  completedList: Task[];
};

export type TaskTypes = "taskList" | "completedList";

export function createNewTask(text: string): Task {
  return { text, isCompleted: false, id: uuid() };
}

export function searchTask(list: Task[], id: string): Task | undefined {
  return list.find((task) => task.id === id);
}

/**
 * Formats tasks into a report string to be shared with shareholders.
 *
 * @param completed - An array of completed tasks.
 * @param remaining - An array of remaining tasks.
 * @param date - The date for which the report is being generated.
 * @returns A formatted string representing the report.
 */
export function formatTasksToReport(
  completed: Task[],
  remaining: Task[],
  date: Date
): string {
  const completedTaskString =
    completed.length > 0
      ? "\nCompleted:\n" +
        completed.map((task) => "\t✔ " + task.text).join("\n")
      : "";
  const remainingTaskString =
    remaining.length > 0
      ? "\nRemaining:\n" +
        remaining.map((task) => "\t- " + task.text).join("\n")
      : "";
  return `${formatDateAndDay(
    date
  )}:${completedTaskString}${remainingTaskString}`;
}
