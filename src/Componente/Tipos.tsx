import './Tipos.css';

interface TiposProps {
  tipos: string[];
  erros: number; 
  revelado: boolean; 
}

export default function Tipos({ tipos, erros, revelado }: TiposProps) {
  function getTipo(index: number) {
    if (revelado) {
      return tipos[index] || '-';
    } else if (erros >= index + 1) {
      return tipos[index] || '-';
    } else {
      return ' ';
    }
  }

  return (
    <div className="tipos-container">
      <div className='circulo'>
        <div className="tipo">{getTipo(0)}</div>
        <div className="tipo">{getTipo(1)}</div>
      </div>
    </div>
  );
}