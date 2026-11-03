import React, { useState } from 'react';
import taverns from '../data/taverns.json';
import { addHistoryEntry } from '../utils/history';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function TavernCard() {
  const [data, setData] = useState({
    nome: 'O MACHADO DORMINHOCO',
    clima: 'Silenciosa e tensa, com mercenários de capuz limpando adagas nas sombras.',
    especialidade: 'Pernil de carneiro assado com ervas dos ermos e pão rústico de centeio.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = `${pick(taverns.prefixos)} ${pick(taverns.sufixos)}`.toUpperCase();
    const clima = pick(taverns.climas);
    const especialidade = pick(taverns.especialidades);

    setData({ nome, clima, especialidade });
    addHistoryEntry('TAVERNA', `${nome} (${especialidade})`);
  };

  const copy = () => {
    const text = `Taverna: ${data.nome}\nClima: ${data.clima}\nEspecialidade: ${data.especialidade}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#181d38] border border-[#303866] flex items-center justify-center text-[#d4b26f] text-lg">
              🍺
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Nomes de Taverna</h3>
              <p className="text-[11px] text-slate-400">Ambiente & Especialidade</p>
            </div>
          </div>

          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-[#d4b26f]/50 flex items-center justify-center text-slate-300 hover:text-[#d4b26f] transition-colors"
          >
            ↻
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Estabelecimento Sorteado:</span>
            <button onClick={copy} title="Copiar nome" className="text-slate-500 hover:text-[#d4b26f] text-xs transition-colors">
              📋
            </button>
          </div>
          <h4 className="text-lg font-bold text-[#f2dfb3] font-['Cinzel'] tracking-wide">
            {data.nome}
          </h4>
        </div>

        <div className="space-y-2.5 text-xs text-slate-300 mb-6 leading-relaxed">
          <p><strong className="text-slate-100 font-semibold">Clima:</strong> {data.clima}</p>
          <p><strong className="text-slate-100 font-semibold">Especialidade:</strong> {data.especialidade}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Ficha'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Rolar Taverna
        </button>
      </div>
    </div>
  );
}