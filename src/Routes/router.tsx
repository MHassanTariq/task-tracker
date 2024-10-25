import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/home";
import Backlog from "../page/home/backlog";
import NotFound from "../page/home/notFound";
import DrawerMenu from "../components/drawerMenu";
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
    element: <NotFound />, // renders the  NotFound component for any undefined routes
  },
]);

export default router;
