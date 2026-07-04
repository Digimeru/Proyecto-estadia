import { Search, Bell } from "lucide-react";

interface DocenteTopBarProps {
  pageTitle: string;
}

export function DocenteTopBar({ pageTitle }: DocenteTopBarProps) {
  return (
    <header className="topbar">
      <div className="breadcrumbs">
        DocenSys <span className="breadcrumb-sep">/</span>{" "}
        <span className="current">Docente</span>{" "}
        <span className="breadcrumb-sep">/</span> {pageTitle}
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
  );
}
