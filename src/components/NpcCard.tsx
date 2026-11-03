import React, { useState } from 'react';
import npcs from '../data/npcs.json';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function NpcCard() {
  const [race, setRace] = useState<'humano' | 'elfo' | 'anao' | 'tiefling'>('humano');
  const [gender, setGender] = useState<'masc' | 'fem'>('masc');
  const [data, setData] = useState({
    nome: 'Kaelen Pedranegra',
    traco: 'Extremamente gesticulador; ri alto de quase tudo o que ouve.',
    segredo: 'Deve uma soma considerável a um sindicato de contrabandistas local.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const raceData = npcs.nomes[race];
    const primeiro = pick(raceData[gender]);
    const sobrenome = pick(raceData.sobrenome);
    setData({
      nome: `${primeiro} ${sobrenome}`,
      traco: pick(npcs.tracos),
      segredo: pick(npcs.segredos)
    });
    setCopied(false);
  };

  const copy = () => {
    const text = `NPC: ${data.nome} (${race}, ${gender})\nTraço: ${data.traco}\nSegredo: ${data.segredo}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-oracle-card border border-indigo-500/20 rounded-xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between border-b border-indigo-500/10 pb-3 mb-4">
          <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">NPCs Instantâneos</span>
          <button 
            onClick={copy}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors px-2 py-1 rounded bg-slate-900/60 border border-slate-700/50"
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <select 
            value={race} 
            onChange={(e) => setRace(e.target.value as any)}
            className="bg-slate-900/80 border border-indigo-500/30 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="humano">Humano</option>
            <option value="elfo">Elfo</option>
            <option value="anao">Anão</option>
            <option value="tiefling">Tiefling</option>
          </select>

          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value as any)}
            className="bg-slate-900/80 border border-indigo-500/30 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="masc">Masculino</option>
            <option value="fem">Feminino</option>
          </select>
        </div>

        <h3 className="text-xl font-bold text-amber-200 font-['Cinzel'] mb-3">{data.nome}</h3>
        
        <div className="space-y-2 text-sm text-slate-300 mb-6">
          <p><strong className="text-sky-300">Traço:</strong> {data.traco}</p>
          <p><strong className="text-sky-300">Segredo:</strong> {data.segredo}</p>
        </div>
      </div>

      <button 
        onClick={roll}
        className="w-full py-2.5 px-4 rounded-lg bg-sky-600/30 hover:bg-sky-600/50 border border-sky-500/40 text-sky-200 font-medium text-sm transition-all active:scale-[0.98]"
      >
        Conjurar NPC ✦
      </button>
    </div>
  );
}