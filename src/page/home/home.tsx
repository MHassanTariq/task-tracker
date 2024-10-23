import CalendarButton from "../../components/calendarButton";
import Seperator from "../../components/seperator";
import { TaskOperations } from "../../components/taskCard";
import TaskCreationForm from "../../components/taskCreationForm";
import { formatDateAndDay } from "../../helpers/dateTimeHelper";
import colors from "../../utils/colors";
import styles from "../../utils/styles";
import { useHome } from "./useHome";
import PageScreen from "../../components/pageScreen";
import DraggableTaskList from "../../components/taskList";

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
    onDragEnd,
    setEditingTaskId,
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
    <PageScreen onDragEnd={onDragEnd} headerButtons={headerButtons}>
      <Title />
      <div className="flex flex-1 flex-col pt-5 lg:px-14 gap-5">
        <TaskCreationForm onSubmitTask={onAdd} />
        <DraggableTaskList
          taskList={taskList}
          listId={"todoList"}
          editingTaskId={editingTaskId}
          taskOperations={taskOperations}
        />
        <Seperator
          title={"Completed"}
          shouldRender={completedList.length > 0}
        />
        <DraggableTaskList
          taskList={completedList}
          listId={"completedList"}
          editingTaskId={editingTaskId}
          taskOperations={taskOperations}
        />
      </div>
    </PageScreen>
  );
}

export default Home;
