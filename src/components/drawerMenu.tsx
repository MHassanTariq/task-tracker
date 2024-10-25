import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const DrawerMenu: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div>
      {isMobile && (
        <IconButton edge="start" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
      )}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem
            component={Link}
            to="/backlog"
            onClick={toggleDrawer(false)}
          >
            <ListItemText primary="Backlog" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
