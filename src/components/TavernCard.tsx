import React, { useState } from 'react';
import npcs from '../data/npcs.json';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function NpcCard() {
  const [race, setRace] = useState<'humano' | 'elfo' | 'anao' | 'tiefling'>('anao');
  const [gender, setGender] = useState<'masc' | 'fem'>('masc');
  const [data, setData] = useState({
    nome: 'RURIK BARBAFERRO',
    sub: '(Anão, Neutro)',
    personalidade: 'Riso estridente e tem o hábito de mascar folhas amargas aromatizadas.',
    segredo: 'Está usando um anel mágico simples com uma ilusão que esconde uma marca de procurado.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const raceData = npcs.nomes[race] || npcs.nomes.humano;
    const primeiro = pick(raceData[gender] || raceData.masc);
    const sobrenome = pick(raceData.sobrenome);
    
    const rLabel = race === 'anao' ? 'Anão' : race === 'elfo' ? 'Elfo' : race === 'tiefling' ? 'Tiefling' : 'Humano';
    const gLabel = gender === 'masc' ? 'Masc' : 'Fem';

    setData({
      nome: `${primeiro} ${sobrenome}`.toUpperCase(),
      sub: `(${rLabel}, ${gLabel})`,
      personalidade: pick(npcs.tracos),
      segredo: pick(npcs.segredos)
    });
  };

  const copy = () => {
    const text = `NPC: ${data.nome} ${data.sub}\nPersonalidade: ${data.personalidade}\nSegredo/Gancho: ${data.segredo}`;
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
            <div className="w-9 h-9 rounded-lg bg-[#22173a] border border-[#4d2f80] flex items-center justify-center text-purple-300 text-lg">
              👤
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Gerador de NPCs</h3>
              <p className="text-[11px] text-slate-400">Nome, traço e segredo de mesa</p>
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

        {/* Filtros Dropdown com rótulos */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Raça:</label>
            <select 
              value={race} 
              onChange={(e) => setRace(e.target.value as any)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/40"
            >
              <option value="humano">🎲 Humano</option>
              <option value="elfo">🎲 Elfo</option>
              <option value="anao">🎲 Anão</option>
              <option value="tiefling">🎲 Tiefling</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Gênero:</label>
            <select 
              value={gender} 
              onChange={(e) => setGender(e.target.value as any)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400/40"
            >
              <option value="masc">🎲 Masculino</option>
              <option value="fem">🎲 Feminino</option>
            </select>
          </div>
        </div>

        {/* Bloco de Resultado Sorteado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">NPC Sorteado:</span>
            <button onClick={copy} title="Copiar nome" className="text-slate-500 hover:text-amber-300 text-xs transition-colors">
              📋
            </button>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h4 className="text-lg font-bold text-amber-200 font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <span className="text-xs text-slate-400 font-mono">{data.sub}</span>
          </div>
        </div>

        {/* Detalhes do NPC */}
        <div className="space-y-2 text-xs text-slate-300 mb-6 leading-relaxed">
          <p><strong className="text-slate-100 font-semibold">Personalidade:</strong> {data.personalidade}</p>
          <p><strong className="text-slate-100 font-semibold">Segredo / Gancho:</strong> {data.segredo}</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Ficha'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-linear-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-slate-950 text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Rolar NPC
        </button>
      </div>
    </div>
  );
}