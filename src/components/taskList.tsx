import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task } from "../helpers/taskHelpers";
import TaskCard, { TaskOperations } from "./taskCard";

export interface DraggableTaskProps {
  task: Task;
  isHighlighted?: boolean;
}

interface Props {
  taskList: DraggableTaskProps[];
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
          {taskList.map((item, index) => (
            <Draggable
              key={item.task.id.toString()}
              draggableId={item.task.id.toString()}
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
                    task={item.task}
                    editingTaskId={editingTaskId}
                    taskOperations={taskOperations}
                    isHighlighted={item.isHighlighted}
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
