const tiposCores: { [key: string]: string } = {
    normal: '#b61f12',
    fire: '#d86a1a',
    water: '#0cc0df',
    electric: '#fda104',
    grass: '#00bf63',
    ice: '#88abf6',
    fighting: '#4047ed',
    poison: '#8c6199',
    ground: '#a28c37',
    flying: '#616e8a',
    psychic: '#8c52ff',
    bug: '#698f3e',
    rock: '#6b5b2c',
    ghost: '#4f4066',
    dragon: '#2e2623',
    dark: '#3a1870',
    steel: '#9b9b9b',
    fairy: '#d87bd7',
  };
  
  function getCorPorTipo(tipo: string): string {
    return tiposCores[tipo] || '#2e2623'; 
  }
  
  export default getCorPorTipo; 