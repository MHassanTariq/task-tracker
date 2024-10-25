import CalendarButton from "../../components/calendarButton";
import Seperator from "../../components/seperator";
import { TaskOperations } from "../../components/taskCard";
import TaskCreationForm from "../../components/taskCreationForm";
import { formatDateAndDay } from "../../helpers/dateTimeHelper";
import colors from "../../utils/colors";
import styles from "../../utils/styles";
import { useHome } from "./useHome";
import PageScreen from "../../components/pageScreen";
import DraggableTaskList from "../../components/draggableTaskList";

function Home() {
  const {
    taskList,
    completedList,
    dateToday,
    headerButtons,
    highlightedDates,
    editingTaskId,
    onAdd,
    onDelete,
    onToggle,
    onUpdate,
    setDate,
    setEditingTaskId,
    updateTaskListOrder,
    updateCompletedTaskListOrder,
  } = useHome();

  const taskOperations: TaskOperations = {
    onDelete,
    onToggle,
    editTask: onUpdate,
    setEditingTaskId,
  };

  function Title() {
    return (
      <div className={`${styles.flexRow} ${styles.verticalCenter} gap-2`}>
        <p className={`${colors.titleText}`}>{formatDateAndDay(dateToday)}</p>
        <CalendarButton
          currentSelectedDate={new Date(dateToday)}
          onDateChange={setDate}
          highlightedDays={highlightedDates}
        />
      </div>
    );
  }

  return (
    <PageScreen headerButtons={headerButtons}>
      <Title />
      <div className={styles.bodyArea}>
        <TaskCreationForm onSubmitTask={onAdd} shouldRenderBackdrop />
        <DraggableTaskList
          taskList={taskList}
          editingTaskId={editingTaskId}
          taskOperations={taskOperations}
          updateTaskListOrder={updateTaskListOrder}
        />
        <Seperator
          title={"Completed"}
          shouldRender={completedList.length > 0}
        />
        <DraggableTaskList
          taskList={completedList}
          editingTaskId={editingTaskId}
          taskOperations={taskOperations}
          updateTaskListOrder={updateCompletedTaskListOrder}
        />
      </div>
    </PageScreen>
  );
}

export default Home;
