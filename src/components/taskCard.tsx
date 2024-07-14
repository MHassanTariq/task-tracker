import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import { DraggableItems, Task } from "../helpers/taskHelpers";
import colors from "../utils/colors";
import styles from "../utils/styles";
import MoreButton from "./moreButton";
import { useDrag, useDrop } from "react-dnd";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  editTask,
  moveCard,
  findCard,
}: Props) {
  const { id, isCompleted, text } = task;
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DraggableItems.TASKS,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: DraggableItems.TASKS,
      hover({ id: draggedId }: { id: string }) {
        if (draggedId !== id) {
          const overIndex = findCard(id).index;
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringMore, setIsHoveringMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      text: text,
    },
  });

  function onClickToggle() {
    onToggle(id);
  }

  function onClickDelete() {
    onDelete(id);
  }

  function onMouseEnterCard() {
    setIsHoveringCard(true);
  }

  function onMouseLeaveCard() {
    setTimeout(() => {
      if (!isHoveringMore) {
        setIsHoveringCard(false);
      }
    }, 100);
  }

  function onMouseEnterMore() {
    setIsHoveringMore(true);
  }

  function onMouseLeaveMore() {
    setIsHoveringMore(false);
    setTimeout(() => {
      if (!isHoveringCard) {
        setIsHoveringCard(false);
      }
    }, 100);
  }

  function onClickEdit() {
    setIsEditing(true);
  }

  function onClickCancel() {
    setIsEditing(false);
  }

  function onClickSave(data: { text: string }) {
    editTask(id, data.text);
    setIsEditing(false);
  }

  function LeftIcon() {
    if (isEditing) return null;

    return (
      <Checkbox
        checked={isCompleted}
        onChange={onClickToggle}
        size="small"
        style={{ color: "gainsboro", margin: 0, padding: 0 }}
      />
    );
  }

  function RightIcon() {
    if (isEditing)
      return (
        <IconButton
          aria-label="done"
          onClick={handleSubmit(onClickSave)}
          onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from being triggered
          size="small"
        >
          <DoneIcon className="text-skyMagenta p-0 m-0" fontSize="small" />
        </IconButton>
      );

    if (isHoveringCard || isHoveringMore)
      return (
        <div onMouseEnter={onMouseEnterMore} onMouseLeave={onMouseLeaveMore}>
          <MoreButton
            options={[
              { text: "Delete", onClick: onClickDelete },
              { text: "Edit", onClick: onClickEdit },
            ]}
          />
        </div>
      );

    return null;
  }

  function MiddleElement() {
    if (isEditing) {
      setValue("text", text);
      return (
        <form
          onSubmit={handleSubmit(onClickSave)}
          className="flex flex-grow mx-2"
          onBlur={onClickCancel}
        >
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                autoFocus
                className={`flex-grow bg-transparent text-base ${colors.text} border-b border-silver focus:outline-none`}
              />
            )}
          />
        </form>
      );
    }

    return (
      <p
        className={`text-base flex flex-grow mx-2 ${
          isCompleted
            ? `italic line-through ${colors.cardFadedText}`
            : colors.text
        }`}
      >
        {text}
      </p>
    );
  }

  return (
    <div
      ref={(node) => drag(drop(preview(node)))}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={`flex ${colors.taskCardBg} rounded-md p-5 ${styles.verticalCenter}`}
      onMouseEnter={onMouseEnterCard}
      onMouseLeave={onMouseLeaveCard}
      onFocus={onMouseEnterCard}
      onBlur={onMouseLeaveCard}
    >
      <LeftIcon />
      <MiddleElement />
      <RightIcon />
    </div>
  );
}
