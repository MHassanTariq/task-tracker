import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { TaskListIcon } from "../assets/svgs/taskListIcon";
import Logo from "../assets/svgs/logo";
import { BacklogIcon } from "../assets/svgs/backlogIcon";
import styles from "../utils/styles";
import colors from "../utils/colors";

const DrawerMenu: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  function renderLinkAndIcon(path: string, Icon: React.FC, text: string) {
    const isSelected = location.pathname === path;
    const linkStyles = isSelected
      ? styles.sideBarSelectedItem
      : styles.sideBarUnselectedItem;
    return (
      <ListItem
        component={Link}
        to={path}
        onClick={toggleDrawer(false)}
        className={`flex ${styles.verticalCenter} ${linkStyles} gap-2 my-2`}
      >
        <Icon />
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  return (
    <div className="lg:hidden">
      <IconButton edge="start" onClick={toggleDrawer(true)}>
        <MenuIcon className={colors.text} />
      </IconButton>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(4px)",
            width: 300,
            padding: "24px",
          },
        }}
      >
        <List className={`flex flex-col m-4`}>
          <div className={`flex flex-1 ${styles.centerChildren} mt-4 mb-10`}>
            <Logo width={60} height={60} />
          </div>
          {renderLinkAndIcon("/", TaskListIcon, "Task List")}
          {renderLinkAndIcon("/backlog", BacklogIcon, "Backlog")}
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
