import React, { useState } from 'react';
import type { StreetFoodsData, StreetFoodResult } from '../types/gastronomy';
import streetFoodsData from '../data/street_foods.json';
import PinButton from './PinButton';

const data = streetFoodsData as StreetFoodsData;

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const rollStreetFood = (): StreetFoodResult => ({
  stall: getRandomItem(data.stalls),
  presentation: getRandomItem(data.presentations),
  flavor: getRandomItem(data.flavors),
  meat: getRandomItem(data.meats),
  seafood: getRandomItem(data.seafood),
  drink: getRandomItem(data.drinks),
  botany: {
    growth: getRandomItem(data.botany.growth),
    shape: getRandomItem(data.botany.shapes),
    skin: getRandomItem(data.botany.skins),
    pulp: getRandomItem(data.botany.pulps),
    property: getRandomItem(data.botany.properties),
  },
});

interface StreetFoodCardProps {
  initialFood?: StreetFoodResult;
}

export const StreetFoodCard: React.FC<StreetFoodCardProps> = ({ initialFood }) => {
  const [food, setFood] = useState<StreetFoodResult>(() => initialFood || rollStreetFood());

  const handleRoll = () => {
    setFood(rollStreetFood());
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-sky-900/40 bg-stone-900/90 p-5 shadow-xl backdrop-blur-sm transition-all hover:border-sky-700/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-sky-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍢</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-sky-200 tracking-wide">
                Feira & Ambulantes
              </h3>
              <p className="text-xs text-stone-400">Comida de Rua & Frutas Raras</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRoll}
              title="Sortear nova comida de rua"
              aria-label="Sortear nova comida de rua"
              className="rounded-lg border border-sky-800/50 bg-stone-950/70 p-1.5 text-stone-300 hover:border-sky-500 hover:text-sky-300 transition-colors"
            >
              🎲
            </button>
            <PinButton cardId="street-food" />
          </div>
        </div>

        {/* Tipo de Banca & Custo */}
        <div className="mt-3 rounded-lg bg-stone-950/60 p-2.5 border border-stone-800/60 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-sky-400 block">{food.stall.type}</span>
            <span className="text-[11px] text-stone-400">{food.stall.capacity}</span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/40">
            {food.stall.cost}
          </span>
        </div>

        <div className="mt-3 space-y-3 text-sm">
          {/* Prato de Rua */}
          <div className="rounded-lg bg-stone-950/40 p-3 border border-stone-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                Apresentação & Perfil
              </span>
              <span className="text-[11px] text-stone-300 font-medium">{food.presentation}</span>
            </div>
            <p className="text-xs text-stone-400 italic">{food.flavor}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-stone-800/40 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Opção Terra:</span>
                <span className="text-amber-200 font-medium">{food.meat}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-semibold">Opção Maré:</span>
                <span className="text-cyan-200 font-medium">{food.seafood}</span>
              </div>
            </div>

            <div className="pt-1 text-xs">
              <span className="text-stone-500 block text-[10px] uppercase font-semibold">Bebida da Banca:</span>
              <span className="text-sky-300 font-medium">{food.drink}</span>
            </div>
          </div>

          {/* Botânica Exótica da Praça */}
          <div className="rounded-lg bg-stone-950/40 p-3 border border-stone-800/40">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
              Banca Botânica Exótica
            </span>
            <p className="text-xs text-stone-200 leading-snug">
              Fruto <span className="text-emerald-300 font-medium">{food.botany.shape.toLowerCase()}</span>, com casca {food.botany.skin.toLowerCase()} e polpa {food.botany.pulp.toLowerCase()}.
            </p>
            <p className="text-[11px] text-stone-400 mt-1">
              <span className="text-stone-500">Origem:</span> {food.botany.growth}.
            </p>
            <p className="text-xs text-emerald-300/90 mt-1 font-serif italic">
              ✦ {food.botany.property}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800/50 flex justify-between items-center text-[11px] text-stone-500">
        <span>StreetFoodCard</span>
        <span className="font-mono text-sky-500/60">Cidades & Feiras</span>
      </div>
    </div>
  );
};

export default StreetFoodCard;