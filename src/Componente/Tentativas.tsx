import './Tentativas.css';

interface TentativasProps {
  tentativasRestantes: number; 
}

export default function Tentativas({ tentativasRestantes }: TentativasProps) {
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
    </div>
  );
}