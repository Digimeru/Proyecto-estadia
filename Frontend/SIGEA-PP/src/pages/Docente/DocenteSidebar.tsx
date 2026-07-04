import { NavLink, useNavigate } from "react-router-dom";
import { LayoutGrid, ClipboardList, BookOpen, LogOut } from "lucide-react";
import logo1 from "../../assets/images/logo1.png";

const navItems = [
  { to: "/docente", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/docente/asistencias", label: "Control de Asistencias", icon: ClipboardList, end: false },
  { to: "/docente/calificaciones", label: "Registro de calificación", icon: BookOpen, end: false },
];

export function DocenteSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="sidebar-logo-row">
            <img src={logo1} alt="DocenSys" className="sidebar-logo-img" />
            <div className="sidebar-logo-text">
              <h1>DocenSys</h1>
              <span>Docente</span>
            </div>
          </div>
        </div>

        <div className="active-group-badge">• Grupo activo: 3°A — 2°B</div>

        <nav className="sidebar-menu">
          <p className="menu-title">Flujo de trabajo</p>

          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `menu-item${isActive ? " active" : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">MG</div>
          <div>
            <p className="user-name">María García</p>
            <p className="user-role">Docente</p>
          </div>
        </div>
        <button type="button" className="logout-btn" onClick={() => navigate("/")}>
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
