import React, { useState } from 'react';
import loots from '../data/loots.json';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function LootCard() {
  const [tier, setTier] = useState<'cr0_4' | 'cr5_10'>('cr0_4');
  const [data, setData] = useState({
    moedas: '3d6 peças de prata e 1d6 peças de ouro',
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
    setCopied(false);
  };

  const copy = () => {
    const text = `Tesouro (${tier === 'cr0_4' ? 'ND 0-4' : 'ND 5-10'}):\nMoedas: ${data.moedas}\nGema/Objeto: ${data.gemas}\nBugiganga: ${data.bugiganga}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-oracle-card border border-indigo-500/20 rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between border-b border-indigo-500/10 pb-3 mb-4">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">Tesouro & Saque</span>
          <button 
            onClick={copy}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors px-2 py-1 rounded bg-slate-900/60 border border-slate-700/50"
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        <div className="mb-4">
          <select 
            value={tier} 
            onChange={(e) => setTier(e.target.value as any)}
            className="w-full bg-slate-900/80 border border-indigo-500/30 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="cr0_4">Nível de Desafio 0 a 4 (Iniciante)</option>
            <option value="cr5_10">Nível de Desafio 5 a 10 (Heroico)</option>
          </select>
        </div>

        <h3 className="text-lg font-bold text-amber-200 font-['Cinzel'] mb-3">Saque Sorteado</h3>
        
        <div className="space-y-2 text-sm text-slate-300 mb-6">
          <p><strong className="text-amber-300">Moedas:</strong> {data.moedas}</p>
          <p><strong className="text-amber-300">Gemas:</strong> {data.gemas}</p>
          <p><strong className="text-amber-300">Bugiganga:</strong> {data.bugiganga}</p>
        </div>
      </div>

      <button 
        onClick={roll}
        className="w-full py-2.5 px-4 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 font-medium text-sm transition-all active:scale-[0.98]"
      >
        Saquear Baú ✦
      </button>
    </div>
  );
}