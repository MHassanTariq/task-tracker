import PageScreen from "../../components/pageScreen";
import colors from "../../utils/colors";
import styles from "../../utils/styles";
import TaskCreationForm from "../../components/taskCreationForm";
import { StandardButton } from "../../components/standardButton";
import DraggableTaskList from "../../components/draggableTaskList";
import { useBacklog } from "./useBacklog";
import CalendarButton from "../../components/calendarButton";

function Backlog() {
  const {
    backlogTasks,
    editTaskId,
    areOptionsDisabled,
    onAddBacklogTask,
    onDeleteTask,
    onEditTask,
    setEditTaskId,
    moveTaskToDate,
    discardTasks,
    toggleBacklog,
    updateTaskListOrder,
  } = useBacklog();
  const taskOperations = {
    onDelete: onDeleteTask,
    onToggle: toggleBacklog,
    editTask: onEditTask,
    setEditingTaskId: setEditTaskId,
  };

  function Title() {
    return <p className={`${colors.titleText}`}>Backlog</p>;
  }

  function StandardButtonOptions() {
    return (
      <div className={`${styles.flexRow} gap-5 pt-4`}>
        <CalendarButton
          currentSelectedDate={new Date()}
          onDateChange={moveTaskToDate}
          btnConfig={{
            type: "button",
            text: "Move",
            disabled: areOptionsDisabled,
          }}
        />
        <StandardButton
          type="button"
          onClick={discardTasks}
          text="Discard"
          disabled={areOptionsDisabled}
        />
      </div>
    );
  }

  return (
    <PageScreen>
      <Title />
      <div className={styles.bodyArea}>
        <TaskCreationForm
          onSubmitTask={onAddBacklogTask}
          placeholder="🚀 Add your next big idea here..."
        />
        <StandardButtonOptions />
        <DraggableTaskList
          taskList={backlogTasks}
          taskOperations={taskOperations}
          editingTaskId={editTaskId}
          updateTaskListOrder={updateTaskListOrder}
        />
      </div>
    </PageScreen>
  );
}

export default Backlog;
