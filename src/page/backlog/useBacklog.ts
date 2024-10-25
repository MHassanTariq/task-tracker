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
  }

  function toggleBacklog(id: string) {
    const index = backlogTasks.findIndex((task) => task.task.id === id);
    if (index === -1) return;

    backlogTasks[index].isHighlighted = !backlogTasks[index].isHighlighted;
    setBacklogTasks([...backlogTasks]);
  }

  function onDeleteTask(id: string) {
    setBacklogTasks(backlogTasks.filter((item) => item.task.id !== id));
  }

  function onEditTask(id: string, text: string) {
    let index = backlogTasks.findIndex((item) => item.task.id === id);
    if (text === "" || index < 0) return;

    backlogTasks[index].task.text = text;
    return setBacklogTasks([...backlogTasks]);
  }

  function discardTasks() {
    const ids = getHighlightedTaskIds();
    setBacklogTasks(backlogTasks.filter((item) => !ids.includes(item.task.id)));
  }

  function moveTaskToDate(date: Date) {
    const ids = getHighlightedTaskIds();
    const newTaskList = backlogTasks
      .filter((item) => ids.includes(item.task.id))
      .map((item) => item.task);
    addMultipleTasksToDate(date, newTaskList);

    // delete the tasks that have been moved
    discardTasks();
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
