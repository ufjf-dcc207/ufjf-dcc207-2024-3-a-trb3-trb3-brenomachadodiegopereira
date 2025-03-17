import { useState, useEffect } from 'react';
import './Palpite.css';

interface PalpiteProps {
  nomePokemon: string; 
  onPalpiteCerto: () => void;
}

export default function Palpite({ nomePokemon, onPalpiteCerto }: PalpiteProps) {
  const [palpite, setPalpite] = useState(''); 
  const [acertou, setAcertou] = useState(false); 

  const verificaPokemon = (event: React.FormEvent) => {
    event.preventDefault(); 

    if (palpite.trim().toLowerCase() === nomePokemon.toLowerCase()) {
      setAcertou(true); 
      onPalpiteCerto(); 
    } else {
      alert('Ops, tente novamente!');
    }

    setPalpite('');
  };

  useEffect(() => {
    setAcertou(false);
  }, [nomePokemon]);

  return (
    <form onSubmit={verificaPokemon} className="palpite">
      <input
        type="text"
        value={palpite}
        onChange={(e) => setPalpite(e.target.value)}
        placeholder="Digite o nome do Pokémon..."
        disabled={acertou} 
      />
    </form>
  );
}