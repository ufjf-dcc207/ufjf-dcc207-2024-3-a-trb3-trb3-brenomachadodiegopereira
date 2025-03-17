import { useState, useEffect } from 'react';
import Pokemon from './Pokemon.tsx';
import Palpite from './Palpite.tsx';
import Tentativas from './Tentativas.tsx';
import './Jogo.css';

export default function Jogo() {
  const [pokemon, setPokemon] = useState<{ nome: string; imagem: string } | null>(null);
  const [tentativasRestantes, setTentativasRestantes] = useState(3); 

  async function pegaPokemon() {
    try {
      const idRandom = Math.floor(Math.random() * 151) + 1; 
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`);
      const escolhido = await resposta.json();
      setPokemon({
        nome: escolhido.name,
        imagem: escolhido.sprites.front_default,
      });
      setTentativasRestantes(3); 
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }

  const handlePalpiteCerto = () => {
    alert('Parabéns, você acertou!');
    setTentativasRestantes(3); 
  };

  const handlePalpiteErrado = () => {
    setTentativasRestantes((tentativas) => tentativas - 1); 
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
      <Palpite
        nomePokemon={pokemon.nome}
        onPalpiteCerto={handlePalpiteCerto}
        onPalpiteErrado={handlePalpiteErrado}
      />
      <Tentativas tentativasRestantes={tentativasRestantes} nomePokemon={pokemon.nome} />
      <button onClick={pegaPokemon}>Novo Pokémon</button>
    </div>
  );
}