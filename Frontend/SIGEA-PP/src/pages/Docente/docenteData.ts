export const alumnos = [
  {
    id: 1,
    nombre: "Alejandro Mendoza",
    iniciales: "AM",
    matricula: "2021-0001",
    grupo: "Grupo A",
    materia: "Matemáticas",
  },
  {
    id: 2,
    nombre: "Brenda Torres",
    iniciales: "BT",
    matricula: "2021-0002",
    grupo: "Grupo A",
    materia: "Historia",
  },
  {
    id: 3,
    nombre: "Carlos Ruiz",
    iniciales: "CR",
    matricula: "2021-0003",
    grupo: "Grupo B",
    materia: "Ciencias",
  },
  {
    id: 4,
    nombre: "Daniela Fuentes",
    iniciales: "DF",
    matricula: "2021-0004",
    grupo: "Grupo B",
    materia: "Matemáticas",
  },
  {
    id: 5,
    nombre: "Eduardo Vargas",
    iniciales: "EV",
    matricula: "2021-0005",
    grupo: "Grupo C",
    materia: "Historia",
  },
  {
    id: 6,
    nombre: "Fernanda López",
    iniciales: "FL",
    matricula: "2021-0006",
    grupo: "Grupo A",
    materia: "Ciencias",
  },
  {
    id: 7,
    nombre: "Gabriel Soto",
    iniciales: "GS",
    matricula: "2021-0007",
    grupo: "Grupo C",
    materia: "Matemáticas",
  },
  {
    id: 8,
    nombre: "Helena Morales",
    iniciales: "HM",
    matricula: "2021-0008",
    grupo: "Grupo B",
    materia: "Historia",
  },
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

type RubricaItem = {
  id: string;
  label: string;
  value: number;
};

export function calcularFinal(calificacion: Record<string, number>, rubrica: RubricaItem[]) {
  return rubrica.reduce((acc, item) => {
    const score = calificacion[item.id] ?? 0;
    return acc + score * (item.value / 100);
  }, 0);
}
