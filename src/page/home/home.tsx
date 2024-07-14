import Header from "../../components/header";
import SideBar from "../../components/sideBar";
import TaskCard from "../../components/taskCard";
import TaskCreationForm from "../../components/taskCreationForm";
import colors from "../../utils/colors";
import { Task } from "../../helpers/taskHelpers";
import styles from "../../utils/styles";
import { useHome } from "./useHome";
import Seperator from "../../components/seperator";
import { Doodles } from "../../assets/svgs/doodles";
import CalendarButton from "../../components/calendarButton";
import { formatDateAndDay } from "../../helpers/dateTimeHelper";

function Home() {
  const {
    taskList,
    completedList,
    dateToday,
    headerButtons,
    highlightedDates,
    findTask,
    moveTaskInList,
    droppableList,
    onAdd,
    onDelete,
    onToggle,
    onUpdate,
    setDate,
  } = useHome();

  function TaskList({ taskList }: { taskList: Task[] }) {
    return (
      <div className="flex flex-col gap-5" ref={droppableList}>
        {taskList.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            editTask={onUpdate}
            moveCard={moveTaskInList}
            findCard={findTask}
          />
        ))}
      </div>
    );
  }

  function Body() {
    return (
      <div className={`flex flex-1 flex-col overflow-auto ${colors.bodyBg}`}>
        <Header buttons={headerButtons} />
        <div className="flex flex-1 flex-col pb-20 px-5">
          <div className={`${styles.flexRow} ${styles.verticalCenter} gap-2`}>
            <p className={`${colors.titleText}`}>
              {formatDateAndDay(dateToday)}
            </p>
            <CalendarButton
              currentSelectedDate={new Date(dateToday)}
              onDateChange={setDate}
              highlightedDays={highlightedDates}
            />
          </div>
          <div className="flex flex-1 flex-col pt-5 lg:px-14 gap-5">
            <TaskCreationForm onSubmitTask={onAdd} />
            <TaskList taskList={taskList} />
            <Seperator
              title={"Completed"}
              shouldRender={completedList.length > 0}
            />
            <TaskList taskList={completedList} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex relative flex-1 h-screen w-full ${colors.bg} overflow-hidden`}
    >
      <Doodles className="" />
      <div className={`flex-1 relative ${colors.bodyBg} w-full h-full`}>
        <div className={`${styles.flexRow} h-full relative z-10 w-full`}>
          <SideBar dates={[]} onClickDate={() => {}} />
          <Body />
        </div>
      </div>
    </div>
  );
}

export default Home;
