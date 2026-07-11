import { useMemo, useState } from "react";
import {
  Plus,
  Filter,
  Search,
  Download,
  Save,
  ChevronDown,
  Calendar,
} from "lucide-react";
import "./DashboardDocente.css";
import { alumnos } from "./docenteData";

type AttendanceStatus = "asistencia" | "falta" | "justificado" | null;

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
        <ChevronDown size={14} color="#8b94a8" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <>
          <div
            className="select-overlay"
            onClick={() => setOpen(false)}
          />
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

function ControlAsistencias() {
  const groups = [
    "Todos los grupos",
    "Grupo A",
    "Grupo B",
    "Grupo C",
    "Grupo D",
    "Grupo E",
    "Grupo F",
  ];
  const materias = [
    "Todas las materias",
    "Matemáticas",
    "Historia",
    "Ciencias",
    "Inglés",
    "Química",
    "Física",
    "Español",
    "Educación Física",
  ];
  const dateOptions = ["Hoy", "Esta semana", "Este mes", "Personalizada"];

  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [selectedMateria, setSelectedMateria] = useState(materias[0]);
  const [selectedDateOption, setSelectedDateOption] = useState(dateOptions[0]);
  const [customDate, setCustomDate] = useState("");

  const filteredAlumnos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return alumnos.filter((a) => {
      const matchesQuery =
        a.nombre.toLowerCase().includes(query) ||
        a.matricula.toLowerCase().includes(query);
      const matchesGroup =
        selectedGroup === groups[0] || a.grupo === selectedGroup;
      const matchesMateria =
        selectedMateria === materias[0] || a.materia === selectedMateria;
      return matchesQuery && matchesGroup && matchesMateria;
    });
  }, [searchQuery, selectedGroup, selectedMateria]);

  const counts = useMemo(() => {
    const values = Object.values(attendance);
    return {
      asistencia: values.filter((v) => v === "asistencia").length,
      falta: values.filter((v) => v === "falta").length,
      justificado: values.filter((v) => v === "justificado").length,
      registrados: values.filter((v) => v !== null).length,
    };
  }, [attendance]);

  const handleSelect = (alumnoId: number, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [alumnoId]: prev[alumnoId] === status ? null : status,
    }));
  };

  return (
    <div className="page-content">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Control de Asistencias</h2>
          <p>Registra la asistencia diaria de tus alumnos</p>
        </div>
      </div>

      <div className="filter-card">
        <div className="filter-row">
          <div className="filter-label">
            <Filter size={14} color="#8b94a8" />
            <span>Filtrar por:</span>
          </div>

          <FilterSelect
            value={selectedGroup}
            options={groups}
            onChange={setSelectedGroup}
            ariaLabel="Seleccionar grupo"
          />

          <FilterSelect
            value={selectedMateria}
            options={materias}
            onChange={setSelectedMateria}
            ariaLabel="Seleccionar materia"
          />

          <FilterSelect
            value={selectedDateOption}
            options={dateOptions}
            onChange={setSelectedDateOption}
            icon={<Calendar size={14} color="#8b94a8" />}
            ariaLabel="Seleccionar fecha"
          />

          <div className="filter-search">
            <Search size={14} color="#8b94a8" />
            <input
              type="text"
              placeholder="Buscar alumno..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {selectedDateOption === "Personalizada" && (
          <div className="custom-date-row">
            <label htmlFor="customDate">Selecciona la fecha que quieras</label>
            <input
              id="customDate"
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="attendance-summary">
        <div className="summary-pill summary-pill--green">
          <span className="summary-count">{counts.asistencia}</span>
          Asistencia
        </div>
        <div className="summary-pill summary-pill--red">
          <span className="summary-count">{counts.falta}</span>
          Falta
        </div>
        <div className="summary-pill summary-pill--yellow">
          <span className="summary-count">{counts.justificado}</span>
          Justificado
        </div>
        <span className="summary-pending">
          Sin registrar: {alumnos.length - counts.registrados}
        </span>
      </div>

      <div className="data-panel">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Alumno</th>
                <th>Matrícula</th>
                <th>Asistencia</th>
                <th>Falta</th>
                <th>Justificado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno, index) => (
                <tr key={alumno.id}>
                  <td className="cell-number">{String(index + 1).padStart(2, "0")}</td>
                  <td>
                    <div className="student-cell">
                      <div className="student-avatar">{alumno.iniciales}</div>
                      <span>{alumno.nombre}</span>
                    </div>
                  </td>
                  <td className="cell-muted">{alumno.matricula}</td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-circle attendance-circle--green${
                        attendance[alumno.id] === "asistencia" ? " selected" : ""
                      }`}
                      onClick={() => handleSelect(alumno.id, "asistencia")}
                      aria-label={`Asistencia de ${alumno.nombre}`}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-circle attendance-circle--red${
                        attendance[alumno.id] === "falta" ? " selected" : ""
                      }`}
                      onClick={() => handleSelect(alumno.id, "falta")}
                      aria-label={`Falta de ${alumno.nombre}`}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-circle attendance-circle--yellow${
                        attendance[alumno.id] === "justificado" ? " selected" : ""
                      }`}
                      onClick={() => handleSelect(alumno.id, "justificado")}
                      aria-label={`Justificado de ${alumno.nombre}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
          <span className="footer-info">
            {alumnos.length} alumnos · {counts.registrados} registrados
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

export default ControlAsistencias;
