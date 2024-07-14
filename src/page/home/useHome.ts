import { useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import {
  DraggableItems,
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
import { useDrop } from "react-dnd";

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
  const [, droppableList] = useDrop(() => ({ accept: DraggableItems.TASKS }));

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

  const findTask = useCallback(
    (id: string) => {
      const card = taskList.filter((task) => task.id === id)[0];
      return {
        card,
        index: taskList.indexOf(card),
      };
    },
    [taskList]
  );

  const moveTaskInList = useCallback(
    (id: string, atIndex: number) => {
      const { index, card } = findTask(id);
      setTaskList(
        update(taskList, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findTask, taskList, setTaskList]
  );

  return {
    taskList,
    completedList,
    dateToday,
    headerButtons,
    highlightedDates,
    findTask,
    moveTaskInList,
    droppableList,
    onDelete,
    onAdd,
    onToggle,
    onUpdate,
    setDate,
  };
}
