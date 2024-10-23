import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "../helpers/taskHelpers";
import TaskCard, { TaskOperations } from "./taskCard";

interface Props {
  taskList: Task[];
  listId: string;
  taskOperations: TaskOperations;
  editingTaskId?: string;
}

function DraggableTaskList({
  taskList,
  listId,
  editingTaskId,
  taskOperations,
}: Props) {
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
                    taskOperations={taskOperations}
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

export default DraggableTaskList;
