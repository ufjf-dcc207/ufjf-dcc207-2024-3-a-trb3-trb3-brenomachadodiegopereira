import './Pokemon.css';

interface PokemonProps {
  nome: string;
  imagem: string;
}

export default function Pokemon({ nome, imagem }: PokemonProps) {
  return (
    <div className="pokemon">
      <img src={imagem} alt={nome} />
    </div>
  );
}