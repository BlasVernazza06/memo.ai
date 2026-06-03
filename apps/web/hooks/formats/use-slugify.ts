export const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD') // Separa los acentos de las letras
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Espacios por guiones
    .replace(/[^\w-]+/g, '') // Elimina caracteres especiales que no sean letras/números
    .replace(/--+/g, '-'); // Evita múltiples guiones
};

export const normalizeString = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const getShortId = (id: string | number) => {
  if (!id) return '';

  const stringId = String(id);
  // Tomamos los primeros 8 caracteres (la primera sección del UUID)
  return stringId.split('-')[0];
};
