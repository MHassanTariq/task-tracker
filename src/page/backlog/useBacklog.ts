import { useEffect, useState } from "react";
import {
  convertTaskToDraggableTask,
  createNewTask,
} from "../../helpers/taskHelpers";
import {
  addMultipleTasksToDate,
  getBacklogTasks,
  storeBacklogTasks,
} from "../../services/tasks";
import { DraggableTaskProps } from "../../components/draggableTaskList";
import { AnalyticPages, events } from "../../analytics/consts";
import { fireEvent } from "../../analytics/helper";

const page = AnalyticPages.TASKS;

export function useBacklog() {
  const [backlogTasks, setBacklogTasks] = useState<DraggableTaskProps[]>(
    getBacklogTasks().map(convertTaskToDraggableTask)
  );
  const [editTaskId, setEditTaskId] = useState<string | undefined>();
  const [areOptionsDisabled, setAreOptionsDisabled] = useState<boolean>(false);

  // hooks to monitor backlog task and update store
  useEffect(() => {
    storeBacklogTasks(backlogTasks.map((item) => item.task));
    const ids = getHighlightedTaskIds();
    setAreOptionsDisabled(ids.length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backlogTasks]);

  // private functions
  function getHighlightedTaskIds(): string[] {
    const ids: string[] = backlogTasks
      .filter((item) => item.isHighlighted)
      .map((item) => item.task.id);
    return ids;
  }

  // public functions
  function onAddBacklogTask(text: string) {
    const taskList = [
      ...backlogTasks,
      convertTaskToDraggableTask(createNewTask(text)),
    ];
    setBacklogTasks(taskList);

    fireEvent(page, events.TASKS.TASK_ADDED);
  }

  function toggleBacklog(id: string) {
    const index = backlogTasks.findIndex((task) => task.task.id === id);
    if (index === -1) return;

    backlogTasks[index].isHighlighted = !backlogTasks[index].isHighlighted;
    setBacklogTasks([...backlogTasks]);
  }

  function onDeleteTask(id: string) {
    setBacklogTasks(backlogTasks.filter((item) => item.task.id !== id));

    fireEvent(page, events.TASKS.TASK_REMOVED);
  }

  function onEditTask(id: string, text: string) {
    let index = backlogTasks.findIndex((item) => item.task.id === id);
    if (text === "" || index < 0) return;

    backlogTasks[index].task.text = text;

    fireEvent(page, events.TASKS.TASK_UPDATED);

    return setBacklogTasks([...backlogTasks]);
  }

  function discardTasks() {
    const ids = getHighlightedTaskIds();
    setBacklogTasks(backlogTasks.filter((item) => !ids.includes(item.task.id)));

    fireEvent(page, events.TASKS.DISCARDED);
  }

  function moveTaskToDate(date: Date) {
    const ids = getHighlightedTaskIds();
    const newTaskList = backlogTasks
      .filter((item) => ids.includes(item.task.id))
      .map((item) => item.task);
    addMultipleTasksToDate(date, newTaskList);

    // delete the tasks that have been moved
    discardTasks();

    fireEvent(page, events.TASKS.MOVE_TO_DATE);
  }

  return {
    backlogTasks,
    editTaskId,
    areOptionsDisabled,
    setEditTaskId,
    onAddBacklogTask,
    toggleBacklog,
    onDeleteTask,
    onEditTask,
    discardTasks,
    moveTaskToDate,
    updateTaskListOrder: setBacklogTasks,
  };
}
