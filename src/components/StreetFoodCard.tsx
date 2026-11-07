import React, { useState } from 'react';
import streetFoodsData from '../data/street_foods.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

interface StallType {
  type: string;
  capacity: string;
  cost: string;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function StreetFoodCard() {
  const stalls = streetFoodsData.stalls as StallType[];

  const [data, setData] = useState({
    barraca: 'Carrinho Ambulante de Mão',
    capacidade: 'Prato único ligeiro, sem bebidas',
    custo: '1 a 4 moedas de cobre',
    apresentacao: 'No espeto rústico de bambu tostado',
    sabor: 'Doce e envolvente com calda de melaço',
    carne: 'Cortes desfiados de porco com melaço',
    mar: 'Mexilhões cozidos no vapor com vinho e louro',
    bebida: 'Cidra fresca e doce de maçã prensada',
    botanicaForma: 'Esférico perfeito com superfície lisa',
    botanicaOrigem: 'Minúsculo, cresce aos cachos em arbusto espinhoso',
    botanicaEfeito: 'Emite uma suave luminescência azulada no escuro'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const stall = pick(stalls);
    const apresentacao = pick(streetFoodsData.presentations);
    const sabor = pick(streetFoodsData.flavors);
    const carne = pick(streetFoodsData.meats);
    const mar = pick(streetFoodsData.seafood);
    const bebida = pick(streetFoodsData.drinks);
    const botanicaForma = pick(streetFoodsData.botany.shapes);
    const botanicaOrigem = pick(streetFoodsData.botany.growth);
    const botanicaEfeito = pick(streetFoodsData.botany.properties);

    setData({
      barraca: stall.type,
      capacidade: stall.capacity,
      custo: stall.cost,
      apresentacao,
      sabor,
      carne,
      mar,
      bebida,
      botanicaForma,
      botanicaOrigem,
      botanicaEfeito
    });

    addHistoryEntry('TAVERNA', `[Comida de Rua] ${stall.type} | Opção: ${carne}`);
  };

  const copy = () => {
    const text = `Comida de Rua: ${data.barraca} (Custo: ${data.custo})
- Apresentação & Sabor: ${data.apresentacao} (${data.sabor})
- Opção Terra: ${data.carne}
- Opção Maré: ${data.mar}
- Bebida da Banca: ${data.bebida}
- Fruto Raro na Praça: Fruto ${data.botanicaForma.toLowerCase()} (${data.botanicaOrigem.toLowerCase()}) — ${data.botanicaEfeito}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-sky-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-sky-400/40">✦</span>

      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e2038] border border-[#224870] flex items-center justify-center text-sky-300 text-lg">
              🍢
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Feira & Ambulantes
              </h3>
              <p className="text-[11px] text-slate-400">Comida de Rua & Frutas Raras</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="street-food" />
            <button
              type="button"
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.barraca}
            </h4>
            <button
              type="button"
              onClick={copy}
              title="Copiar comida de rua"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-sky-300/80 font-mono italic">
            {data.capacidade} • Custo: {data.custo}
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-sky-300 font-semibold">Formato:</strong> {data.apresentacao} ({data.sabor.toLowerCase()})
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Opção Terra:</strong> {data.carne}
          </p>
          <p>
            <strong className="text-cyan-300 font-semibold">Opção Maré:</strong> {data.mar}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Bebida da Banca:</strong> {data.bebida}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-emerald-200/90">
            <strong className="text-emerald-400 font-semibold block mb-0.5">Banca Botânica Exótica:</strong>
            <span className="text-slate-200">
              Fruto {data.botanicaForma.toLowerCase()} ({data.botanicaOrigem.toLowerCase()}). {data.botanicaEfeito}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          type="button"
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Barraca'}
        </button>
        <button
          type="button"
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Montar Banca
        </button>
      </div>
    </div>
  );
}