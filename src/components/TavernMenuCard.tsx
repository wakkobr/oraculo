import React, { useState } from 'react';
import type { TavernMenusData, TavernMealResult } from '../types/gastronomy';
import tavernMenusData from '../data/tavern_menus.json';
import PinButton from './PinButton';

const data = tavernMenusData as TavernMenusData;

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const rollTavernMeal = (): TavernMealResult => ({
  preparation: getRandomItem(data.preparations),
  protein: getRandomItem(data.proteins),
  base: getRandomItem(data.bases),
  vegetable: getRandomItem(data.vegetables),
  breadOrSide: getRandomItem(data.breads_and_sides),
  drink: getRandomItem(data.drinks),
});

interface TavernMenuCardProps {
  initialMeal?: TavernMealResult;
}

export const TavernMenuCard: React.FC<TavernMenuCardProps> = ({ initialMeal }) => {
  const [meal, setMeal] = useState<TavernMealResult>(() => initialMeal || rollTavernMeal());

  const handleRoll = () => {
    setMeal(rollTavernMeal());
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-900/40 bg-stone-900/90 p-5 shadow-xl backdrop-blur-sm transition-all hover:border-amber-700/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-amber-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍺</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-200 tracking-wide">
                Mesa da Estalagem
              </h3>
              <p className="text-xs text-stone-400">Cardápio do Dia & Prato Quente</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRoll}
              title="Sortear nova refeição"
              aria-label="Sortear nova refeição"
              className="rounded-lg border border-amber-800/50 bg-stone-950/70 p-1.5 text-stone-300 hover:border-amber-600 hover:text-amber-300 transition-colors"
            >
              🎲
            </button>
            <PinButton cardId="tavern-menu" />
          </div>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-lg bg-stone-950/60 p-3 border border-stone-800/60">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-500">
              Preparo & Prato Principal
            </span>
            <p className="mt-1 font-serif text-base text-stone-100 font-semibold leading-snug">
              {meal.protein}
            </p>
            <p className="text-xs text-amber-300/90 italic mt-0.5">{meal.preparation}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Base & Amido
              </span>
              <p className="mt-0.5 text-xs text-stone-200">{meal.base}</p>
            </div>

            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Legumes & Guarnição
              </span>
              <p className="mt-0.5 text-xs text-stone-200">{meal.vegetable}</p>
            </div>

            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Cesto de Pães & Queijo
              </span>
              <p className="mt-0.5 text-xs text-stone-200">{meal.breadOrSide}</p>
            </div>

            <div className="rounded-lg bg-stone-950/40 p-2.5 border border-stone-800/40">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-stone-400">
                No Caneco
              </span>
              <p className="mt-0.5 text-xs text-amber-400 font-medium">{meal.drink}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800/50 flex justify-between items-center text-[11px] text-stone-500">
        <span>TavernMenuCard</span>
        <span className="font-mono text-amber-500/60">Tavernas & Estalagens</span>
      </div>
    </div>
  );
};

export default TavernMenuCard;