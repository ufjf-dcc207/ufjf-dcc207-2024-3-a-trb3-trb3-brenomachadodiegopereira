import { useState, useEffect } from 'react';
import Pokemon from './Pokemon.tsx';
import Palpite from './Palpite.tsx';
import './Jogo.css';

export default function Jogo() {
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

  const handlePalpiteCerto = () => {
    alert('Parabéns, você acertou!');
  };

  useEffect(() => {
    pegaPokemon();
  }, []);

  if (!pokemon) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="jogo">
      <Pokemon nome={pokemon.nome} imagem={pokemon.imagem} />
      <Palpite nomePokemon={pokemon.nome} onPalpiteCerto={handlePalpiteCerto} />
      <button onClick={pegaPokemon}>Novo Pokémon</button>
    </div>
  );
}