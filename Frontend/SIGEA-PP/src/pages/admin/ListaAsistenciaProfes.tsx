import { useState } from "react";
import { Search, ChevronDown, Save, Download } from "lucide-react";

const grupos  = ["Todos los grupos", "1°A", "1°C", "2°B", "2°C", "3°A", "3°B", "4°A", "4°B"];
const turnos  = ["Todos los turnos", "Matutino", "Vespertino"];
const fechas  = ["Hoy — 09/06/2026", "06/06/2026", "04/06/2026", "02/06/2026", "31/05/2026"];

const docentes = [
  { id: 1, nomina: "D-00142", nombre: "María García Reyes",      materia: "Matemáticas",      grupo: "3°A / 2°B", turno: "Matutino" },
  { id: 2, nomina: "D-00156", nombre: "Carlos Mendoza López",    materia: "Física",            grupo: "4°A",       turno: "Matutino" },
  { id: 3, nomina: "D-00178", nombre: "Ana Fuentes Villanueva",  materia: "Química",           grupo: "1°C",       turno: "Matutino" },
  { id: 4, nomina: "D-00201", nombre: "Jorge Ramírez Ortega",    materia: "Historia",          grupo: "2°B / 3°A", turno: "Matutino" },
  { id: 5, nomina: "D-00215", nombre: "Sofía Torres Castillo",   materia: "Español",           grupo: "1°A",       turno: "Matutino" },
  { id: 6, nomina: "D-00233", nombre: "Héctor Vega Sandoval",    materia: "Inglés",            grupo: "4°B",       turno: "Vespertino" },
  { id: 7, nomina: "D-00249", nombre: "Laura Ríos Herrera",      materia: "Informática",       grupo: "2°C",       turno: "Vespertino" },
  { id: 8, nomina: "D-00261", nombre: "Ernesto Salinas Mora",    materia: "Educación Física",  grupo: "Todos",     turno: "Matutino" },
];

type Estado = "asistencia" | "falta" | "justificado" | null;

const radioConf = [
  { value: "asistencia"  as Estado, label: "Asistencia",  short: "A", color: "#10b981" },
  { value: "falta"       as Estado, label: "Falta",       short: "F", color: "#ef4444" },
  { value: "justificado" as Estado, label: "Justificado", short: "J", color: "#f59e0b" },
];

function Dropdown({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen((o) => !o)} type="button"
        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", border: "1px solid", transition: "all 0.2s", backgroundColor: "white", borderColor: open ? "#a855f7" : "#dde1ec", color: value === options[0] ? "#8b94a8" : "#1a2744", fontSize: "0.82rem", minWidth: "175px", cursor: "pointer", boxShadow: open ? "0 0 0 3px rgba(168,85,247,0.12)" : "none", boxSizing: "border-box" }}
      >
        <span style={{ flex: 1, textAlign: "left" }}>{value}</span>
        <ChevronDown size={13} color="#8b94a8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "100%", left: 0, marginTop: "6px", borderRadius: "12px", overflow: "hidden", zIndex: 20, backgroundColor: "white", boxShadow: "0 8px 32px rgba(26,39,68,0.14)", border: "1px solid #e0e4ee", minWidth: "100%" }}>
            {options.map((opt) => (
              <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} type="button"
                style={{ width: "100%", display: "flex", alignItems: "center", gap: "8px", textAlign: "left", padding: "10px 16px", fontSize: "0.82rem", color: opt === value ? "#a855f7" : "#1a2744", backgroundColor: opt === value ? "#faf5ff" : "transparent", fontWeight: opt === value ? 600 : 400, border: "none", cursor: "pointer", boxSizing: "border-box" }}
                onMouseEnter={(e) => { if (opt !== value) (e.currentTarget as HTMLElement).style.backgroundColor = "#f8f9fb"; }}
                onMouseLeave={(e) => { if (opt !== value) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                {opt === value && <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#a855f7", flexShrink: 0 }} />}
                {opt !== value && <span style={{ width: 6, flexShrink: 0 }} />}
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ListaAsistenciaProfes() {
  const [grupoF,  setGrupoF]  = useState(grupos[0]);
  const [turnoF,  setTurnoF]  = useState(turnos[0]);
  const [fechaF,  setFechaF]  = useState(fechas[0]);
  const [search,  setSearch]  = useState("");
  const [estados, setEstados] = useState<Record<number, Estado>>({});
  const [saved,   setSaved]   = useState(false);

  const setEstado = (id: number, val: Estado) =>
    setEstados((prev) => ({ ...prev, [id]: prev[id] === val ? null : val }));

  const filtered = docentes.filter((d) => {
    const q = search.toLowerCase();
    return d.nombre.toLowerCase().includes(q) || d.nomina.toLowerCase().includes(q) || d.materia.toLowerCase().includes(q);
  });

  const counts = {
    asistencia:  Object.values(estados).filter((v) => v === "asistencia").length,
    falta:       Object.values(estados).filter((v) => v === "falta").length,
    justificado: Object.values(estados).filter((v) => v === "justificado").length,
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: "#1a2744" }}>Lista de Asistencia — Docentes</h2>
          <p style={{ color: "#8b94a8", fontSize: "0.875rem" }}>Registra la asistencia diaria del personal docente</p>
        </div>
        <button onClick={handleSave} type="button"
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "12px", backgroundColor: "#16a34a", color: "white", fontSize: "0.82rem", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.28)" }}>
          Guardar Registro
        </button>
      </div>

      <div style={{ borderRadius: "12px", padding: "16px", marginBottom: "16px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#4a5a7a", fontSize: "0.8rem", fontWeight: 600 }}>Filtrar por:</span>
        </div>
        <Dropdown value={grupoF}  onChange={setGrupoF}  options={grupos} />
        <Dropdown value={turnoF}  onChange={setTurnoF}  options={turnos} />
        <Dropdown value={fechaF}  onChange={setFechaF}  options={fechas} />
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", border: "1px solid #dde1ec", marginLeft: "auto", minWidth: "220px", boxSizing: "border-box" }}>
          <Search size={13} color="#8b94a8" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nómina o nombre…"
            style={{ border: "none", outline: "none", fontSize: "0.8rem", color: "#1a2744", background: "transparent", width: "100%", minWidth: 0 }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        {radioConf.map(({ value, label, color }) => (
          <div key={value as string} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "10px", backgroundColor: `${color}12`, border: `1px solid ${color}22` }}>
            <span style={{ color, fontSize: "0.95rem", fontWeight: 800 }}>{counts[value as "asistencia" | "falta" | "justificado"]}</span>
            <span style={{ color, fontSize: "0.78rem", fontWeight: 500 }}>{label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "10px", marginLeft: "auto", backgroundColor: "#f3f5f9" }}>
          <span style={{ color: "#8b94a8", fontSize: "0.78rem" }}>
            Sin registrar: <strong style={{ color: "#1a2744" }}>{filtered.length - counts.asistencia - counts.falta - counts.justificado}</strong>
          </span>
        </div>
      </div>

      <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fb" }}>
              <th style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>#</th>
              <th style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Docente</th>
              <th style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Nómina</th>
              <th style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>Materia / Grupo</th>
              {radioConf.map(({ value, label, color }) => (
                <th key={value as string} style={{ padding: "12px 20px", textAlign: "center", color, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc, i) => {
              const current = estados[doc.id] ?? null;
              return (
                <tr key={doc.id} style={{ borderTop: "1px solid #f0f2f7" }}>
                  <td style={{ padding: "14px 20px" }}><span style={{ color: "#c5cdd8", fontSize: "0.75rem" }}>{String(i + 1).padStart(2, "0")}</span></td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: current ? `${radioConf.find((r) => r.value === current)?.color}22` : "linear-gradient(135deg,#a855f7,#7c3aed)" }}>
                        <span style={{ color: current ? radioConf.find((r) => r.value === current)?.color : "white", fontSize: "0.68rem", fontWeight: 700 }}>
                          {doc.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                      <span style={{ color: "#1a2744", fontSize: "0.85rem", fontWeight: 500 }}>{doc.nombre}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px" }}><span style={{ display: "inline-block", padding: "4px 10px", borderRadius: "10px", backgroundColor: "#f3f5f9", color: "#4a5a7a", fontSize: "0.72rem", fontWeight: 700, fontFamily: "monospace" }}>{doc.nomina}</span></td>
                  <td style={{ padding: "14px 20px" }}>
                    <p style={{ color: "#1a2744", fontSize: "0.82rem", fontWeight: 500 }}>{doc.materia}</p>
                    <p style={{ color: "#8b94a8", fontSize: "0.72rem" }}>{doc.grupo}</p>
                  </td>
                  {radioConf.map(({ value, color }) => (
                    <td key={value as string} style={{ padding: "14px 20px", textAlign: "center" }}>
                      <button onClick={() => setEstado(doc.id, value)} type="button"
                        style={{ borderColor: color, backgroundColor: current === value ? color : "transparent", cursor: "pointer", transform: current === value ? "scale(1.1)" : "scale(1)" }}>
                        {current === value ? (
                          <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <span style={{ color, fontSize: "0.55rem", fontWeight: 700, opacity: 0.5 }}>{(value as string)[0].toUpperCase()}</span>
                        )}
                      </button>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0f2f7", backgroundColor: "#fafbfe" }}>
          <span style={{ color: "#8b94a8", fontSize: "0.78rem" }}>{filtered.length} docentes · {counts.asistencia + counts.falta + counts.justificado} registrados</span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "10px", border: "1px solid #dde1ec", color: "#4a5a7a", fontSize: "0.8rem", backgroundColor: "white", cursor: "pointer" }}><Download size={14} /> Exportar</button>
            <button onClick={handleSave} type="button" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "10px", backgroundColor: "#16a34a", color: "white", fontSize: "0.8rem", fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Save size={14} /> {saved ? "¡Guardado!" : "Guardar Registro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}