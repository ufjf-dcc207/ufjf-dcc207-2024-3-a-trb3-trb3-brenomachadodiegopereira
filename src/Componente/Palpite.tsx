import { useState , useEffect , useRef } from 'react';
import './Palpite.css';

interface PalpiteProps {
  nomePokemon: string;
  onPalpiteCerto: () => void;
  onPalpiteErrado: () => void;
  tentativasRestantes: number; 
}

export default function Palpite({ nomePokemon, onPalpiteCerto, onPalpiteErrado, tentativasRestantes }: PalpiteProps) {
  const [palpite, setPalpite] = useState(''); 
  const [acertou, setAcertou] = useState(false); 
  const inputRef = useRef<HTMLInputElement>(null); 

  const verificaPokemon = (event: React.FormEvent) => {
    event.preventDefault();

    if (palpite.trim().toLowerCase() === nomePokemon.toLowerCase()) {
      setAcertou(true);
      onPalpiteCerto();
    } else {
      onPalpiteErrado();
    }

    setPalpite('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [nomePokemon]);
  
  useEffect(() => {
    setAcertou(false);
  }, [nomePokemon]);

  const inputDesabilitado = acertou || tentativasRestantes === 0;

  return (
    <form onSubmit={verificaPokemon} className="palpite">
      <input
        ref={inputRef} 
        type="text"
        value={palpite}
        onChange={(e) => setPalpite(e.target.value)}
        placeholder="Digite aqui..."
        disabled={inputDesabilitado} 
      />
    </form>
  );
}