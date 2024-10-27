import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard, { TaskOperations } from "./taskCard";
import { Task } from "../helpers/taskHelpers";

export interface DraggableTaskProps {
  task: Task;
  isHighlighted?: boolean;
}

interface Props {
  taskList: DraggableTaskProps[];
  taskOperations: TaskOperations;
  editingTaskId?: string;
  updateTaskListOrder: (taskList: DraggableTaskProps[]) => void;
}

class MaskDraggableSensors extends PointerSensor {
  static activators = [
    {
      eventName: "onPointerDown" as const,
      handler: ({ nativeEvent: event }: any) => {
        // Check if the target is an interactive element
        const interactiveElements = ["BUTTON", "INPUT", "TEXTAREA"];
        if (
          interactiveElements.includes(event.target.tagName) ||
          event.target.closest(".MuiIconButton-root") || // IconButton
          event.target.closest(".MuiMenu-root") || // Menu
          event.target.closest(".MuiMenuItem-root") // MenuItem
        ) {
          return false;
        }
        return true;
      },
    },
  ];
}

function SortableTaskItem({ item, taskOperations, editingTaskId }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging ? "0px 8px 16px rgba(0, 0, 0, 0.2)" : "none", // Add shadow on drag
    zIndex: isDragging ? 1 : "auto", // Bring dragged item to the top
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-300"
    >
      <TaskCard
        task={item.task}
        editingTaskId={editingTaskId}
        taskOperations={taskOperations}
        isHighlighted={item.isHighlighted}
      />
    </div>
  );
}

function DraggableTaskList({
  taskList,
  editingTaskId,
  taskOperations,
  updateTaskListOrder,
}: Props) {
  const sensors = useSensors(
    useSensor(MaskDraggableSensors, {
      activationConstraint: {
        delay: 250, // Delay in ms before the drag is activated
        tolerance: 5, // Number of pixels of movement to detect a drag
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = taskList.findIndex((item) => item.task.id === active.id);
      const newIndex = taskList.findIndex((item) => item.task.id === over.id);
      updateTaskListOrder(arrayMove(taskList, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={taskList.map((item) => item.task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-5">
          {taskList.map((item) => (
            <SortableTaskItem
              key={item.task.id}
              item={item}
              taskOperations={taskOperations}
              editingTaskId={editingTaskId}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default DraggableTaskList;
