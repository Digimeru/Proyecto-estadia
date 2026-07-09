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

type RubricaItem = {
  id: "tareas" | "examen" | "proyecto" | "actitud";
  label: string;
  value: number;
};

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

const rubricaInicial: RubricaItem[] = [
  { id: "tareas", label: "Tareas", value: 20 },
  { id: "examen", label: "Examen", value: 40 },
  { id: "proyecto", label: "Proyecto", value: 30 },
  { id: "actitud", label: "Actitud", value: 10 },
];

function RegistroCalificaciones() {
  const [parcialActivo, setParcialActivo] = useState<Parcial>("1P");
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(
    calificacionesIniciales.map((c) => ({ ...c }))
  );
  const [rubrica, setRubrica] = useState<RubricaItem[]>(rubricaInicial);
  const [showRubrica, setShowRubrica] = useState(true);

  const porcentajeMap = useMemo(
    () => ({
      tareas: rubrica.find((item) => item.id === "tareas")?.value ?? 20,
      examen: rubrica.find((item) => item.id === "examen")?.value ?? 40,
      proyecto: rubrica.find((item) => item.id === "proyecto")?.value ?? 30,
      actitud: rubrica.find((item) => item.id === "actitud")?.value ?? 10,
    }),
    [rubrica]
  );

  const totalPorcentaje = useMemo(
    () => rubrica.reduce((acc, item) => acc + item.value, 0),
    [rubrica]
  );

  const updatePorcentaje = (id: RubricaItem["id"], value: number) => {
    setRubrica((prev) => {
      const othersTotal = prev
        .filter((item) => item.id !== id)
        .reduce((acc, item) => acc + item.value, 0);
      const maxAllowed = Math.max(0, 100 - othersTotal);
      const nextValue = Math.min(maxAllowed, Math.max(0, value));
      return prev.map((item) =>
        item.id === id ? { ...item, value: nextValue } : item
      );
    });
  };

  const promedioParcial = useMemo(() => {
    const finales = calificaciones.map((c) =>
      calcularFinal(
        c.tareas,
        c.examen,
        c.proyecto,
        c.actitud,
        porcentajeMap.tareas,
        porcentajeMap.examen,
        porcentajeMap.proyecto,
        porcentajeMap.actitud
      )
    );
    const suma = finales.reduce((acc, v) => acc + v, 0);
    return (suma / finales.length).toFixed(1);
  }, [calificaciones, porcentajeMap]);

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
          <button
            type="button"
            className="btn-outline"
            onClick={() => setShowRubrica((prev) => !prev)}
          >
            <Settings size={16} />
            Definir rúbrica y porcentajes
          </button>
          <button type="button" className="btn-primary">
            <Plus size={16} />
            Nueva Actividad
          </button>
        </div>
      </div>

      {showRubrica && (
        <div className="rubric-card rubric-card--visible">
          <div className="rubric-header">
            <div className="rubric-title-group">
              <h3>Rúbrica de evaluación</h3>
              <p>Define los porcentajes de cada criterio para este parcial.</p>
            </div>
            <div
              className={`rubric-total${
                totalPorcentaje === 100 ? "" : " rubric-total--invalid"
              }`}
            >
              Total: {totalPorcentaje}%
            </div>
          </div>

          <div className="rubric-grid">
            {rubrica.map((item) => (
              <div key={item.id} className="rubric-row">
                <label htmlFor={`rubrica-${item.id}`} className="rubric-label">
                  {item.label}
                </label>
                <div className="rubric-field">
                  <input
                    id={`rubrica-${item.id}`}
                    type="number"
                    className="rubric-input"
                    min={0}
                    max={100}
                    value={item.value}
                    onChange={(e) =>
                      updatePorcentaje(item.id, Number(e.target.value))
                    }
                  />
                  <span className="rubric-percent">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="data-panel grades-panel grades-panel--with-rubric">
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
                <th>{rubrica[0].label} {porcentajeMap.tareas}%</th>
                <th>{rubrica[1].label} {porcentajeMap.examen}%</th>
                <th>{rubrica[2].label} {porcentajeMap.proyecto}%</th>
                <th>{rubrica[3].label} {porcentajeMap.actitud}%</th>
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
                  cal.actitud,
                  porcentajeMap.tareas,
                  porcentajeMap.examen,
                  porcentajeMap.proyecto,
                  porcentajeMap.actitud
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
