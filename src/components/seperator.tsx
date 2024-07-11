import colors from "../utils/colors";
import styles from "../utils/styles";

interface Props {
  shouldRender: boolean;
  title: string;
  position?: "center" | "left";
}

export default function Seperator({
  shouldRender,
  title,
  position = "left",
}: Props) {
  if (shouldRender) {
    return (
      <div className={`${styles.flexRow} gap-2 ${styles.centerChildren}`}>
        {position === "center" && (
          <div className={`border-t-2 flex flex-1 ${colors.fadedBorderBg}`} />
        )}
        <p className={`text-xs italic ${colors.fadedText}`}>{title}</p>
        <div className={`border-t-2 flex flex-1 ${colors.fadedBorderBg}`} />
      </div>
    );
  }
  return null;
}
