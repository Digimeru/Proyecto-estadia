import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DocenteLayout from "./pages/Docente/DocenteLayout";
import DocenteDashboard from "./pages/Docente/DocenteDashboard";
import ControlAsistencias from "./pages/Docente/ControlAsistencias";
import RegistroCalificaciones from "./pages/Docente/RegistroCalificaciones";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/docente" element={<DocenteLayout />}>
        <Route index element={<DocenteDashboard />} />
        <Route path="asistencias" element={<ControlAsistencias />} />
        <Route path="calificaciones" element={<RegistroCalificaciones />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;