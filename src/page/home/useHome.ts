import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { HeaderButtonProps } from "../../components/header";
import {
  createNewTask,
  formatTasksToReport,
  searchTask,
  Task,
} from "../../helpers/taskHelpers";
import {
  getDatedTasks,
  getTaskedDatesInMonth,
  saveDatedTasks,
} from "../../services/tasks";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    const newTaskArray =
      source.droppableId === "todoList" ? [...taskList] : [...completedList];
    const [draggedItem] = newTaskArray.splice(source.index, 1);
    newTaskArray.splice(destination.index, 0, draggedItem);
    source.droppableId === "todoList"
      ? setTaskList(newTaskArray)
      : setCompletedList(newTaskArray);
  };

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
    onDragEnd,
  };
}
