import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/home";
import Backlog from "../page/backlog/backlog";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "backlog",
    element: <Backlog />,
  },
  {
    path: "*", // catch all undefined routes ( wildcard *)
    element: <Home />, // renders the  NotFound component for any undefined routes
  },
]);

export default router;
