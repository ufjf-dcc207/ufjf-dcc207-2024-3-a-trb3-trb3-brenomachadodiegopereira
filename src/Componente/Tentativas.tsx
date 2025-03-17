import './Tentativas.css';

interface TentativasProps {
  tentativasRestantes: number;
  nomePokemon: string; 
}

export default function Tentativas({ tentativasRestantes, nomePokemon }: TentativasProps) {
  
  const esferas = [1, 2, 3];

  return (
    <div className="tentativas">
      <div className="esferas">
        {esferas.map((esfera) => (
          <div
            key={esfera}
            className={`esfera ${esfera <= 3 - tentativasRestantes ? 'preta' : 'vermelha'}`}
          />
        ))}
      </div>
      {tentativasRestantes === 0 && (
        <p className="reveal">O Pokémon era: <strong>{nomePokemon}</strong></p>
      )}
    </div>
  );
}