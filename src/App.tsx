import React, { useEffect } from "react";
import { initGA } from "./analytics/config";
import { Router } from "./routes/routers";
import { Toaster } from "react-hot-toast";
import ReactModal from "./components/reactModal";

const App: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
      <ReactModal />
    </>
  );
};

export default App;
