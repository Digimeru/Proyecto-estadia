import { Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import DashboardDocente from "./pages/docente/DashboardDocente";

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