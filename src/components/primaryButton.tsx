import React, { MouseEvent, useState } from "react";
import { ButtonBase } from "@mui/material";
import colors from "../utils/colors";
import OptionsPopup, { PopupOption } from "./optionsPopup";

export type PrimaryButtonVariant = "no-border-bg" | "border-only" | "bg-only";

interface Props {
  type: "submit" | "button";
  variant: PrimaryButtonVariant;
  text: string;
  options?: PopupOption[];
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export function PrimaryButton({
  text,
  variant,
  type,
  options = [],
  onClick,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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

  function onClickPrimaryBtn(event: MouseEvent<HTMLElement>) {
    if (onClick) {
      onClick(event);
    }
    if (options.length > 0) {
      handleClick(event);
    }
  }

  return (
    <>
      <ButtonBase type={type} onClick={onClickPrimaryBtn}>
        <p
          className={`${getAppearanceFromVariant()} rounded py-1.5 px-3.5 flex flex-1 justify-center`}
        >
          {text}
        </p>
      </ButtonBase>
      {options.length > 0 ? (
        <OptionsPopup
          options={options}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
}
