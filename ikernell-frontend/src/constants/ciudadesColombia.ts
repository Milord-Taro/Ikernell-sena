// Lista fija de las ciudades colombianas más relevantes para el registro
// de usuarios. No existe una librería estándar confiable para esto en el
// ecosistema Java/Spring -- el listado oficial completo es DIVIPOLA
// (DANE, ~1122 municipios), que sería una entidad/catálogo nuevo, fuera
// del alcance aprobado. Esta lista cubre el caso real sin inflar el
// backend; es solo un array de strings en el frontend.
export const CIUDADES_COLOMBIA = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Cúcuta',
  'Bucaramanga',
  'Pereira',
  'Santa Marta',
  'Ibagué',
  'Pasto',
  'Manizales',
  'Neiva',
  'Villavicencio',
  'Armenia',
  'Valledupar',
  'Montería',
  'Sincelejo',
  'Popayán',
  'Tunja',
  'Riohacha',
  'Florencia',
  'Quibdó',
  'Yopal',
  'Mocoa',
  'San Andrés',
  'Leticia',
  'Arauca',
  'Inírida',
  'Puerto Carreño',
] as const;
