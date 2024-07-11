import { useEffect, useState } from "react";
import {
  Task,
  createNewTask,
  formatTasksToReport,
  searchTask,
} from "../../helpers/taskHelpers";
import {
  getDatedTasks,
  getTaskedDatesInMonth,
  saveDatedTasks,
} from "../../services/tasks";
import { HeaderButtonProps } from "../../components/header";

export function useHome() {
  // variables
  const [dateToday, setDate] = useState(new Date());
  const [taskList, setTaskList] = useState<Task[]>(
    getDatedTasks("taskList", dateToday)
  );
  const [completedList, setCompletedList] = useState<Task[]>(
    getDatedTasks("completedList", dateToday)
  );
  const [highlightedDates, setHighlightedDates] = useState<Date[]>(
    getTaskedDatesInMonth()
  );

  const headerButtons: HeaderButtonProps = [
    {
      text: "Copy Status Report",
      onClick: onCopyReport,
      variant: "border-only",
    },
  ];

  // hooks
  useEffect(() => {
    saveDatedTasks(dateToday, { taskList, completedList });
    setHighlightedDates(getTaskedDatesInMonth());
  }, [taskList, completedList]);

  useEffect(() => {
    setTaskList(getDatedTasks("taskList", dateToday));
    setCompletedList(getDatedTasks("completedList", dateToday));
  }, [dateToday]);

  // logical functions
  function onDelete(id: string) {
    setTaskList(taskList.filter((task) => task.id !== id));
    setCompletedList(completedList.filter((task) => task.id !== id));
  }

  function onAdd(text: string) {
    setTaskList(taskList.concat(createNewTask(text)));
  }

  function onToggle(id: string) {
    const task = searchTask(taskList, id) ?? searchTask(completedList, id);
    if (!task) return;

    onDelete(id);
    task.isCompleted = !task.isCompleted;
    task.isCompleted
      ? setCompletedList(completedList.concat(task))
      : setTaskList(taskList.concat(task));
  }

  function onCopyReport() {
    navigator.clipboard.writeText(
      formatTasksToReport(completedList, taskList, dateToday)
    );
  }

  function onUpdate(id: string, text: string) {
    let index = taskList.findIndex((val) => val.id === id);
    if (text === "") return;

    if (index >= 0) {
      taskList[index].text = text;
      return setTaskList([...taskList]);
    }
    index = completedList.findIndex((val) => val.id === id);

    if (index >= 0) {
      completedList[index].text = text;
      return setCompletedList([...completedList]);
    }
  }

  return {
    taskList,
    completedList,
    dateToday,
    headerButtons,
    highlightedDates,
    onDelete,
    onAdd,
    onToggle,
    onUpdate,
    setDate,
  };
}
