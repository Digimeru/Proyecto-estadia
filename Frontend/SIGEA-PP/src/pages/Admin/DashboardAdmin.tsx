import "./DashboardAdmin.css";
import { 
  Users, BookOpen, TrendingUp, AlertCircle, Clock, 
  GraduationCap, CheckCircle, BarChart2, LogOut, Search, Bell 
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const kpis = [
  { label: "Docentes activos",     value: "42",  delta: "+3 este mes",       icon: Users,         color: "#a855f7", bg: "#faf5ff" },
  { label: "Alumnos inscritos",    value: "1,284", delta: "+56 este ciclo",     icon: GraduationCap,  color: "#3b82f6", bg: "#eff6ff" },
  { label: "Asistencia promedio",  value: "89%",  delta: "↑ 2% vs sem. ant.",  icon: TrendingUp,     color: "#10b981", bg: "#ecfdf5" },
  { label: "Grupos activos",       value: "28",   delta: "7 turnos",           icon: BookOpen,       color: "#f59e0b", bg: "#fffbeb" },
  { label: "Materias impartidas",  value: "34",   delta: "Ciclo 2025-B",       icon: CheckCircle,    color: "#06b6d4", bg: "#ecfeff" },
  { label: "Incidencias activas",  value: "7",    delta: "3 sin resolver",     icon: AlertCircle,    color: "#ef4444", bg: "#fef2f2" },
];

const asistMensual = [
  { mes: "Ene", docentes: 91, alumnos: 85 },
  { mes: "Feb", docentes: 94, alumnos: 88 },
  { mes: "Mar", docentes: 88, alumnos: 82 },
  { mes: "Abr", docentes: 96, alumnos: 91 },
  { mes: "May", docentes: 93, alumnos: 89 },
  { mes: "Jun", docentes: 89, alumnos: 87 },
];

const promediosPorGrupo = [
  { grupo: "1°A", promedio: 8.2 },
  { grupo: "1°C", promedio: 7.8 },
  { grupo: "2°B", promedio: 8.5 },
  { grupo: "3°A", promedio: 9.0 },
  { grupo: "4°A", promedio: 8.8 },
  { grupo: "4°B", promedio: 7.5 },
];

const actividadReciente = [
  { texto: "Sofía Torres registró asistencia — Grupo 1°A",   tiempo: "Hace 12 min",  color: "#10b981" },
  { texto: "Ana Fuentes marcada como Justificada hoy",       tiempo: "Hace 38 min",  color: "#f59e0b" },
  { texto: "Jorge Ramírez subió calificaciones — 2°B",       tiempo: "Hace 1 h",     color: "#3b82f6" },
  { texto: "Laura Ríos registró falta sin justificar",       tiempo: "Hace 2 h",     color: "#ef4444" },
  { texto: "Héctor Vega completó registro del 3er parcial",  tiempo: "Hace 3 h",     color: "#a855f7" },
];

function DashboardAdmin() {
  return (
    <div className="admin-container">
      
      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <aside className="sidebar">
        <div>
          {/* Logo Sección */}
          <div className="sidebar-logo">
            <h1>
              <span className="logo-badge">🎓</span>
              DocenSys
            </h1>
            <span>Administrador</span>
          </div>

          {/* Menú */}
          <nav className="sidebar-menu">
            <p className="menu-title">Gestión Institucional</p>
            
            <div className="menu-item active">
              <CheckCircle size={18} />
              <span>Dashboard</span>
            </div>

            {["Lista asistencia profes", "Asignar tutores", "Horarios profes"].map((item) => (
              <div key={item} className="menu-item">
                <BookOpen size={18} color="#4a5a7a" />
                <span>{item}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">RL</div>
            <div>
              <p style={{ margin: 0, color: "white", fontSize: "0.85rem", fontWeight: 600 }}>Roberto Leal</p>
              <p style={{ margin: 0, color: "#4a5a7a", fontSize: "0.72rem" }}>Administrador</p>
            </div>
          </div>
          <div className="logout-btn">
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </aside>

      {/* 2. ÁREA DE CONTENIDO */}
      <main className="main-content">
        
        {/* Barra Superior */}
        <header className="topbar">
          <div className="breadcrumbs">
            DocenSys <span style={{ margin: "0 4px" }}>/</span> <span className="current">Administrador</span> <span style={{ margin: "0 4px" }}>/</span> Dashboard
          </div>
          
          <div className="topbar-actions">
            <div className="search-container">
              <Search size={16} color="#8b94a8" className="search-icon" />
              <input type="text" placeholder="Buscar..." className="search-input" />
            </div>
            <div className="notification-bell">
              <Bell size={18} color="#4a5a7a" />
              <div className="bell-badge" />
            </div>
            <div className="topbar-avatar">RL</div>
          </div>
        </header>

        {/* Cuerpo del Dashboard */}
        <div className="dashboard-body">
          
          <div className="dashboard-header">
            <h2>Panel de Administración</h2>
            <p>Instituto Tecnológico del Valle — Ciclo 2025-B</p>
          </div>

          {/* Grid de KPIs */}
          <div className="kpi-grid">
            {kpis.map(({ label, value, delta, icon: Icon, color, bg }) => (
              <div key={label} className="kpi-card">
                <div className="kpi-icon-wrapper" style={{ backgroundColor: bg }}>
                  <Icon size={22} color={color} />
                </div>
                <div className="kpi-info">
                  <p>{label}</p>
                  <h4>{value}</h4>
                  <p>{delta}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fila de Gráficos */}
          <div className="charts-row">
            
            {/* Gráfico de Asistencia */}
            <div className="chart-card-large">
              <div className="chart-title-wrapper">
                <BarChart2 size={16} color="#a855f7" />
                <h3>Asistencia mensual (%)</h3>
              </div>
              <p className="chart-subtitle">Docentes vs Alumnos</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={asistMensual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                  <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#8b94a8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: "#8b94a8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e0e4ee", fontSize: 12 }}
                    formatter={(v: any, name: any) => [`${v}%`, name === "docentes" ? "Docentes" : "Alumnos"]} />
                  <Line type="monotone" dataKey="docentes" stroke="#a855f7" strokeWidth={2.5} dot={{ fill: "#a855f7", r: 4 }} />
                  <Line type="monotone" dataKey="alumnos"  stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: "#3b82f6", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de Promedios */}
            <div className="chart-card-small">
              <div className="chart-title-wrapper">
                <TrendingUp size={16} color="#10b981" />
                <h3>Promedio por grupo</h3>
              </div>
              <p className="chart-subtitle">Calificación final</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={promediosPorGrupo} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" vertical={false} />
                  <XAxis dataKey="grupo" tick={{ fontSize: 10, fill: "#8b94a8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#8b94a8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e0e4ee", fontSize: 12 }}
                    formatter={(v: any) => [v.toFixed(1), "Promedio"]} />
                  <Bar dataKey="promedio" fill="#a855f7" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actividad Reciente */}
          <div className="activity-panel">
            <div className="activity-header">
              <Clock size={16} color="#a855f7" />
              <h3>Actividad reciente</h3>
            </div>
            <div className="activity-list">
              {actividadReciente.map((a, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ backgroundColor: a.color }} />
                  <p className="activity-text">{a.texto}</p>
                  <span className="activity-time">{a.tiempo}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}

export default DashboardAdmin;