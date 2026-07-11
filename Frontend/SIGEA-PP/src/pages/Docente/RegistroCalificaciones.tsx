import { useMemo, useState } from "react";
import {
  Plus,
  Settings,
  ChevronDown,
  TrendingUp,
  Download,
  Save,
  Trash2,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { alumnos, calificacionesIniciales, calcularFinal } from "./docenteData";

type Parcial = "1P" | "2P" | "3P";

type RubricaItem = {
  id: string;
  label: string;
  value: number;
};

type Calificacion = Record<string, number>;

type FilterSelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  ariaLabel: string;
};

function FilterSelect({ value, options, onChange, icon, ariaLabel }: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter-select" style={{ position: "relative" }}>
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((current) => !current)}
        className="filter-select-button"
      >
        {icon}
        <span>{value}</span>
        <ChevronDown
          size={14}
          color="#8b94a8"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        />
      </button>
      {open && (
        <>
          <div className="select-overlay" onClick={() => setOpen(false)} />
          <div className="select-dropdown">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`select-dropdown-item${option === value ? " selected" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
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
  const groupOptions = [
    "Grupo A",
    "Grupo B",
    "Grupo C",
    "Grupo D",
    "Grupo E",
  ];
  const [selectedGroup, setSelectedGroup] = useState(groupOptions[0]);
  const [parcialActivo, setParcialActivo] = useState<Parcial>("1P");
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>(
    calificacionesIniciales.map((c) => ({ ...c }))
  );
  const [rubrica, setRubrica] = useState<RubricaItem[]>(rubricaInicial);
  const [showRubrica, setShowRubrica] = useState(true);
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [labelDraft, setLabelDraft] = useState("");

  const totalPorcentaje = useMemo(
    () => rubrica.reduce((acc, item) => acc + item.value, 0),
    [rubrica]
  );

  const updatePorcentaje = (id: string, value: number) => {
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

  const addNewActivity = () => {
    const nextId = `actividad-${Date.now()}`;
    setRubrica((prev) => [
      ...prev,
      { id: nextId, label: "Nueva actividad", value: 0 },
    ]);
    setCalificaciones((prev) =>
      prev.map((row) => ({ ...row, [nextId]: 0 }))
    );
  };

  const removeRubricaItem = (id: string) => {
    setRubrica((prev) => prev.filter((item) => item.id !== id));
    setCalificaciones((prev) =>
      prev.map((row) => {
        const nextRow = { ...row };
        delete nextRow[id];
        return nextRow;
      })
    );
    if (editingLabelId === id) {
      setEditingLabelId(null);
      setLabelDraft("");
    }
  };

  const startEditingLabel = (id: string, label: string) => {
    setEditingLabelId(id);
    setLabelDraft(label);
  };

  const saveLabel = (id: string) => {
    setRubrica((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, label: labelDraft || item.label } : item
      )
    );
    setEditingLabelId(null);
  };

  const cancelLabelEdit = () => {
    setEditingLabelId(null);
    setLabelDraft("");
  };

  const promedioParcial = useMemo(() => {
    const finales = calificaciones.map((c) => calcularFinal(c, rubrica));
    const suma = finales.reduce((acc, v) => acc + v, 0);
    return (suma / finales.length).toFixed(1);
  }, [calificaciones, rubrica]);

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
          <FilterSelect
            value={selectedGroup}
            options={groupOptions}
            onChange={setSelectedGroup}
            ariaLabel="Seleccionar grupo"
          />
          <button
            type="button"
            className="btn-outline"
            onClick={() => setShowRubrica((prev) => !prev)}
          >
            <Settings size={16} />
            {showRubrica ? "Ocultar rúbrica" : "Definir rúbrica y porcentajes"}
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={addNewActivity}
          >
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
                <div className="rubric-label-row">
                  <button
                    type="button"
                    className="rubric-icon-btn"
                    onClick={() => removeRubricaItem(item.id)}
                    aria-label={`Eliminar ${item.label}`}
                  >
                    <Trash2 size={16} />
                  </button>
                  {editingLabelId === item.id ? (
                    <div className="rubric-label-edit-group">
                      <input
                        type="text"
                        className="rubric-label-input"
                        value={labelDraft}
                        onChange={(e) => setLabelDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveLabel(item.id);
                          if (e.key === "Escape") cancelLabelEdit();
                        }}
                      />
                      <button
                        type="button"
                        className="rubric-icon-btn"
                        onClick={() => saveLabel(item.id)}
                        aria-label="Guardar nombre"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        className="rubric-icon-btn"
                        onClick={cancelLabelEdit}
                        aria-label="Cancelar edición"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="rubric-label-text">{item.label}</span>
                      <button
                        type="button"
                        className="rubric-icon-btn"
                        onClick={() => startEditingLabel(item.id, item.label)}
                        aria-label={`Editar ${item.label}`}
                      >
                        <Edit3 size={16} />
                      </button>
                    </>
                  )}
                </div>
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
                {rubrica.map((item) => (
                  <th key={item.id}>
                    {item.label} {item.value}%
                  </th>
                ))}
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => {
                const cal = calificaciones[index];
                const final = calcularFinal(cal, rubrica);

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
                    {rubrica.map((item) => (
                  <td key={item.id}>
                    <input
                      type="number"
                      className="grade-input"
                      min={0}
                      max={10}
                      value={cal[item.id] ?? 0}
                      onChange={(e) =>
                        updateCalificacion(index, item.id, Number(e.target.value))
                      }
                    />
                  </td>
                ))}
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
            <button type="button" className="btn-outline">
              <Download size={16} />
              Exportar
            </button>
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
