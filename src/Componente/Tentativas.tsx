import './Tentativas.css';

interface TentativasProps {
  tentativasRestantes: number; 
}

export default function Tentativas({ tentativasRestantes }: TentativasProps) {
  const pokebolas = [1, 2, 3];

  return (
    <div className="tentativas">
      <div className="pokebolas">
        {pokebolas.map((_, index) => (
          <img
            key={index}
            src="/ufjf-dcc207-2024-3-a-trb3-trb3-brenomachadodiegopereira/imagens/pokebola.png" 
            alt="Pokébola"
            className={`pokebola ${index < 3 - tentativasRestantes ? 'preta' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}