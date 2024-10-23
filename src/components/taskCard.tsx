import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../helpers/taskHelpers";
import colors from "../utils/colors";
import styles from "../utils/styles";
import MoreButton from "./moreButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export type TaskOperations = {
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  editTask: (id: string, newText: string) => void;
  setEditingTaskId: (id?: string) => void;
};

interface Props {
  task: Task;
  taskOperations: TaskOperations;
  editingTaskId?: string;
}

export default function TaskCard({
  task,
  editingTaskId,
  taskOperations,
}: Props) {
  const { onDelete, onToggle, editTask, setEditingTaskId } = taskOperations;
  const { id, isCompleted, text } = task;
  const [isHovering, setIsHovering] = useState(false);
  const [isContentCopied, setIsContentCopied] = useState(false);

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

  function onClickEdit() {
    setEditingTaskId(id);
  }

  function onMouseHover() {
    if (editingTaskId === id) return;
    setIsHovering(true);
  }

  function onMouseUnhover() {
    if (editingTaskId === id) return;
    setIsHovering(false);
  }

  function onClickSave(data: { text: string }) {
    editTask(id, data.text);
    setEditingTaskId(undefined);
  }

  function onCopyContent() {
    navigator.clipboard.writeText(text);
    setIsContentCopied(true);
    setTimeout(() => {
      setIsContentCopied(false);
    }, 1000 * 5); // 5 seconds
  }

  function LeftIcon() {
    if (editingTaskId === id) return null;

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
    if (editingTaskId === id)
      return (
        <IconButton
          aria-label="done"
          onClick={handleSubmit(onClickSave)}
          size="small"
        >
          <DoneIcon className="text-skyMagenta p-0 m-0" fontSize="small" />
        </IconButton>
      );

    if (isHovering)
      return (
        <div className="flex flex-row gap-2 items-center">
          <IconButton
            onClick={onCopyContent}
            size="small"
            style={{ padding: 0, margin: 0 }}
          >
            {isContentCopied ? (
              <CheckIcon style={{ color: "gainsboro", fontSize: 20 }} />
            ) : (
              <ContentCopyIcon style={{ color: "gainsboro", fontSize: 20 }} />
            )}
          </IconButton>
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
    if (editingTaskId === id) {
      setValue("text", text);
      return (
        <form
          onSubmit={handleSubmit(onClickSave)}
          className="flex flex-grow mx-2"
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
      className={`flex ${colors.taskCardBg} rounded-md p-5 ${styles.verticalCenter}`}
      onMouseEnter={onMouseHover}
      onMouseLeave={onMouseUnhover}
    >
      <LeftIcon />
      <MiddleElement />
      <RightIcon />
    </div>
  );
}
