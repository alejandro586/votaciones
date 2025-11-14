// src/utils/votacionUtils.js
export const guardarVoto = (categoria, candidato, distrito = null) => {
  // 1. Obtener datos actuales o inicializar
  const datos = JSON.parse(localStorage.getItem('votacionesGlobales')) || {
    presidentes: {},
    mesaRedonda: {},
    alcaldes: {}
  };

  // 2. Actualizar el voto
  if (categoria === 'alcaldes' && distrito) {
    if (!datos.alcaldes[distrito]) datos.alcaldes[distrito] = {};
    datos.alcaldes[distrito][candidato] = (datos.alcaldes[distrito][candidato] || 0) + 1;
  } else {
    datos[categoria][candidato] = (datos[categoria][candidato] || 0) + 1;
  }

  // 3. Guardar
  localStorage.setItem('votacionesGlobales', JSON.stringify(datos));
};