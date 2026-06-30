import "./Login.css";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="login-container">

      {/* Panel izquierdo */}
      <section className="left-panel">
  <div className="brand-content">

  <img
    src={logo}
    alt="DocenSys"
    className="logo"
  />

  <p className="brand-description">
    Sistema digital para el seguimiento y evaluación
    de actividades académicas por parciales.
  </p>

  <div className="features">

    <FeatureCard
      title="Control de Asistencias"
      description="Registra la asistencia de docentes por fecha y parcial."
    />

    <FeatureCard
      title="Registro de Calificaciones"
      description="Consulta y administra calificaciones de forma sencilla."
    />

    <FeatureCard
      title="Reportes Académicos"
      description="Genera reportes para el seguimiento académico."
    />

  </div>

</div>
</section>

      {/* Panel derecho */}
      <div className="right-panel">

        <div className="login-box">

          <h2>Iniciar sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
          />

          <input
            type="password"
            placeholder="Contraseña"
          />

          <button>
            Iniciar sesión
          </button>

          <div className="dev-buttons">
    <button onClick={() => navigate("/docente")}>
        Docente
    </button>

    <button onClick={() => navigate("/admin")}>
        Administrador
    </button>
</div>

        </div>

      </div>

    </div>
  );
}

export default Login;