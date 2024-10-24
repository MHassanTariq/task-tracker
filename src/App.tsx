import Home from "./page/home/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Backlog from "./page/home/backlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "backlog",
    element: <Backlog />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
