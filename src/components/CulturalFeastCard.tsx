import React, { useState } from 'react';
import type { CulturalFeastsData, CulturalFeastCulture, CulturalFeastResult } from '../types/gastronomy';
import culturalFeastsData from '../data/cultural_feasts.json';
import PinButton from './PinButton';

const data = culturalFeastsData as CulturalFeastsData;

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const rollCulturalFeast = (selectedCultureId?: string): CulturalFeastResult => {
  const culture: CulturalFeastCulture = selectedCultureId
    ? data.cultures.find((c) => c.id === selectedCultureId) || getRandomItem(data.cultures)
    : getRandomItem(data.cultures);

  return {
    cultureId: culture.id,
    cultureName: culture.name,
    origin: culture.origin,
    preparation: getRandomItem(culture.preparations),
    mainDish: getRandomItem(culture.main_dishes),
    sideDish: getRandomItem(culture.side_dishes),
    specialty: getRandomItem(culture.specialties),
    drink: getRandomItem(culture.drinks),
  };
};

interface CulturalFeastCardProps {
  initialFeast?: CulturalFeastResult;
}

export const CulturalFeastCard: React.FC<CulturalFeastCardProps> = ({ initialFeast }) => {
  const [feast, setFeast] = useState<CulturalFeastResult>(() => initialFeast || rollCulturalFeast());
  const [selectedCulture, setSelectedCulture] = useState<string>('random');

  const handleRoll = (cultureId?: string) => {
    const targetCulture = cultureId !== undefined ? cultureId : selectedCulture;
    setFeast(rollCulturalFeast(targetCulture === 'random' ? undefined : targetCulture));
  };

  const handleCultureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCultureId = e.target.value;
    setSelectedCulture(newCultureId);
    handleRoll(newCultureId);
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-900/40 bg-stone-900/90 p-5 shadow-xl backdrop-blur-sm transition-all hover:border-emerald-700/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏹</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-emerald-200 tracking-wide">
                Banquete Cultural
              </h3>
              <p className="text-xs text-stone-400">Tradições dos Povos & Ermos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRoll()}
              title="Sortear novo banquete"
              aria-label="Sortear novo banquete"
              className="rounded-lg border border-emerald-800/50 bg-stone-950/70 p-1.5 text-stone-300 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
            >
              🎲
            </button>
            <PinButton cardId="cultural-feast" />
          </div>
        </div>

        {/* Seletor Rápido de Cultura */}
        <div className="mt-3">
          <label htmlFor="culture-select" className="sr-only">Selecionar Cultura</label>
          <select
            id="culture-select"
            value={selectedCulture}
            onChange={handleCultureChange}
            className="w-full rounded-lg border border-emerald-950 bg-stone-950/80 px-2.5 py-1.5 text-xs text-emerald-300 focus:border-emerald-600 focus:outline-none"
          >
            <option value="random">🎲 Qualquer Cultura (Aleatório)</option>
            {data.cultures.map((c) => (
              <option key={c.id} value={c.id}>
                {c.origin} — {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 space-y-3 text-sm">
          <div className="rounded-lg bg-stone-950/60 p-3 border border-stone-800/60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">
                {feast.origin}
              </span>
              <span className="text-[10px] text-stone-400">{feast.cultureName}</span>
            </div>
            <p className="mt-1 font-serif text-base text-stone-100 font-semibold leading-snug">
              {feast.mainDish}
            </p>
            <p className="text-xs text-emerald-300/90 italic mt-0.5">{feast.preparation}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Guarnição da Terra
              </span>
              <p className="mt-0.5 text-xs text-stone-200">{feast.sideDish}</p>
            </div>

            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Iguaria / Petisco
              </span>
              <p className="mt-0.5 text-xs text-stone-200">{feast.specialty}</p>
            </div>
          </div>

          <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
              Libação & Bebida Cerimonial
            </span>
            <p className="mt-0.5 text-xs text-emerald-400 font-medium">{feast.drink}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800/50 flex justify-between items-center text-[11px] text-stone-500">
        <span>CulturalFeastCard</span>
        <span className="font-mono text-emerald-500/60">Povos & Facções</span>
      </div>
    </div>
  );
};

export default CulturalFeastCard;