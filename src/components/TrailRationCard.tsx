import React, { useState } from 'react';
import type { TrailRationsData, TrailRationArchetype, TrailRationResult } from '../types/gastronomy';
import trailRationsData from '../data/trail_rations.json';
import PinButton from './PinButton';

const data = trailRationsData as TrailRationsData;

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const rollTrailRation = (): TrailRationResult => ({
  ration: getRandomItem(data.ration_archetypes),
  wine: {
    terroir: getRandomItem(data.wines.terroirs),
    body: getRandomItem(data.wines.bodies),
    aroma: getRandomItem(data.wines.aromas),
    flavorNotes: getRandomItem(data.wines.flavor_notes),
    service: getRandomItem(data.wines.vessels_and_service),
    legend: getRandomItem(data.wines.legends),
  },
});

interface TrailRationCardProps {
  initialRation?: TrailRationResult;
}

export const TrailRationCard: React.FC<TrailRationCardProps> = ({ initialRation }) => {
  const [rationResult, setRationResult] = useState<TrailRationResult>(() => initialRation || rollTrailRation());

  const handleRoll = () => {
    setRationResult(rollTrailRation());
  };

  const { ration, wine } = rationResult;

  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-900/40 bg-stone-900/90 p-5 shadow-xl backdrop-blur-sm transition-all hover:border-purple-700/60 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎒</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-purple-200 tracking-wide">
                Logística de Trilha & Adega
              </h3>
              <p className="text-xs text-stone-400">Rações de Marcha & Safras de Vinho</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRoll}
              title="Sortear nova ração e vinho"
              aria-label="Sortear nova ração e vinho"
              className="rounded-lg border border-purple-800/50 bg-stone-950/70 p-1.5 text-stone-300 hover:border-purple-500 hover:text-purple-300 transition-colors"
            >
              🎲
            </button>
            <PinButton cardId="trail-ration" />
          </div>
        </div>

        <div className="mt-3 space-y-3 text-sm">
          {/* Fardo de Ração */}
          <div className="rounded-lg bg-stone-950/60 p-3 border border-stone-800/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300 font-serif">
                {ration.name}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">1 Dia de Viagem</span>
            </div>
            <p className="text-xs text-stone-400 italic mt-0.5">{ration.description}</p>

            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] border-t border-stone-800/40 pt-2">
              <div>
                <span className="text-stone-500 block uppercase font-semibold">Proteína Seca:</span>
                <span className="text-stone-200">{ration.meat}</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase font-semibold">Pão de Guarda:</span>
                <span className="text-stone-200">{ration.bread}</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase font-semibold">Conserva Ácida:</span>
                <span className="text-stone-200">{ration.pickle}</span>
              </div>
              <div>
                <span className="text-stone-500 block uppercase font-semibold">Castanhas & Frutos:</span>
                <span className="text-stone-200">{ration.nuts} • {ration.fruit}</span>
              </div>
            </div>

            <div className="mt-2 pt-1 border-t border-stone-800/40 text-[11px]">
              <span className="text-stone-500 uppercase font-semibold">Caldeirão de Fogueira: </span>
              <span className="text-purple-300 font-medium">{ration.pot_boil}</span>
            </div>
          </div>

          {/* Adega & Vinho de Guarda */}
          <div className="rounded-lg bg-stone-950/40 p-3 border border-stone-800/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400">
                Garrafa Selecionada da Adega
              </span>
              <span className="text-xs">🍷</span>
            </div>

            <p className="text-xs font-medium text-stone-200 mt-1">
              {wine.body} <span className="text-stone-400 font-normal">vindimado em</span> {wine.terroir.toLowerCase()}.
            </p>

            <div className="mt-2 text-xs text-stone-300 space-y-1">
              <p><span className="text-stone-500">Bouquet & Notas:</span> {wine.aroma}; notas de {wine.flavorNotes.toLowerCase()}.</p>
              <p><span className="text-stone-500">Serviço:</span> {wine.service}.</p>
            </div>

            <p className="mt-2 text-xs italic text-rose-300/90 border-t border-stone-800/40 pt-1.5 font-serif">
              "{wine.legend}"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-stone-800/50 flex justify-between items-center text-[11px] text-stone-500">
        <span>TrailRationCard</span>
        <span className="font-mono text-purple-500/60">Logística & Ermos</span>
      </div>
    </div>
  );
};

export default TrailRationCard;