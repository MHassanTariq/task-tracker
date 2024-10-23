import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Doodles } from "../../assets/svgs/doodles";
import CalendarButton from "../../components/calendarButton";
import Header from "../../components/header";
import Seperator from "../../components/seperator";
import SideBar from "../../components/sideBar";
import TaskCard from "../../components/taskCard";
import TaskCreationForm from "../../components/taskCreationForm";
import { formatDateAndDay } from "../../helpers/dateTimeHelper";
import { Task } from "../../helpers/taskHelpers";
import colors from "../../utils/colors";
import styles from "../../utils/styles";
import { useHome } from "./useHome";
import Modal from "../../components/modal";
import { useState } from "react";
function Home() {
  const {
    taskList,
    completedList,
    dateToday,
    headerButtons,
    highlightedDates,
    editingTaskId,
    showModal,
    openModal,
    onAdd,
    onDelete,
    onToggle,
    onUpdate,
    setDate,
    onDragEnd,
    setEditingTaskId,
    closeModal,
    setShowModal,
  } = useHome();

  function TaskList({
    taskList,
    listId,
  }: {
    taskList: Task[];
    listId: string;
  }) {
    return (
      <Droppable droppableId={listId}>
        {(provided) => (
          <div
            className="flex flex-col gap-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {taskList.map((task, index) => (
              <Draggable
                key={task.id.toString()}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="bg-gray-300"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard
                      task={task}
                      editingTaskId={editingTaskId}
                      onDelete={onDelete}
                      onToggle={onToggle}
                      editTask={onUpdate}
                      setEditingTaskId={setEditingTaskId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
            <TaskList taskList={taskList} listId={"todoList"} />
            <Seperator
              title={"Completed"}
              shouldRender={completedList.length > 0}
            />
            <TaskList taskList={completedList} listId={"completedList"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={`flex relative flex-1 h-screen w-full ${colors.bg} overflow-hidden`}
      >
        <Doodles className="" />
        <div className={`flex-1 relative ${colors.bodyBg} w-full h-full`}>
          <div className={`${styles.flexRow} h-full relative z-10 w-full`}>
            <SideBar />
            <Body />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Home;
