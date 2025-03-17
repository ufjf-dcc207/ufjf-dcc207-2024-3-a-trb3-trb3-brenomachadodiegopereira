import './Pokemon.css';

export default function Pokemon() {
  const pokemon = {
    name: 'Pikachu', //nome fixo
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', //imagem fixa
  };
  
  return (
    <div className="pokemon"> 
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}