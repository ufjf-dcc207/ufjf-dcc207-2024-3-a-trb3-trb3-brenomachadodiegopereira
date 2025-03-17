import { useState, useEffect } from 'react';
import Pokemon from './Pokemon';
import Palpite from './Palpite';
import Tentativas from './Tentativas';
import Mensagens from './Mensagens';
import './Jogo.css';

export default function Jogo() {
  const [pokemon, setPokemon] = useState<{ nome: string; imagem: string } | null>(null);
  const [tentativasRestantes, setTentativasRestantes] = useState(3); 
  const [revelado, setRevelado] = useState(false); 
  const [mensagem, setMensagem] = useState('Quem é esse Pokémon?'); 

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
      setRevelado(false); 
      setMensagem('Quem é esse Pokémon?'); 
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }

  const handlePalpiteCerto = () => {
    setMensagem(`Você acertou! É o ${pokemon?.nome}.`);
    setTentativasRestantes(3); 
    setRevelado(true); 
  };

  const handlePalpiteErrado = () => {
    setTentativasRestantes((tentativas) => tentativas - 1); 
    if (tentativasRestantes > 1) {
      setMensagem('Tente novamente!');
    } else {
      setMensagem(`Você errou... Era o ${pokemon?.nome}.`);
      setRevelado(true); 
    }
  };

  useEffect(() => {
    pegaPokemon();
  }, []);

  if (!pokemon) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="jogo">
      <Pokemon nome={pokemon.nome} imagem={pokemon.imagem} revelado={revelado} />
      <Palpite
        nomePokemon={pokemon.nome}
        onPalpiteCerto={handlePalpiteCerto}
        onPalpiteErrado={handlePalpiteErrado}
      />
      <Tentativas tentativasRestantes={tentativasRestantes} nomePokemon={pokemon.nome} />
      <Mensagens mensagem={mensagem} />
      <button onClick={pegaPokemon}>Novo Pokémon</button>
    </div>
  );
}