import "./Login.css";

function Login() {
  return (
    <div className="login-container">

      {/* Panel izquierdo */}
      <div className="left-panel">

        <div className="logo-section">
          <h1>DocenSys</h1>
          <p>Sistema de Gestión Académica</p>
        </div>

        <div className="features">
          <div className="feature-card">
            Control de Asistencias
          </div>

          <div className="feature-card">
            Registro de Calificaciones
          </div>

          <div className="feature-card">
            Reportes Institucionales
          </div>
        </div>

      </div>

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

        </div>

      </div>

    </div>
  );
}

export default Login;