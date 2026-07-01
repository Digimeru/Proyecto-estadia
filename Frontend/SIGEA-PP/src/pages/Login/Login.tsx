import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import "./Login.css";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <section className="left-panel">
        <div className="left-panel__decoration" aria-hidden="true" />

        <div className="brand-content">
          <img src={logo} alt="DocenSys" className="logo" />

          <p className="brand-subtitle">Sistema de Gestión Académica</p>

          <div className="features">
            <FeatureCard title="Control de Asistencias" />
            <FeatureCard title="Registro de Calificaciones" />
            <FeatureCard title="Reportes Institucionales" />
          </div>
        </div>

        <p className="left-footer">
          Universidad Politécnica de Querétaro © 2026
        </p>
      </section>

      <section className="right-panel">
        <div className="right-panel__decoration" aria-hidden="true" />

        <div className="login-box">
          <header className="login-header">
            <h1>Bienvenido</h1>
            <p>Ingresa tus credenciales para continuar</p>
          </header>

          <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="usuario@docensys.edu.mx"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <a href="#" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>

            <button type="submit" className="login-btn">
              Iniciar sesión
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="dev-buttons">
            <button type="button" onClick={() => navigate("/docente")}>
              Docente
            </button>
            <button type="button" onClick={() => navigate("/admin")}>
              Administrador
            </button>
          </div>

          <p className="support-text">
            ¿Problemas para acceder?{" "}
            <a href="#">Contacta a soporte técnico</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
