import { useMemo, useState } from "react";
import {
  Plus,
  Settings,
  ChevronDown,
  TrendingUp,
  Save,
} from "lucide-react";
import { alumnos, calificacionesIniciales, calcularFinal } from "./docenteData";

type Parcial = "1P" | "2P" | "3P";

interface Calificacion {
  tareas: number;
  examen: number;
  proyecto: number;
  actitud: number;
}

const parciales: { id: Parcial; label: string }[] = [
  { id: "1P", label: "1P — Primer Parcial" },
  { id: "2P", label: "2P — Segundo Parcial" },
  { id: "3P", label: "3P — Tercer Parcial" },
];

function RegistroCalificaciones() {
  const [parcialActivo, setParcialActivo] = useState<Parcial>("1P");
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(
    calificacionesIniciales.map((c) => ({ ...c }))
  );

  const promedioParcial = useMemo(() => {
    const finales = calificaciones.map((c) =>
      calcularFinal(c.tareas, c.examen, c.proyecto, c.actitud)
    );
    const suma = finales.reduce((acc, v) => acc + v, 0);
    return (suma / finales.length).toFixed(1);
  }, [calificaciones]);

  const updateCalificacion = (
    index: number,
    field: keyof Calificacion,
    value: number
  ) => {
    setCalificaciones((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, [field]: Math.min(10, Math.max(0, value)) } : c
      )
    );
  };

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Registro de Calificación</h2>
          <p>Álgebra Lineal — Grupo 3°A</p>
        </div>
        <div className="page-header-actions">
          <div className="filter-select">
            <span>Grupo: 3°A</span>
            <ChevronDown size={14} color="#8b94a8" />
          </div>
          <button type="button" className="btn-outline">
            <Settings size={16} />
            Definir rúbrica y porcentajes
          </button>
          <button type="button" className="btn-primary">
            <Plus size={16} />
            Nueva Actividad
          </button>
        </div>
      </div>

      <div className="data-panel grades-panel">
        <div className="grades-tabs-row">
          <div className="grades-tabs">
            {parciales.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`grades-tab${parcialActivo === p.id ? " active" : ""}`}
                onClick={() => setParcialActivo(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="grades-average">
            <TrendingUp size={14} color="#f59e0b" />
            <span>
              Promedio parcial: <strong>{promedioParcial}</strong>
            </span>
          </div>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table grades-table">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Asistencia</th>
                <th>Tareas 20%</th>
                <th>Examen 40%</th>
                <th>Proyecto 30%</th>
                <th>Actitud 10%</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => {
                const cal = calificaciones[index];
                const final = calcularFinal(
                  cal.tareas,
                  cal.examen,
                  cal.proyecto,
                  cal.actitud
                );

                return (
                  <tr key={alumno.id}>
                    <td>
                      <div className="student-cell">
                        <div className="student-avatar">{alumno.iniciales}</div>
                        <span>{alumno.nombre}</span>
                      </div>
                    </td>
                    <td>
                      <div className="attendance-mini-group">
                        <span className="attendance-mini attendance-mini--green">P</span>
                        <span className="attendance-mini attendance-mini--red">F</span>
                        <span className="attendance-mini attendance-mini--yellow">J</span>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="grade-input"
                        min={0}
                        max={10}
                        value={cal.tareas}
                        onChange={(e) =>
                          updateCalificacion(index, "tareas", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="grade-input"
                        min={0}
                        max={10}
                        value={cal.examen}
                        onChange={(e) =>
                          updateCalificacion(index, "examen", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="grade-input"
                        min={0}
                        max={10}
                        value={cal.proyecto}
                        onChange={(e) =>
                          updateCalificacion(index, "proyecto", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="grade-input"
                        min={0}
                        max={10}
                        value={cal.actitud}
                        onChange={(e) =>
                          updateCalificacion(index, "actitud", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <span className="grade-final">{final.toFixed(1)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
          <span className="footer-info">
            {alumnos.length} alumnos · Parcial {parcialActivo}
          </span>
          <div className="footer-actions">
            <button type="button" className="btn-primary">
              <Save size={16} />
              Guardar Registro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroCalificaciones;
