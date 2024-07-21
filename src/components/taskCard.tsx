import DoneIcon from "@mui/icons-material/Done";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../helpers/taskHelpers";
import colors from "../utils/colors";
import styles from "../utils/styles";
import MoreButton from "./moreButton";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  editTask: (id: string, newText: string) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  editTask,
}: Props) {
  const { id, isCompleted, text } = task;
  const [isHovering, setIsHovering] = useState(false);
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

  function onClickEdit() {
    setIsEditing(true);
  }

  function onMouseHover() {
    if (isEditing) return;
    setIsHovering(true);
  }

  function onMouseUnhover() {
    if (isEditing) return;
    setIsHovering(false);
  }

  function onClickSave(data: { text: string }) {
    console.log("data: ", data);
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
          size="small"
        >
          <DoneIcon className="text-skyMagenta p-0 m-0" fontSize="small" />
        </IconButton>
      );

    if (isHovering)
      return (
        <MoreButton
          options={[
            { text: "Delete", onClick: onClickDelete },
            { text: "Edit", onClick: onClickEdit },
          ]}
        />
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
