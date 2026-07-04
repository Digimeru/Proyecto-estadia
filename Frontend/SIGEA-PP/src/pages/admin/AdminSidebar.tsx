import "./adminsidebar.css";
import { ClipboardList, UserCheck, Calendar, LayoutDashboard, GraduationCap, LogOut } from "lucide-react";

interface AdminSidebarProps {
	activeView: string;
	onNavigate: (v: string) => void;
	onLogout: () => void;
}

const navItems = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ id: "asistencia", label: "Lista asistencia profes", icon: ClipboardList },
	{ id: "tutores", label: "Asignar tutores", icon: UserCheck },
	{ id: "horarios", label: "Horarios profes", icon: Calendar },
];

export function AdminSidebar({ activeView, onNavigate, onLogout }: AdminSidebarProps) {
	return (
		<aside className="admin-sidebar">
			<div className="admin-sidebar__header">
				<div className="admin-sidebar__logo-badge">
					<GraduationCap size={19} color="white" strokeWidth={2} />
				</div>
				<div className="admin-sidebar__brand">
					<p className="admin-sidebar__brand-title">DocenSys</p>
					<p className="admin-sidebar__brand-subtitle">Administrador</p>
				</div>
			</div>

			<div className="admin-sidebar__section-label-wrap">
				<p className="admin-sidebar__section-label">Gestión institucional</p>
			</div>

			<nav className="admin-sidebar__nav">
				{navItems.map(({ id, label, icon: Icon }) => {
					const active = activeView === id;

					return (
						<button
							key={id}
							type="button"
							onClick={() => onNavigate(id)}
							className={`admin-sidebar__nav-button${active ? " is-active" : ""}`}
						>
							{active && <div className="admin-sidebar__active-bar" />}
							<Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
							<span className="admin-sidebar__nav-label">{label}</span>
							{active && <div className="admin-sidebar__active-dot" />}
						</button>
					);
				})}
			</nav>

			<div className="admin-sidebar__footer">
				<div className="admin-sidebar__profile">
					<div className="admin-sidebar__avatar">
						<span className="admin-sidebar__avatar-text">RL</span>
					</div>
					<div className="admin-sidebar__profile-text">
						<p className="admin-sidebar__profile-name">Roberto Leal</p>
						<p className="admin-sidebar__profile-role">Administrador</p>
					</div>
				</div>

				<div className="admin-sidebar__logout-wrap">
					<button type="button" onClick={onLogout} className="admin-sidebar__logout-button">
						<LogOut size={16} strokeWidth={2} />
						Cerrar Sesión
					</button>
				</div>
			</div>
		</aside>
	);
}
