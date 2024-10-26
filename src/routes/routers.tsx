import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../page/home/home";
import Backlog from "../page/backlog/backlog";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backlog" element={<Backlog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
