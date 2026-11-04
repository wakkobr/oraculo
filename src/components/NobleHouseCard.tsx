import React, { useState } from 'react';
import housesData from '../data/noble_houses.json';
import { addHistoryEntry } from '../utils/history';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesCasas = [
  'Casa Ravenscroft',
  'Casa Valmont',
  'Casa Vane-Blackwood',
  'Casa Silverthorne',
  'Casa Ashford',
  'Casa Castamere',
  'Casa Belmont',
  'Casa Wintermere'
];

export default function NobleHouseCard() {
  const [data, setData] = useState({
    nome: 'Casa Ravenscroft',
    linhagem: 'Antiga e venerável, profundamente respeitada por todas as casas, grandes ou pequenas.',
    cores: 'Violeta imperial & Prata / Cinza-claro',
    brasao: 'Uma ave nobre (corvo da torre)',
    lema: 'Dever acima de tudo',
    patriarca: 'Uma figura anciã astuta e ardilosa, com olhos de águia para intrigas.',
    sede: 'Em uma fortaleza incrustada em desfiladeiros de altas montanhas.',
    membroIlustre: 'Um estrategista brilhante que nunca perdeu uma campanha.',
    ambicao: 'Controlar por completo as cadeiras e magistraturas políticas da região.',
    segredo: 'O assassinato misterioso de um fidalgo cometido nos aposentos do castelo há duas luas.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesCasas);
    const linhagem = pick(housesData.linhagens);
    const cor1 = pick(housesData.cores);
    const cor2 = pick(housesData.cores);
    const cores = cor1 === cor2 ? cor1 : `${cor1} & ${cor2}`;
    const brasao = pick(housesData.simbolos);
    const lema = pick(housesData.lemas);
    const patriarca = pick(housesData.patriarca_matriarca);
    const sede = pick(housesData.sede_poder);
    const membroIlustre = pick(housesData.membro_ilustre);
    const ambicao = pick(housesData.ambicoes);
    const segredo = pick(housesData.segredos);

    setData({
      nome,
      linhagem,
      cores,
      brasao,
      lema,
      patriarca,
      sede,
      membroIlustre,
      ambicao,
      segredo
    });

    addHistoryEntry('FACCAO', `[Casa Nobre] ${nome} | Lema: "${lema}"`);
  };

  const copy = () => {
    const text = `Casa Nobre: ${data.nome}
• Linhagem: ${data.linhagem}
• Estandarte: ${data.brasao} (Cores: ${data.cores})
• Lema da Casa: "${data.lema}"
• Liderança Atual: ${data.patriarca}
• Feudo / Sede: ${data.sede}
• Membro Ilustre da História: ${data.membroIlustre}
• Pretensão Política: ${data.ambicao}
• Segredo Escandaloso: ${data.segredo}`;

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
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2d1f3b] border border-[#6b357f] flex items-center justify-center text-purple-300 text-lg">
              👑
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Casas Nobres
              </h3>
              <p className="text-[11px] text-slate-400">Linhagens, Feudos & Conspirações</p>
            </div>
          </div>

          <button
            onClick={roll}
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Título da Casa */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar casa nobre"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-purple-300/90 italic font-serif">
            "{data.lema}"
          </p>
        </div>

        {/* Informações da Dinastia */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-purple-300 font-semibold">Linhagem:</strong> {data.linhagem}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Brasão:</strong> {data.brasao} ({data.cores})
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Patriarca/Matriarca:</strong> {data.patriarca}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Feudo / Sede:</strong> {data.sede}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Herói da Linhagem:</strong> {data.membroIlustre}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Ambição da Corte:</strong>
            <span className="text-slate-200">{data.ambicao}</span>
          </p>
          <p className="text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Segredo das Tapeçarias:</strong> {data.segredo}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Casa'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Sortear Linhagem
        </button>
      </div>
    </div>
  );
}