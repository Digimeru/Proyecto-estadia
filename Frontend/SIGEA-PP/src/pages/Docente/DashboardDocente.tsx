import "./DashboardDocente.css";
import logo1 from "../../assets/images/logo1.png";
import {
  LayoutGrid,
  ClipboardList,
  BookOpen,
  LogOut,
  Search,
  Bell,
  Users,
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  CircleHelp,
} from "lucide-react";

const kpis = [
  {
    label: "Grupos asignados",
    value: "3",
    delta: "3°A · 2°B · 1°C",
    icon: Users,
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    label: "Tareas pendientes",
    value: "6",
    delta: "2 por calificar hoy",
    icon: FileText,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    label: "Asistencia prom.",
    value: "91%",
    delta: "Esta semana",
    icon: CheckCircle,
    color: "#10b981",
    bg: "#ecfdf5",
  },
  {
    label: "Próxima clase",
    value: "14:00",
    delta: "Estadística · 4°A",
    icon: Clock,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

const clasesDelDia = [
  {
    horario: "07:00 – 08:30",
    materia: "Matemáticas III",
    grupo: "3°A",
    aula: "B-204",
    estado: "Completada",
    statusClass: "status-completada",
  },
  {
    horario: "09:00 – 10:30",
    materia: "Álgebra Lineal",
    grupo: "2°B",
    aula: "A-101",
    estado: "En curso",
    statusClass: "status-curso",
  },
  {
    horario: "11:00 – 12:30",
    materia: "Cálculo Diferencial",
    grupo: "1°C",
    aula: "C-305",
    estado: "Próxima",
    statusClass: "status-proxima",
  },
  {
    horario: "14:00 – 15:30",
    materia: "Estadística",
    grupo: "4°A",
    aula: "B-102",
    estado: "Próxima",
    statusClass: "status-proxima",
  },
];

const avisos = [
  {
    texto: "Entrega de actas — 3er parcial antes del 20 jun.",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    texto: "Reunión de academia: viernes 13 jun. a las 10:00.",
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    texto: "Calificaciones 2°B actualizadas correctamente.",
    color: "#10b981",
    bg: "#ecfdf5",
  },
];

function DashboardDocente() {
  return (
    <div className="docente-container">
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

            <div className="menu-item active">
              <LayoutGrid size={18} />
              <span>Dashboard</span>
            </div>

            <div className="menu-item">
              <ClipboardList size={18} />
              <span>Control de Asistencias</span>
            </div>

            <div className="menu-item">
              <BookOpen size={18} />
              <span>Registro de calificación</span>
            </div>
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
          <div className="logout-btn">
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs">
            DocenSys <span className="breadcrumb-sep">/</span>{" "}
            <span className="current">Docente</span>{" "}
            <span className="breadcrumb-sep">/</span> Dashboard
          </div>

          <div className="search-container">
            <Search size={16} color="#8b94a8" className="search-icon" />
            <input type="text" placeholder="Buscar..." className="search-input" />
          </div>

          <div className="topbar-actions">
            <div className="notification-bell">
              <Bell size={18} color="#4a5a7a" />
              <div className="bell-badge" />
            </div>

            <div className="topbar-user">
              <div className="topbar-avatar">MG</div>
              <div className="topbar-user-info">
                <p className="topbar-user-name">María García</p>
                <p className="topbar-user-role">Docente · 3°A</p>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-header">
            <h2>Mi Dashboard</h2>
            <p>Martes, 9 de junio de 2026 — Docente: María García</p>
          </div>

          <div className="kpi-grid">
            {kpis.map(({ label, value, delta, icon: Icon, color, bg }) => (
              <div key={label} className="kpi-card">
                <div className="kpi-icon-wrapper" style={{ backgroundColor: bg }}>
                  <Icon size={22} color={color} />
                </div>
                <div className="kpi-info">
                  <p>{label}</p>
                  <h4>{value}</h4>
                  <p className="kpi-delta">{delta}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="schedule-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <Clock size={16} color="#3b82f6" />
                  <h3>Clases del día</h3>
                </div>
                <span className="panel-badge">4 clases</span>
              </div>

              <div className="schedule-table-wrapper">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Horario</th>
                      <th>Materia</th>
                      <th>Grupo</th>
                      <th>Aula</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clasesDelDia.map((clase) => (
                      <tr key={`${clase.horario}-${clase.materia}`}>
                        <td>
                          <div className="cell-with-icon">
                            <Clock size={14} color="#8b94a8" />
                            {clase.horario}
                          </div>
                        </td>
                        <td>
                          <div className="cell-with-icon">
                            <BookOpen size={14} color="#8b94a8" />
                            {clase.materia}
                          </div>
                        </td>
                        <td>{clase.grupo}</td>
                        <td>
                          <div className="cell-with-icon">
                            <MapPin size={14} color="#8b94a8" />
                            {clase.aula}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${clase.statusClass}`}>
                            {clase.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="notices-panel">
              <div className="panel-header">
                <div className="panel-title">
                  <Bell size={16} color="#3b82f6" />
                  <h3>Avisos</h3>
                </div>
              </div>

              <div className="notices-list">
                {avisos.map((aviso) => (
                  <div
                    key={aviso.texto}
                    className="notice-item"
                    style={{
                      borderLeftColor: aviso.color,
                      backgroundColor: aviso.bg,
                    }}
                  >
                    <p>{aviso.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <button type="button" className="help-fab" aria-label="Ayuda">
        <CircleHelp size={18} />
      </button>
    </div>
  );
}

export default DashboardDocente;
