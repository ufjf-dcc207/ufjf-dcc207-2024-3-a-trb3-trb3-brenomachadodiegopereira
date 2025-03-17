import './Tipos.css';
import getCorPorTipo from './TiposCores';

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

  function getCorCaixa(index: number): string {
    if (revelado || erros >= index + 1) {
      return getCorPorTipo(tipos[index]); 
    } else {
      return '#2e2623';
    }
  }

  return (
    <div className="tipos-container">
      <div className="esfera-tipos"></div>

      <div
        className="tipo"
        style={{ backgroundColor: getCorCaixa(0) }} 
      >
        {getTipo(0)}
      </div>

            <div
        className="tipo"
        style={{ backgroundColor: getCorCaixa(1)}}
      >
        {getTipo(1)}
      </div>
    </div>
  );
}