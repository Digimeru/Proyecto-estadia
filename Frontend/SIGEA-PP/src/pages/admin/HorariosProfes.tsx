import { useState } from "react";
import { ChevronDown, Calendar, Clock, BookOpen, Users, MapPin } from "lucide-react";

const profes = [
  { nomina: "D-00142", nombre: "María García Reyes", horario: [ { dia: "Lunes", hora: "07:00–08:30", materia: "Matemáticas III", grupo: "3°A", aula: "B-204" }, { dia: "Lunes", hora: "09:00–10:30", materia: "Álgebra Lineal", grupo: "2°B", aula: "A-101" }, { dia: "Martes", hora: "11:00–12:30", materia: "Cálculo Diferencial", grupo: "1°C", aula: "C-305" }, { dia: "Miércoles", hora: "07:00–08:30", materia: "Matemáticas III", grupo: "3°A", aula: "B-204" }, { dia: "Jueves", hora: "09:00–10:30", materia: "Álgebra Lineal", grupo: "2°B", aula: "A-101" }, { dia: "Viernes", hora: "14:00–15:30", materia: "Estadística", grupo: "4°A", aula: "B-102" } ] },
  { nomina: "D-00156", nombre: "Carlos Mendoza López", horario: [ { dia: "Lunes", hora: "11:00–12:30", materia: "Física I", grupo: "4°A", aula: "A-101" }, { dia: "Martes", hora: "07:00–08:30", materia: "Física I", grupo: "4°A", aula: "A-101" }, { dia: "Miércoles", hora: "14:00–15:30", materia: "Física II", grupo: "3°B", aula: "B-201" }, { dia: "Jueves", hora: "11:00–12:30", materia: "Laboratorio de Física", grupo: "4°A", aula: "Lab-1" }, { dia: "Viernes", hora: "09:00–10:30", materia: "Física II", grupo: "3°B", aula: "B-201" } ] },
  { nomina: "D-00178", nombre: "Ana Fuentes Villanueva", horario: [ { dia: "Lunes", hora: "14:00–15:30", materia: "Química Orgánica", grupo: "1°C", aula: "C-305" }, { dia: "Martes", hora: "09:00–10:30", materia: "Química General", grupo: "1°A", aula: "C-101" }, { dia: "Miércoles", hora: "11:00–12:30", materia: "Laboratorio Química", grupo: "1°C", aula: "Lab-2" }, { dia: "Jueves", hora: "07:00–08:30", materia: "Química General", grupo: "1°A", aula: "C-101" }, { dia: "Viernes", hora: "14:00–15:30", materia: "Química Orgánica", grupo: "1°C", aula: "C-305" } ] },
  { nomina: "D-00201", nombre: "Jorge Ramírez Ortega", horario: [ { dia: "Lunes", hora: "09:00–10:30", materia: "Historia de México", grupo: "2°B", aula: "B-201" }, { dia: "Martes", hora: "14:00–15:30", materia: "Historia Universal", grupo: "3°A", aula: "A-203" }, { dia: "Miércoles", hora: "09:00–10:30", materia: "Historia de México", grupo: "2°B", aula: "B-201" }, { dia: "Jueves", hora: "14:00–15:30", materia: "Historia Universal", grupo: "3°A", aula: "A-203" } ] },
  { nomina: "D-00215", nombre: "Sofía Torres Castillo", horario: [ { dia: "Lunes", hora: "07:00–08:30", materia: "Español I", grupo: "1°A", aula: "A-203" }, { dia: "Martes", hora: "11:00–12:30", materia: "Español II", grupo: "2°A", aula: "A-203" }, { dia: "Miércoles", hora: "07:00–08:30", materia: "Español I", grupo: "1°A", aula: "A-203" }, { dia: "Jueves", hora: "11:00–12:30", materia: "Literatura", grupo: "3°B", aula: "B-201" }, { dia: "Viernes", hora: "07:00–08:30", materia: "Español II", grupo: "2°A", aula: "A-203" } ] },
  { nomina: "D-00233", nombre: "Héctor Vega Sandoval", horario: [ { dia: "Lunes", hora: "11:00–12:30", materia: "Inglés B1", grupo: "4°B", aula: "B-102" }, { dia: "Martes", hora: "09:00–10:30", materia: "Inglés A2", grupo: "2°C", aula: "B-102" }, { dia: "Miércoles", hora: "11:00–12:30", materia: "Inglés B1", grupo: "4°B", aula: "B-102" }, { dia: "Jueves", hora: "09:00–10:30", materia: "Inglés A2", grupo: "2°C", aula: "B-102" }, { dia: "Viernes", hora: "11:00–12:30", materia: "Inglés B2", grupo: "4°A", aula: "B-102" } ] }
];

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const horas = ["07:00–08:30", "09:00–10:30", "11:00–12:30", "14:00–15:30"];
const diaColors = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ef4444"];
const diaBgs    = ["#eff6ff", "#ecfdf5", "#fffbeb", "#faf5ff", "#fef2f2"];

export function HorariosProfes() {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState(false);
  const profe = profes.find((p) => p.nomina === selected) ?? null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ color: "#1a2744" }}>Horarios de Docentes</h2>
          <p style={{ color: "#8b94a8", fontSize: "0.875rem" }}>Ciclo 2025-B — selecciona un docente para ver su horario</p>
        </div>
      </div>

      <div style={{ borderRadius: "12px", padding: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "16px", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <Calendar size={15} color="#a855f7" />
          <span style={{ color: "#4a5a7a", fontSize: "0.82rem", fontWeight: 600 }}>Filtrar docente:</span>
        </div>

        <div style={{ position: "relative", minWidth: "280px" }}>
          <button onClick={() => setOpen((o) => !o)} type="button" style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "10px 16px", borderRadius: "12px", border: "1px solid", textAlign: "left", backgroundColor: "white", borderColor: open ? "#a855f7" : "#dde1ec", color: selected ? "#1a2744" : "#8b94a8", fontSize: "0.85rem", cursor: "pointer", boxSizing: "border-box" }}>
            {selected ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "linear-gradient(135deg,#a855f7,#7c3aed)" }}>
                  <span style={{ color: "white", fontSize: "0.65rem", fontWeight: 700 }}>{profe!.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: "#1a2744", fontSize: "0.83rem", fontWeight: 600 }}>{profe!.nombre}</p>
                  <p style={{ color: "#8b94a8", fontSize: "0.68rem" }}>{profe!.nomina}</p>
                </div>
              </div>
            ) : ( <span style={{ flex: 1 }}>Seleccionar docente…</span> )}
            <ChevronDown size={14} color="#8b94a8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>

          {open && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 10 }} onClick={() => setOpen(false)} />
              <div style={{ position: "absolute", top: "100%", left: 0, right: 0, marginTop: "6px", borderRadius: "12px", overflow: "hidden", zIndex: 20, backgroundColor: "white", boxShadow: "0 10px 36px rgba(26,39,68,0.15)", border: "1px solid #e0e4ee" }}>
                {profes.map((p) => (
                  <button key={p.nomina} type="button" onClick={() => { setSelected(p.nomina); setOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", textAlign: "left", backgroundColor: p.nomina === selected ? "#faf5ff" : "transparent", border: "none", cursor: "pointer", borderBottom: "1px solid #f0f2f7", boxSizing: "border-box" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: p.nomina === selected ? "linear-gradient(135deg,#a855f7,#7c3aed)" : "#f3f5f9" }}>
                      <span style={{ color: p.nomina === selected ? "white" : "#4a5a7a", fontSize: "0.68rem", fontWeight: 700 }}>{p.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ color: p.nomina === selected ? "#a855f7" : "#1a2744", fontSize: "0.83rem", fontWeight: p.nomina === selected ? 600 : 500 }}>{p.nombre}</p>
                      <p style={{ color: "#b0bad0", fontSize: "0.68rem" }}>{p.nomina} · {p.horario.length} clases/semana</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {selected && (
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "8px", flexWrap: "wrap" }}>
            <div style={{ width: "1px", height: "32px", backgroundColor: "#e8eaf0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><BookOpen size={13} color="#a855f7" /><span><strong style={{ color: "#1a2744" }}>{[...new Set(profe!.horario.map((h) => h.materia))].length}</strong> materias</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Users size={13} color="#3b82f6" /><span><strong style={{ color: "#1a2744" }}>{[...new Set(profe!.horario.map((h) => h.grupo))].length}</strong> grupos</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={13} color="#10b981" /><span><strong style={{ color: "#1a2744" }}>{profe!.horario.length}</strong> clases/sem.</span></div>
            </div>
          </div>
        )}
      </div>

      {!selected && (
        <div style={{ borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)", border: "2px dashed #e0e4ee" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", backgroundColor: "#faf5ff" }}><Calendar size={30} color="#a855f7" /></div>
          <p style={{ color: "#1a2744", fontSize: "0.95rem", fontWeight: 600 }}>Selecciona un docente</p>
        </div>
      )}

      {profe && (
        <>
          <div style={{ borderRadius: "12px", padding: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)", borderLeft: "4px solid #a855f7" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "linear-gradient(135deg,#a855f7,#7c3aed)" }}>
              <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 700 }}>{profe.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}</span>
            </div>
            <div>
              <p style={{ color: "#1a2744", fontSize: "1rem", fontWeight: 700 }}>{profe.nombre}</p>
              <p style={{ color: "#8b94a8", fontSize: "0.78rem" }}>Nómina: {profe.nomina}</p>
            </div>
          </div>

          <div style={{ borderRadius: "12px", overflow: "hidden", backgroundColor: "white", boxShadow: "0 1px 8px rgba(26,39,68,0.07)" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "680px", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fb" }}>
                    <th style={{ textAlign: "left", padding: "12px 20px", color: "#8b94a8", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", width: "130px" }}>Horario</th>
                    {dias.map((d, i) => (
                      <th key={d} style={{ padding: "12px 16px", textAlign: "center", color: diaColors[i], fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horas.map((hora) => (
                    <tr key={hora} style={{ borderTop: "1px solid #f0f2f7" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={12} color="#c5cdd8" /><span style={{ color: "#4a5a7a", fontSize: "0.78rem", fontWeight: 600 }}>{hora}</span></div>
                      </td>
                      {dias.map((dia, di) => {
                        const clase = profe.horario.find((c) => c.dia === dia && c.hora === hora);
                        return (
                          <td key={dia} style={{ padding: "12px 12px", textAlign: "center" }}>
                            {clase ? (
                              <div style={{ borderRadius: "12px", padding: "10px 12px", textAlign: "left", backgroundColor: diaBgs[di], border: `1px solid ${diaColors[di]}22` }}>
                                <p style={{ color: diaColors[di], fontSize: "0.8rem", fontWeight: 700 }}>{clase.materia}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}><Users size={10} color="#8b94a8" /><span style={{ color: "#4a5a7a", fontSize: "0.68rem", fontWeight: 600 }}>{clase.grupo}</span></div>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}><MapPin size={10} color="#b0bad0" /><span style={{ color: "#b0bad0", fontSize: "0.65rem" }}>{clase.aula}</span></div>
                              </div>
                            ) : (
                              <div style={{ borderRadius: "12px", padding: "16px 12px", backgroundColor: "#f8f9fb" }}><span style={{ color: "#dde1ec", fontSize: "0.72rem" }}>Libre</span></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}