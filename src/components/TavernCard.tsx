import React, { useState } from 'react';
import taverns from '../data/taverns.json';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function TavernCard() {
  const [data, setData] = useState({
    nome: 'O Javali Bêbado',
    clima: 'Barulhenta, cheirando a cerveja azeda e carne assada.',
    especialidade: 'Ensopado de javali com raízes amargas e cerveja preta.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    setData({
      nome: `${pick(taverns.prefixos)} ${pick(taverns.sufixos)}`,
      clima: pick(taverns.climas),
      especialidade: pick(taverns.especialidades)
    });
    setCopied(false);
  };

  const copy = () => {
    const text = `Taverna: ${data.nome}\nAmbiente: ${data.clima}\nEspecialidade: ${data.especialidade}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-oracle-card border border-indigo-500/20 rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between border-b border-indigo-500/10 pb-3 mb-4">
          <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Tavernas & Estalagens</span>
          <button 
            onClick={copy}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors px-2 py-1 rounded bg-slate-900/60 border border-slate-700/50"
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        <h3 className="text-xl font-bold text-amber-200 font-['Cinzel'] mb-3">{data.nome}</h3>
        
        <div className="space-y-2 text-sm text-slate-300 mb-6">
          <p><strong className="text-indigo-300">Ambiente:</strong> {data.clima}</p>
          <p><strong className="text-indigo-300">Especialidade:</strong> {data.especialidade}</p>
        </div>
      </div>

      <button 
        onClick={roll}
        className="w-full py-2.5 px-4 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-medium text-sm transition-all active:scale-[0.98]"
      >
        Invocar Taverna ✦
      </button>
    </div>
  );
}