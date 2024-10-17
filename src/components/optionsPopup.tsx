import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface PopupOption {
  text: string;
  onClick: () => void;
}

interface OptionsPopupProps {
  options: PopupOption[];
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const OptionsPopup: React.FC<OptionsPopupProps> = ({
  options,
  anchorEl,
  handleClose,
}) => {
  return (
    <div>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.onClick();
              handleClose();
            }}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OptionsPopup;
