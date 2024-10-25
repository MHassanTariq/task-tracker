import { Toaster } from "react-hot-toast";
import Backlog from "./page/backlog/backlog";

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Backlog />
    </div>
  );
}

export default App;
