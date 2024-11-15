import { useEffect, useState } from "react";
import { HeaderButtonProps } from "../../components/header";
import {
  convertTaskToDraggableTask,
  createNewTask,
  formatTasksToReport,
  searchTask,
  Task,
} from "../../helpers/taskHelpers";
import {
  addMultipleTasksToDate,
  appendBacklogTask,
  deleteDatedTasks,
  getDatedTasks,
  getLastWorkingDate,
  getTaskedDatesInMonth,
  saveDatedTasks,
} from "../../services/tasks";
import { strings } from "../../utils/constants";
import { DraggableTaskProps } from "../../components/draggableTaskList";
import { showToast } from "../../components/backlogTaskToast";
import {
  setLastNotificationShownDate,
  shouldShowNotification,
} from "../../services/notifications";
import { fireEvent } from "../../analytics/helper";
import { AnalyticPages, events } from "../../analytics/consts";
import toast from "react-hot-toast";

const page = AnalyticPages.TASKS;

export function useHome() {
  // variables
  const [dateToday, setDateToday] = useState(new Date());
  const [taskList, setTaskList] = useState<Task[]>(
    getDatedTasks("taskList", dateToday)
  );
  const [completedList, setCompletedList] = useState<Task[]>(
    getDatedTasks("completedList", dateToday)
  );
  const [highlightedDates, setHighlightedDates] = useState<Date[]>(
    getTaskedDatesInMonth()
  );

  const [editingTaskId, setEditingTaskId] = useState<string | undefined>();

  const headerButtons: HeaderButtonProps = [
    {
      variant: "no-border-bg",
      text: "Feedback",
      options: [
        {
          text: "Report Issue",
          onClick: () => window.open(strings.urls.ISSUE_FORM, "_blank"),
        },
        {
          text: "Request Feature",
          onClick: () => window.open(strings.urls.FEATURE_FORM, "_blank"),
        },
        {
          text: "Share a Review",
          onClick: () => window.open(strings.urls.THOUGHT_FORM, "_blank"),
        },
      ],
    },
    {
      text: "Copy Status Report",
      onClick: onCopyReport,
      variant: "border-only",
    },
  ];

  // hooks
  useEffect(() => {
    // save dates in the storage and update the calendar
    saveDatedTasks(dateToday, { taskList, completedList });
    setHighlightedDates(getTaskedDatesInMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList, completedList]);

  useEffect(() => {
    // update tasks with the new date
    setTaskList(getDatedTasks("taskList", dateToday));
    setCompletedList(getDatedTasks("completedList", dateToday));
  }, [dateToday]);

  useEffect(() => {
    // show notification
    if (!shouldShowNotification()) return;

    const lastWorkingDay = getLastWorkingDate();
    if (!lastWorkingDay) return;

    const remainingTasks = getDatedTasks("taskList", lastWorkingDay);
    if (remainingTasks.length === 0) return;

    const moveRemainingTasksToBacklog = () => {
      remainingTasks.forEach(appendBacklogTask);
      deleteDatedTasks(remainingTasks, lastWorkingDay);
    };
    const moveTasksToDate = () => {
      addMultipleTasksToDate(dateToday, remainingTasks);
      deleteDatedTasks(remainingTasks, lastWorkingDay);
      setDateToday(new Date());
    };
    showToast(
      remainingTasks.length,
      lastWorkingDay,
      moveRemainingTasksToBacklog,
      moveTasksToDate
    );

    setLastNotificationShownDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // public functions
  function updateCompletedTaskListOrder(
    draggableTaskList: DraggableTaskProps[]
  ) {
    setCompletedList(draggableTaskList.map((item) => item.task));
  }

  function updateTaskListOrder(draggableTaskList: DraggableTaskProps[]) {
    setTaskList(draggableTaskList.map((item) => item.task));
  }

  function onDelete(id: string, silent: boolean = false) {
    setTaskList(taskList.filter((task) => task.id !== id));
    setCompletedList(completedList.filter((task) => task.id !== id));
    if(!silent){
      toast.success("Task Deleted");

    }

    fireEvent(page, events.TASKS.TASK_REMOVED);
  }

  function onMoveToBacklog(id: string) {
    const task = searchTask(taskList, id);
    if (!task) return;
    toast.success("Task moved to Backlog");

    onDelete(id, true);
    appendBacklogTask(task);

    fireEvent(page, events.TASKS.MOVE_TO_BACKLOG);
  }

  function onAdd(text: string) {
    setTaskList(taskList.concat(createNewTask(text)));

    fireEvent(page, events.TASKS.TASK_ADDED);
  }

  function onToggle(id: string) {
    const task = searchTask(taskList, id) ?? searchTask(completedList, id);
    if (!task) return;

    onDelete(id);
    task.isCompleted = !task.isCompleted;
    task.isCompleted
      ? setCompletedList(completedList.concat(task))
      : setTaskList(taskList.concat(task));

    fireEvent(
      page,
      task.isCompleted
        ? events.TASKS.TASK_COMPLETED
        : events.TASKS.TASK_UNCOMPLETED
    );
  }

  function onCopyReport() {
    navigator.clipboard.writeText(
      formatTasksToReport(completedList, taskList, dateToday)
    );

    fireEvent(page, events.STATUS.COPIED);
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

    fireEvent(page, events.TASKS.TASK_UPDATED);
  }

  function setDate(date: Date) {
    setDateToday(date);
  }

  return {
    taskList: taskList.map(convertTaskToDraggableTask),
    completedList: completedList.map(convertTaskToDraggableTask),
    dateToday,
    headerButtons,
    highlightedDates,
    editingTaskId,
    onDelete,
    onAdd,
    onToggle,
    onUpdate,
    setDate,
    setEditingTaskId,
    updateTaskListOrder,
    updateCompletedTaskListOrder,
    onMoveToBacklog,
  };
}
