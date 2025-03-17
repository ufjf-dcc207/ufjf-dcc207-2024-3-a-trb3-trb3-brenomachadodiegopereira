import './Mensagens.css';

interface MensagensProps {
  mensagem: string; 
}

export default function Mensagens({ mensagem }: MensagensProps) {
  return (
    <div className="mensagens">
      <p>{mensagem}</p>
    </div>
  );
}