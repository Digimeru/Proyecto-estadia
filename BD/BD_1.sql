-- ==========================================
-- TABLA: Estatus_Usuarios
-- ==========================================
CREATE TABLE Estatus_Usuarios (
    id_estatus SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- ==========================================
-- TABLA: Estatus_Asistencias
-- ==========================================
CREATE TABLE Estatus_Asistencias (
    id_estatus SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- ==========================================
-- TABLA: Tipos_Asistencia
-- ==========================================
CREATE TABLE Tipos_Asistencia (
    id_tipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- ==========================================
-- TABLA: Grupos
-- ==========================================
CREATE TABLE Grupos (
    id_grupo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ==========================================
-- TABLA: Materias
-- ==========================================
CREATE TABLE Materias (
    id_materia SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
);

-- ==========================================
-- TABLA: Periodos
-- ==========================================
CREATE TABLE Periodos (
    id_periodo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);


-- ==========================================
-- TABLA: Roles
-- ==========================================
CREATE TABLE Roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ==========================================
-- TABLA: Persona
-- ==========================================
CREATE TABLE Persona (
    id_persona SERIAL PRIMARY KEY,
    ap VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    am VARCHAR(100),
    telefono VARCHAR(20)
);

-- ==========================================
-- TABLA: Alumnos
-- ==========================================
CREATE TABLE Alumnos (
    id_alumno SERIAL PRIMARY KEY,
    id_persona INT NOT NULL,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona)
);

-- ==========================================
-- TABLA: Usuarios
-- ==========================================
CREATE TABLE Usuarios (
    id_usuarios SERIAL PRIMARY KEY,
    id_personas INT NOT NULL,
    id_rol INT NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    id_estatus INT,
    FOREIGN KEY (id_personas) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

-- ==========================================
-- TABLA: Parciales
-- ==========================================
CREATE TABLE Parciales (
    id_parcial SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- ==========================================
-- TABLA: Cursos_Asignados
-- ==========================================
CREATE TABLE Cursos_Asignados (
    id_curso SERIAL PRIMARY KEY,
    id_usuario_profesor INT NOT NULL,
    id_materia INT NOT NULL,
    id_grupo INT NOT NULL,
    id_periodo INT NOT NULL,
    FOREIGN KEY (id_usuario_profesor) REFERENCES Usuarios(id_usuarios),
    FOREIGN KEY (id_materia) REFERENCES Materias(id_materia),
	FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo),
	FOREIGN KEY (id_periodo) REFERENCES Periodos(id_periodo)
);

-- ==========================================
-- TABLA: Rubricas
-- ==========================================
CREATE TABLE Rubricas (
    id_rubrica SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    id_parcial INT NOT NULL,
    criterio VARCHAR(255) NOT NULL,
    porcentaje NUMERIC(5,2) NOT NULL,
    puntaje_maximo NUMERIC(6,2) NOT NULL,
    FOREIGN KEY (id_curso)REFERENCES Cursos_Asignados(id_curso),
	FOREIGN KEY (id_parcial)REFERENCES Parciales(id_parcial)
);

-- ==========================================
-- TABLA: Actividades_Tareas
-- ==========================================
CREATE TABLE Actividades_Tareas (
    id_actividad SERIAL PRIMARY KEY,
    id_rubrica INT NOT NULL,
    nombre_tarea VARCHAR(150) NOT NULL,
    fecha_entrega TIMESTAMP NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_rubrica) REFERENCES Rubricas(id_rubrica),
    FOREIGN KEY (id_curso) REFERENCES Cursos_Asignados(id_curso)
);

-- ==========================================
-- TABLA: Calificaciones
-- ==========================================
CREATE TABLE Calificaciones (
    id_calificacion SERIAL PRIMARY KEY,
    id_actividad INT NOT NULL,
    id_alumno INT NOT NULL,
    puntaje NUMERIC(6,2) NOT NULL,
    comentarios TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_actividad) REFERENCES Actividades_Tareas(id_actividad),
    FOREIGN KEY (id_alumno) REFERENCES Alumnos(id_alumno)
);



-- ==========================================
-- TABLA: Alumnos_Grupos
-- ==========================================
CREATE TABLE Alumnos_Grupos (
    id_alumno INT NOT NULL,
    id_grupo INT NOT NULL,
    PRIMARY KEY (id_alumno, id_grupo),
	FOREIGN KEY (id_alumno) REFERENCES Alumnos(id_alumno),
	FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)

);

-- ==========================================
-- TABLA: Sesiones_Clase
-- ==========================================
CREATE TABLE Sesiones_Clase (
    id_sesiones_clase SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tema VARCHAR(255),
    observaciones TEXT,
    id_estatus INT,
    FOREIGN KEY (id_curso) REFERENCES Cursos_Asignados(id_curso),
	FOREIGN KEY (id_estatus) REFERENCES Estatus_Usuarios(id_estatus)

);

-- ==========================================
-- TABLA: Asistencias
-- ==========================================
CREATE TABLE Asistencias (
    id_asistencia SERIAL PRIMARY KEY,
    id_tipo INT NOT NULL,
    id_persona INT NOT NULL,
    id_curso INT NOT NULL,
    fecha DATE NOT NULL,
    id_estatus INT NOT NULL,
    id_usuario INT NOT NULL,
    id_sesiones_clase INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES Tipos_Asistencia(id_tipo),
    FOREIGN KEY (id_persona) REFERENCES Persona(id_persona),
    FOREIGN KEY (id_curso) REFERENCES Cursos_Asignados(id_curso),
    FOREIGN KEY (id_estatus) REFERENCES Estatus_Asistencias(id_estatus),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuarios),
    FOREIGN KEY (id_sesiones_clase) REFERENCES Sesiones_Clase(id_sesiones_clase)
);