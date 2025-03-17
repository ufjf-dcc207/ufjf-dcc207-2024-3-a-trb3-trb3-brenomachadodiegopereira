import './Pokemon.css';

interface PokemonProps {
  nome: string;
  imagem: string;
  revelado: boolean; 
}

export default function Pokemon({ nome, imagem, revelado }: PokemonProps) {
  return (
    <div className="pokemon">
      <div className="imagem-container">
        <img src={imagem} alt={nome} className={revelado ? '' : 'silhueta'} />
      </div>
    </div>
  );
}