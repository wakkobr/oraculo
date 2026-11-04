import React, { useState } from 'react';
import mushrooms from '../data/mushrooms.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

export default function MushroomCard() {
const [data, setData] = useState({
  id: 72,
  nome: "Consulta do Oráculo",
  descricao: "Permite rolar 1d20 no consumo e guardar o valor para substituir qualquer rolagem futura nas próximas 24 horas."
});
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const randomItem = mushrooms[Math.floor(Math.random() * mushrooms.length)];
    setData(randomItem);
    addHistoryEntry('COGUMELO' as any, `d100 [${randomItem.id}] ${randomItem.nome}`);
  };

  const copy = () => {
    const text = `Cogumelo d100 (#${data.id}): ${data.nome}\nPropriedades: ${data.descricao}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        {/* Topo do Card */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#11241a] border border-[#1b5e3a] flex items-center justify-center text-emerald-400 text-lg">
              🍄
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Cogumelos Mágicos</h3>
              <p className="text-[11px] text-slate-400">100 Fungos & Efeitos (d100)</p>
            </div>
          </div>
          <PinButton cardId="alquimia-cogumelo" />
          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Bloco de Resultado (sem o rótulo d100) */}
<div className="mb-4">
  <div className="flex items-center justify-between gap-2">
    <h4 className="text-base md:text-lg font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide leading-snug">
      {data.nome}
    </h4>
    <button onClick={copy} title="Copiar cogumelo" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
      📋
    </button>
  </div>
</div>

        {/* Descrição Alquímica */}
        <div className="text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>{data.descricao}</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Efeito'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Rolar d100
        </button>
      </div>
    </div>
  );
}