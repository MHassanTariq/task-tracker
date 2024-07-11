import React, { useState, MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface Option {
  text: string;
  onClick: () => void;
}

interface MoreButtonProps {
  options: Option[];
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

export default MoreButton;
