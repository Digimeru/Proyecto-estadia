import { Bell, Search } from "lucide-react";

export function AdminTopBar({ pageTitle }: { pageTitle: string }) {
  return (
    <header
      style={{
        position: "relative",
        height: "var(--topbar-height, 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "white",
        borderBottom: "1px solid #e8eaf0",
        boxShadow: "0 1px 0 rgba(26,39,68,0.05)",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
        <span style={{ color: "#b0bad0", fontSize: "0.82rem" }}>DocenSys</span>
        <span style={{ color: "#d0d5e0", fontSize: "0.82rem" }}>/</span>
        <span style={{ color: "#a855f7", fontSize: "0.82rem", fontWeight: 600 }}>Administrador</span>
        <span style={{ color: "#d0d5e0", fontSize: "0.82rem" }}>/</span>
        <span style={{ color: "#1a2744", fontSize: "0.82rem", fontWeight: 600 }}>{pageTitle}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", backgroundColor: "#f3f5f9", width: "200px", boxSizing: "border-box" }}>
          <Search size={13} color="#8b94a8" />
          <input placeholder="Buscar..." style={{ background: "transparent", border: "none", outline: "none", fontSize: "0.8rem", color: "#1a2744", width: "100%", minWidth: 0 }} />
        </div>
        <button type="button" style={{ position: "relative", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px", backgroundColor: "#f3f5f9", border: "none", cursor: "pointer" }}>
          <Bell size={16} color="#5a6a8a" />
          <span style={{ position: "absolute", top: "6px", right: "6px", width: "8px", height: "8px", borderRadius: "999px", backgroundColor: "#ef4444", border: "1.5px solid white" }} />
        </button>
        <div style={{ width: "1px", height: "24px", backgroundColor: "#e8eaf0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#a855f7,#7c3aed)" }}>
            <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}>RL</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#1a2744", fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.2 }}>Roberto Leal</p>
            <p style={{ color: "#a855f7", fontSize: "0.68rem", fontWeight: 600 }}>Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
}