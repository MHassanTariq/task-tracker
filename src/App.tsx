import React, { useEffect } from "react";
import { initGA } from "./analytics/config";
import { Router } from "./routes/routers";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router />
    </>
  );
};

export default App;
