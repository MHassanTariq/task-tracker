import { useForm, SubmitHandler } from "react-hook-form";
import styles from "../utils/styles";
import { useEffect } from "react";
import { PrimaryButton } from "./primaryButton";

type Inputs = {
  task: string;
};

interface Props {
  onSubmitTask: (data: string) => void;
}
export default function TaskCreationForm({ onSubmitTask }: Props) {
  const { register, handleSubmit, setFocus } = useForm<Inputs>({
    mode: "onSubmit",
  });
  useEffect(() => {
    setFocus("task");
  }, [setFocus]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSubmitTask(data.task);
    setFocus("task");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.flexRow} gap-5 ${styles.verticalCenter} md:bg-white/[0.05] md:p-7 rounded-lg md:backdrop-blur-sm md:border-2 border-white/[0.05]`}
    >
      {/* include validation with required or other standard HTML validation rules */}
      <input
        placeholder="📝 Add your task here..."
        {...register("task", { required: true })}
        className="flex flex-grow p-2 rounded-md"
      />

      <PrimaryButton type="submit" variant={"bg-only"} text="Submit" />
    </form>
  );
}
