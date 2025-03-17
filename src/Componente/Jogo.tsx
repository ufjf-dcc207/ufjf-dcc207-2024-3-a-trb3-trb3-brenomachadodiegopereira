import { useReducer, useEffect } from 'react';
import Pokemon from './Pokemon';
import Palpite from './Palpite';
import Tentativas from './Tentativas';
import Mensagens from './Mensagens';
import Tipos from './Tipos';
import './Jogo.css';

type EstadoJogo = {
  pokemon: { nome: string; imagem: string; tipos: string[] } | null;
  tentativasRestantes: number;
  revelado: boolean;
  mensagem: string;
  erros: number;
};

type AcaoJogo =
  | { type: 'CARREGAR_POKEMON'; payload: { nome: string; imagem: string; tipos: string[] } } 
  | { type: 'PALPITE_CERTO' }
  | { type: 'PALPITE_ERRADO' }
  | { type: 'REINICIAR_JOGO' };

function reducer(state: EstadoJogo, action: AcaoJogo): EstadoJogo {
  switch (action.type) {
    case 'CARREGAR_POKEMON':
      return {
        ...state,
        pokemon: action.payload,
        tentativasRestantes: 3,
        revelado: false,
        mensagem: 'Quem é esse Pokémon?',
        erros: 0,
      };
    case 'PALPITE_CERTO':
      return {
        ...state,
        mensagem: `Você acertou! É o ${state.pokemon?.nome}.`,
        revelado: true,
      };
    case 'PALPITE_ERRADO':
      const novasTentativas = state.tentativasRestantes - 1;
      return {
        ...state,
        tentativasRestantes: novasTentativas,
        erros: state.erros + 1,
        mensagem: novasTentativas > 0 ? 'Tente novamente!' : `Você errou... Era o ${state.pokemon?.nome}.`,
        revelado: novasTentativas === 0,
      };
    case 'REINICIAR_JOGO':
      return {
        ...state,
        tentativasRestantes: 3,
        revelado: false,
        mensagem: 'Quem é esse Pokémon?',
        erros: 0,
      };
    default:
      return state;
  }
}

export default function Jogo() {
  const [state, dispatch] = useReducer(reducer, {
    pokemon: null,
    tentativasRestantes: 3,
    revelado: false,
    mensagem: 'Quem é esse Pokémon?',
    erros: 0,
  });

  const { pokemon, tentativasRestantes, revelado, mensagem, erros } = state;

  async function pegaPokemon() {
    try {
      const idRandom = Math.floor(Math.random() * 151) + 1;
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idRandom}`);
      const escolhido = await resposta.json();
      dispatch({
        type: 'CARREGAR_POKEMON',
        payload: {
          nome: escolhido.name,
          imagem: escolhido.sprites.front_default,
          tipos: escolhido.types.map((t: any) => t.type.name),
        },
      });
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  }

  const handlePalpiteCerto = () => dispatch({ type: 'PALPITE_CERTO' });
  const handlePalpiteErrado = () => dispatch({ type: 'PALPITE_ERRADO' });

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
          src="ufjf-dcc207-2024-3-a-trb3-trb3-brenomachadodiegopereira/imagens/whos-that-pokemon.png"
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
              src="ufjf-dcc207-2024-3-a-trb3-trb3-brenomachadodiegopereira/imagens/novo-pokemon.png" 
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