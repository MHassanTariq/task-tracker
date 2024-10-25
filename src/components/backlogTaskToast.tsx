import toast from "react-hot-toast";
import { formatDateAndDay } from "../helpers/dateTimeHelper";

interface Props {
  pendingTaskCount: number;
  workingDate: Date;
  onClickMoveToBacklog: () => void;
  onClickMoveToToday: () => void;
}
function BacklogTaskToast({
  pendingTaskCount,
  workingDate,
  onClickMoveToBacklog,
  onClickMoveToToday,
}: Props) {
  return (
    <div>
      <p>
        You have{" "}
        <span className="font-bold"> {pendingTaskCount} pending tasks </span>
        from your last working date,
        <p className="font-bold">{formatDateAndDay(workingDate)}</p>
      </p>
      <div className="flex gap-2 pt-2">
        <button
          className="bg-skyMagenta text-white py-1 px-3 rounded"
          onClick={onClickMoveToBacklog}
        >
          Move to Backlog
        </button>
        <button
          className="bg-lavanderBlue text-white py-1 px-3 rounded"
          onClick={onClickMoveToToday}
        >
          Move to Today
        </button>
      </div>
    </div>
  );
}

export function showToast(
  pendingTaskCount: number,
  workingDate: Date,
  onClickMoveToBacklog: () => void,
  onClickMoveToToday: () => void
) {
  toast.dismiss();
  toast(
    (t) => (
      <BacklogTaskToast
        onClickMoveToBacklog={() => {
          toast.dismiss(t.id);
          onClickMoveToBacklog();
        }}
        pendingTaskCount={pendingTaskCount}
        workingDate={workingDate}
        onClickMoveToToday={() => {
          toast.dismiss(t.id);
          onClickMoveToToday();
        }}
      />
    ),
    {
      duration: 10000,
      style: { maxWidth: "400px", padding: "16px", overflow: "visible" },
    }
  );
}
