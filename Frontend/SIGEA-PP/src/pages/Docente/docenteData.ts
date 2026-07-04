export const alumnos = [
  { id: 1, nombre: "Alejandro Mendoza", iniciales: "AM", matricula: "2021-0001" },
  { id: 2, nombre: "Brenda Torres", iniciales: "BT", matricula: "2021-0002" },
  { id: 3, nombre: "Carlos Ruiz", iniciales: "CR", matricula: "2021-0003" },
  { id: 4, nombre: "Daniela Fuentes", iniciales: "DF", matricula: "2021-0004" },
  { id: 5, nombre: "Eduardo Vargas", iniciales: "EV", matricula: "2021-0005" },
  { id: 6, nombre: "Fernanda López", iniciales: "FL", matricula: "2021-0006" },
  { id: 7, nombre: "Gabriel Soto", iniciales: "GS", matricula: "2021-0007" },
  { id: 8, nombre: "Helena Morales", iniciales: "HM", matricula: "2021-0008" },
];

export const calificacionesIniciales = [
  { tareas: 7, examen: 8, proyecto: 9, actitud: 10 },
  { tareas: 8, examen: 7, proyecto: 8, actitud: 9 },
  { tareas: 9, examen: 9, proyecto: 8, actitud: 10 },
  { tareas: 6, examen: 7, proyecto: 7, actitud: 8 },
  { tareas: 8, examen: 8, proyecto: 9, actitud: 9 },
  { tareas: 7, examen: 6, proyecto: 8, actitud: 9 },
  { tareas: 9, examen: 9, proyecto: 9, actitud: 10 },
  { tareas: 8, examen: 8, proyecto: 7, actitud: 9 },
];

export function calcularFinal(tareas: number, examen: number, proyecto: number, actitud: number) {
  return tareas * 0.2 + examen * 0.4 + proyecto * 0.3 + actitud * 0.1;
}
