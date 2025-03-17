import { useState, useEffect } from 'react';
import Pokemon from './Pokemon.tsx';
import Palpite from './Palpite.tsx';
import Tentativas from './Tentativas.tsx';
import Mensagens from './Mensagens.tsx';
import Tipos from './Tipos.tsx';
import './Jogo.css';

export default function Jogo() {
  const [pokemon, setPokemon] = useState<{ nome: string; imagem: string; tipos: string[] } | null>(null);
  const [tentativasRestantes, setTentativasRestantes] = useState(3); 
  const [revelado, setRevelado] = useState(false); 
  const [mensagem, setMensagem] = useState('Quem é esse Pokémon?');
  const [erros, setErros] = useState(0); 

  async function pegaPokemon() {
    try {
      const idRandom = Math.floor(Math.random() * 151) + 1; 
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`);
      const escolhido = await resposta.json();
      setPokemon({
        nome: escolhido.name,
        imagem: escolhido.sprites.front_default,
        tipos: escolhido.types.map((t: any) => t.type.name), 
      });
      setTentativasRestantes(3); 
      setRevelado(false); 
      setMensagem('Quem é esse Pokémon?'); 
      setErros(0); 
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }

  const handlePalpiteCerto = () => {
    setMensagem(`Você acertou! É o ${pokemon?.nome}.`);
    setRevelado(true); 
  };

  const handlePalpiteErrado = () => {
    setTentativasRestantes((tentativas) => tentativas - 1); 
    setErros((erros) => erros + 1); 
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
    <div className="container-geral">

      <div className="container-esquerda">
        <img
          src="/imagens/whos-that-pokemon.png"
          alt="Who's That Pokémon?"
          className="imagem-titulo"
        />
        <div className="pokemon-container">
          <div className="esfera-branca">
          <Pokemon nome={pokemon.nome} imagem={pokemon.imagem} revelado={revelado} />
          </div>
        </div>
        <div className="input-botao-container">
          <Palpite
            nomePokemon={pokemon.nome}
            onPalpiteCerto={handlePalpiteCerto}
            onPalpiteErrado={handlePalpiteErrado}
            tentativasRestantes={tentativasRestantes}
          />
          <div className="botao-novo-pokemon-container" onClick={pegaPokemon}>
            <img
              src="/imagens/novo-pokemon.png" 
              alt="Novo Pokémon"
              className="botao-novo-pokemon"
            />
          </div>
        </div>
      </div>



      <div className="container-direita">

        <div className="container-direita-superior">
          <Tipos tipos={pokemon.tipos} erros={erros} revelado={revelado} />
        </div>


        <div className="container-direita-meio">
          <Tentativas tentativasRestantes={tentativasRestantes} />
        </div>


        <div className="container-direita-inferior">
          <Mensagens mensagem={mensagem} />
        </div>

      </div>
    </div>
  );
}