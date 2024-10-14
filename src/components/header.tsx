import { useState, MouseEvent } from "react";
import styles from "../utils/styles";
import OptionsPopup, { PopupOption } from "./optionsPopup";
import { PrimaryButton, PrimaryButtonVariant } from "./primaryButton";

export type DropDownButtonProps = {
  title: string;
  options: PopupOption[];
  variant: "dropdown";
};

export type HeaderButtonProps = (
  | {
      text: string;
      onClick: () => void;
      variant: PrimaryButtonVariant;
    }
  | DropDownButtonProps
)[];

interface Props {
  buttons: HeaderButtonProps;
}

function Header({ buttons }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header
      className={` p-7 ${styles.flexRow} ${styles.verticalCenter} justify-end gap-5`}
    >
      {buttons.map((button, index) => (
        <>
          {button.variant === "dropdown" ? (
            <>
              <PrimaryButton
                type="button"
                onClick={handleClick}
                variant="no-border-bg"
                text={button.title}
              />
              <OptionsPopup
                options={button.options}
                anchorEl={anchorEl}
                handleClose={handleClose}
              />
            </>
          ) : (
            <PrimaryButton
              type="button"
              onClick={button.onClick}
              variant={button.variant}
              text={button.text}
              key={index}
            />
          )}
        </>
      ))}
    </header>
  );
}

export default Header;
