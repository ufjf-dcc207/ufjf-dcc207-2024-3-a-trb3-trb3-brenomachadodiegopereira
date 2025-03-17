import { useState, useEffect } from 'react';
import './Pokemon.css';
import Palpite from './Palpite.tsx';

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<{ nome: string; imagem: string } | null>(null);

  
  async function pegaPokemon() {
    try {
      const idRandom = Math.floor(Math.random() * 151) + 1; 
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`);
      const escolhido = await resposta.json();
      setPokemon({
        nome: escolhido.name,
        imagem: escolhido.sprites.front_default,
      });
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }

  useEffect(() => {
    pegaPokemon();
  }, []);

  if (!pokemon) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="pokemon">
      <img src={pokemon.imagem} alt={pokemon.nome} />
      <Palpite nomePokemon={pokemon.nome} onPalpiteCerto={() => alert('Parabéns, você acertou!')} />
      <button onClick={pegaPokemon}>Novo Pokémon</button>
    </div>
  );
}