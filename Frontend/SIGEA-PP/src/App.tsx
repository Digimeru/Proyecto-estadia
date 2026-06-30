import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DashboardDocente from "./pages/Docente/DashboardDocente";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/docente" element={<DashboardDocente />} />
    </Routes>
  );
}

export default App;