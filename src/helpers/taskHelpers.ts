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

export enum DraggableItems {
  TASKS = "TASKS",
}

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

/**
 * Moves an element from one index to another within an array.
 *
 * @template T - The type of elements in the array.
 * @param array - The array to move the element within.
 * @param fromIndex - The index of the element to move.
 * @param toIndex - The index to move the element to.
 * @returns A new array with the element moved.
 */
export function moveElement<T>(
  array: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  // Check if the provided indexes are within the bounds of the array
  if (
    fromIndex < 0 ||
    fromIndex >= array.length ||
    toIndex < 0 ||
    toIndex >= array.length
  ) {
    return array;
  }

  // Create a copy of the array to avoid mutating the original array
  const newArray = [...array];

  // Remove the element from the fromIndex
  const [element] = newArray.splice(fromIndex, 1);

  // Insert the element at the toIndex
  newArray.splice(toIndex, 0, element);

  return newArray;
}
