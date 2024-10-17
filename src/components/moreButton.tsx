import React, { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OptionsPopup, { PopupOption } from "./optionsPopup";

interface MoreButtonProps {
  options: PopupOption[];
}

const MoreButton: React.FC<MoreButtonProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        size="small"
        style={{ padding: 0, margin: 0 }}
      >
        <MoreHorizIcon style={{ color: "gainsboro", fontSize: 20 }} />
      </IconButton>
      <OptionsPopup
        options={options}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </div>
  );
};

export default MoreButton;
