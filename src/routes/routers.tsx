import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/home";
import DrawerMenu from "../components/drawerMenu";
import Backlog from "../page/backlog/backlog";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DrawerMenu />
        <Home />
      </>
    ),
  },
  {
    path: "backlog",
    element: (
      <>
        <DrawerMenu />
        <Backlog />
      </>
    ),
  },
  {
    path: "*", // catch all undefined routes ( wildcard *)
    element: <Home />, // renders the  NotFound component for any undefined routes
  },
]);

export default router;
