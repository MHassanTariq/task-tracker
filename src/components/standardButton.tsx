import { MouseEvent } from "react";
import { ButtonBase } from "@mui/material";
import styles from "../utils/styles";

type Size = "small" | "medium" | "large";

interface Props {
  type: "submit" | "button";
  text: string;
  size?: Size;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function StandardButton({
  text,
  type,
  size = "small",
  disabled = false,
  onClick,
}: Props) {
  function getDimensionsFromSize(): string {
    switch (size) {
      case "small":
        return "h-8 w-20";
      case "medium":
        return "h-12 w-32";
      case "large":
        return "h-16 w-40";
    }
  }

  const textColor = disabled ? "silver" : "gainsboro";
  const btnTextStyle = `text-${textColor} border-${textColor} ${
    styles.standardBtn
  } ${getDimensionsFromSize()}`;

  return (
    <ButtonBase type={type} onClick={onClick} disabled={disabled}>
      <p className={btnTextStyle}>{text}</p>
    </ButtonBase>
  );
}
