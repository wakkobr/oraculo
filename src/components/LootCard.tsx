import React, { useState } from 'react';
import loots from '../data/loots.json';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function LootCard() {
  const [tier, setTier] = useState<'cr0_4' | 'cr5_10'>('cr0_4');
  const [data, setData] = useState({
    moedas: '4d6 peças de ouro',
    gemas: 'Ágata musgosa (10 po)',
    bugiganga: 'Dente de goblin engastado a prata'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const pool = loots[tier];
    setData({
      moedas: pick(pool.moedas),
      gemas: pick(pool.gemas),
      bugiganga: pick(pool.bugigangas)
    });
  };

  const copy = () => {
    const text = `Tesouro (${tier === 'cr0_4' ? 'ND 0-4' : 'ND 5-10'}):\nMoedas: ${data.moedas}\nGemas: ${data.gemas}\nBugiganga: ${data.bugiganga}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-[#0d1124] border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        {/* Topo do Card */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2a1d13] border border-[#6b451e] flex items-center justify-center text-amber-400 text-lg">
              💎
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Tesouro & Saque</h3>
              <p className="text-[11px] text-slate-400">Moedas, gemas e bugigangas</p>
            </div>
          </div>

          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-amber-400/50 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Dropdown de Faixa de Desafio */}
        <div className="mb-4">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Faixa de Desafio:</label>
          <select 
            value={tier} 
            onChange={(e) => setTier(e.target.value as any)}
            className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/40"
          >
            <option value="cr0_4">🎲 ND 0 a 4 (Iniciante / Salteadores)</option>
            <option value="cr5_10">🎲 ND 5 a 10 (Heroico / Monstros Célebres)</option>
          </select>
        </div>

        {/* Bloco de Resultado Sorteado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Saque Sorteado:</span>
            <button onClick={copy} title="Copiar saque" className="text-slate-500 hover:text-amber-300 text-xs transition-colors">
              📋
            </button>
          </div>
          <h4 className="text-lg font-bold text-amber-200 font-['Cinzel'] tracking-wide">
            {tier === 'cr0_4' ? 'COFRE DE BANDIDOS' : 'BAÚ DO COVIL'}
          </h4>
        </div>

        {/* Detalhes do Saque */}
        <div className="space-y-2 text-xs text-slate-300 mb-6 leading-relaxed">
          <p><strong className="text-slate-100 font-semibold">Moedas:</strong> {data.moedas}</p>
          <p><strong className="text-slate-100 font-semibold">Gemas:</strong> {data.gemas}</p>
          <p><strong className="text-slate-100 font-semibold">Bugiganga:</strong> {data.bugiganga}</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Saque'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-linear-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-slate-950 text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Saquear Baú
        </button>
      </div>
    </div>
  );
}