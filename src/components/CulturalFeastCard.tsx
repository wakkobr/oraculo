import React, { useState } from 'react';
import culturalFeastsData from '../data/cultural_feasts.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

interface CultureType {
  id: string;
  name: string;
  origin: string;
  preparations: string[];
  main_dishes: string[];
  side_dishes: string[];
  specialties: string[];
  drinks: string[];
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function CulturalFeastCard() {
  const cultures = culturalFeastsData.cultures as CultureType[];

  const [selectedCultureId, setSelectedCultureId] = useState<string>('random');
  const [data, setData] = useState({
    cultura: 'Anões da Montanha',
    reino: 'Cidadelas de Pedra',
    preparo: 'Assado em forno de pedra selado',
    pratoPrincipal: 'Costela grossa de javali com melaço de cevada',
    guarnicao: 'Batatas douradas assadas nas cinzas da forja',
    especialidade: 'Pão de sementes de papoula com linguiça curada de cervo',
    bebida: 'Stout mastigável de cevada torrada com café'
  });
  const [copied, setCopied] = useState(false);

  const roll = (cultureIdOverride?: string) => {
    const targetId = cultureIdOverride !== undefined ? cultureIdOverride : selectedCultureId;
    const culture: CultureType = targetId === 'random'
      ? pick(cultures)
      : cultures.find((c) => c.id === targetId) || cultures[0];

    const preparo = pick(culture.preparations);
    const pratoPrincipal = pick(culture.main_dishes);
    const guarnicao = pick(culture.side_dishes);
    const especialidade = pick(culture.specialties);
    const bebida = pick(culture.drinks);

    setData({
      cultura: culture.origin,
      reino: culture.name,
      preparo,
      pratoPrincipal,
      guarnicao,
      especialidade,
      bebida
    });

    addHistoryEntry('TAVERNA', `[Banquete Cultural] ${pratoPrincipal} (${culture.origin})`);
  };

  const handleCultureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedCultureId(newId);
    roll(newId);
  };

  const copy = () => {
    const text = `Banquete Cultural: ${data.pratoPrincipal}
- Povo / Tradição: ${data.cultura} (${data.reino})
- Fogo & Preparo: ${data.preparo}
- Guarnição da Terra: ${data.guarnicao}
- Iguaria / Especialidade: ${data.especialidade}
- Libação Cerimonial: ${data.bebida}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-emerald-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-emerald-400/40">✦</span>

      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#102418] border border-[#235c36] flex items-center justify-center text-emerald-300 text-lg">
              🏹
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Banquete Cultural
              </h3>
              <p className="text-[11px] text-slate-400">Tradições dos Povos & Ermos</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="cultural-feast" />
            <button
              type="button"
              onClick={() => roll()}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="culture-select-card" className="sr-only">Filtrar Cultura</label>
          <select
            id="culture-select-card"
            value={selectedCultureId}
            onChange={handleCultureChange}
            className="w-full rounded-md border border-[#232b50] bg-[#0c1022] px-2.5 py-1 text-xs text-slate-200 focus:border-oracle-gold/50 focus:outline-none"
          >
            <option value="random">🎲 Qualquer Cultura (Aleatório)</option>
            {cultures.map((c) => (
              <option key={c.id} value={c.id}>
                {c.origin} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.pratoPrincipal}
            </h4>
            <button
              type="button"
              onClick={copy}
              title="Copiar banquete"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-emerald-300/80 font-mono italic">
            {data.cultura} • {data.reino} — "{data.preparo}"
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-emerald-300 font-semibold">Guarnição da Terra:</strong> {data.guarnicao}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Iguaria / Petisco:</strong> {data.especialidade}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-emerald-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Libação Cerimonial:</strong>
            <span className="text-slate-200">{data.bebida}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          type="button"
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Banquete'}
        </button>
        <button
          type="button"
          onClick={() => roll()}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Celebrar Festim
        </button>
      </div>
    </div>
  );
}