import { Outlet, useLocation } from "react-router-dom";
import { CircleHelp } from "lucide-react";
import "./DashboardDocente.css";
import { DocenteSidebar } from "./DocenteSidebar";
import { DocenteTopBar } from "./DocenteTopBar";

const pageTitles: Record<string, string> = {
  "/docente": "Dashboard",
  "/docente/asistencias": "Control de Asistencias",
  "/docente/calificaciones": "Registro de calificación",
};

function DocenteLayout() {
  const { pathname } = useLocation();
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <div className="docente-container">
      <DocenteSidebar />

      <main className="main-content">
        <DocenteTopBar pageTitle={pageTitle} />

        <div className="dashboard-body">
          <Outlet />
        </div>
      </main>

      <button type="button" className="help-fab" aria-label="Ayuda">
        <CircleHelp size={18} />
      </button>
    </div>
  );
}

export default DocenteLayout;
