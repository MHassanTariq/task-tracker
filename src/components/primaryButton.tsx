import React, { MouseEvent } from "react";
import { ButtonBase } from "@mui/material";
import colors from "../utils/colors";

export type PrimaryButtonVariant = "no-border-bg" | "border-only" | "bg-only";

interface Props {
  type: "submit" | "button";
  variant: PrimaryButtonVariant;
  text: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function PrimaryButton({ text, variant, type, onClick }: Props) {
  function getAppearanceFromVariant() {
    const btnTextStyle = "text-gainsboro font-bold text-base";
    switch (variant) {
      case "no-border-bg":
        return btnTextStyle;
      case "border-only":
        return `${btnTextStyle} border-skyMagenta border-2`;
      case "bg-only":
        return `${btnTextStyle} ${colors.btnGradient} inner-2xl`;
    }
  }

  return (
    <ButtonBase type={type} onClick={onClick}>
      <p
        className={`${getAppearanceFromVariant()} rounded py-1.5 px-3.5 flex flex-1 justify-center`}
      >
        {text}
      </p>
    </ButtonBase>
  );
}
