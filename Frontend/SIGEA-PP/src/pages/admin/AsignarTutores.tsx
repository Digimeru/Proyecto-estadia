import { useState } from "react";
import { UserCheck, Plus, Search, ChevronDown, Trash2 } from "lucide-react";

const docentes = ["María García", "Carlos Mendoza", "Ana Fuentes", "Jorge Ramírez", "Sofía Torres", "Héctor Vega"];
const grupos = ["1°A", "1°B", "1°C", "2°A", "2°B", "3°A", "3°B", "4°A", "4°B"];

const initialAsignaciones = [
  { id: 1, docente: "María García",   grupo: "3°A", desde: "Ago 2025" },
  { id: 2, docente: "Carlos Mendoza", grupo: "4°A", desde: "Ago 2025" },
  { id: 3, docente: "Sofía Torres",   grupo: "1°A", desde: "Feb 2026" },
];

function SimpleSelect({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid", textAlign: "left", backgroundColor: "white", borderColor: open ? "#a855f7" : "#dde1ec", color: value ? "#1a2744" : "#8b94a8", fontSize: "0.82rem", cursor: "pointer", boxSizing: "border-box" }}
      >
        <span style={{ flex: 1 }}>{value || placeholder}</span>
        <ChevronDown size={13} color="#8b94a8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "4px", borderRadius: "12px", overflow: "hidden", zIndex: 20, backgroundColor: "white", boxShadow: "0 8px 24px rgba(26,39,68,0.14)", border: "1px solid #e0e4ee" }}>
            {options.map((o) => (
              <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }} style={{ width: "100%", textAlign: "left", padding: "10px 16px", fontSize: "0.82rem", color: o === value ? "#a855f7" : "#1a2744", backgroundColor: o === value ? "#faf5ff" : "transparent", fontWeight: o === value ? 600 : 400, border: "none", cursor: "pointer", boxSizing: "border-box" }}>{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function AsignarTutores() {
  const [asignaciones, setAsignaciones] = useState(initialAsignaciones);
  const [newDoc, setNewDoc] = useState("");
  const [newGrupo, setNewGrupo] = useState("");
  const [search, setSearch] = useState("");

  const add = () => {
    if (!newDoc || !newGrupo) return;
    setAsignaciones((prev) => [...prev, { id: Date.now(), docente: newDoc, grupo: newGrupo, desde: "Jun 2026" }]);
    setNewDoc(""); setNewGrupo("");
  };

  const remove = (id: number) => setAsignaciones((prev) => prev.filter((a) => a.id !== id));
  const filtered = asignaciones.filter((a) => a.docente.toLowerCase().includes(search.toLowerCase()) || a.grupo.includes(search));

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#1a2744" }}>Asignar Tutores</h2>
        <p style={{ color: "#8b94a8", fontSize: "0.875rem" }}>Vincula a cada docente con su grupo tutorado</p>
      </div>

      <div style={{ borderRadius: "12px", padding: "20px", marginBottom: "20px", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)" }}>
        <p style={{ color: "#1a2744", fontSize: "0.88rem", fontWeight: 600, marginBottom: 12 }}>Nueva asignación</p>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <SimpleSelect value={newDoc} onChange={setNewDoc} options={docentes} placeholder="Seleccionar docente" />
          <SimpleSelect value={newGrupo} onChange={setNewGrupo} options={grupos} placeholder="Grupo" />
          <button onClick={add} type="button" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "12px", flexShrink: 0, backgroundColor: "#a855f7", color: "white", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(168,85,247,0.3)" }}><Plus size={15} /> Asignar</button>
        </div>
      </div>

      <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f0f2f7" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <UserCheck size={15} color="#a855f7" />
            <h3 style={{ color: "#1a2744", fontSize: "0.9rem" }}>Tutores asignados ({filtered.length})</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", border: "1px solid #dde1ec", minWidth: "200px", boxSizing: "border-box" }}>
            <Search size={13} color="#8b94a8" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar…" style={{ border: "none", outline: "none", fontSize: "0.8rem", color: "#1a2744", background: "transparent", width: "100%", minWidth: 0 }} />
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fb" }}>
              {["Docente tutor", "Grupo asignado", "Desde", "Acción"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ borderTop: "1px solid #f0f2f7" }}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#a855f7,#7c3aed)" }}>
                      <span style={{ color: "white", fontSize: "0.68rem", fontWeight: 700 }}>{a.docente.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <span style={{ color: "#1a2744", fontSize: "0.85rem", fontWeight: 500 }}>{a.docente}</span>
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}><span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "999px", backgroundColor: "#faf5ff", color: "#a855f7", fontSize: "0.75rem", fontWeight: 600 }}>{a.grupo}</span></td>
                <td style={{ padding: "14px 20px" }}><span style={{ color: "#8b94a8", fontSize: "0.82rem" }}>{a.desde}</span></td>
                <td style={{ padding: "14px 20px" }}>
                  <button onClick={() => remove(a.id)} type="button" style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "10px", backgroundColor: "#fef2f2", color: "#ef4444", fontSize: "0.75rem", border: "1px solid #fee2e2", cursor: "pointer" }}><Trash2 size={13} /> Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}