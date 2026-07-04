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
import { alumnos } from "./docenteData";

type AttendanceStatus = "asistencia" | "falta" | "justificado" | null;

function ControlAsistencias() {
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlumnos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return alumnos;
    return alumnos.filter(
      (a) =>
        a.nombre.toLowerCase().includes(query) ||
        a.matricula.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
        <button type="button" className="btn-primary">
          <Plus size={16} />
          Nueva Sesión
        </button>
      </div>

      <div className="filter-card">
        <div className="filter-row">
          <div className="filter-label">
            <Filter size={14} color="#8b94a8" />
            <span>Filtrar por:</span>
          </div>

          <div className="filter-select">
            <span>Todos los grupos</span>
            <ChevronDown size={14} color="#8b94a8" />
          </div>

          <div className="filter-select">
            <span>Todas las materias</span>
            <ChevronDown size={14} color="#8b94a8" />
          </div>

          <div className="filter-select filter-date">
            <Calendar size={14} color="#8b94a8" />
            <span>Hoy — 09/06/2026</span>
            <ChevronDown size={14} color="#8b94a8" />
          </div>

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
