import React, { useState } from 'react';
import tavernMenusData from '../data/tavern_menus.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function TavernMenuCard() {
  const [data, setData] = useState({
    preparo: 'Ensopado lentamente no caldeirão de ferro fundido',
    proteina: 'Coelho silvestre ou lebre da mata',
    base: 'Purê rústico de nabo amanteigado',
    vegetal: 'Raízes assadas nas cinzas (cenouras e nabos)',
    panificacao: 'Pão rústico de centeio de casca grossa',
    bebida: 'Cerveja amarga da casa (Bitter ale)'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const preparo = pick(tavernMenusData.preparations);
    const proteina = pick(tavernMenusData.proteins);
    const base = pick(tavernMenusData.bases);
    const vegetal = pick(tavernMenusData.vegetables);
    const panificacao = pick(tavernMenusData.breads_and_sides);
    const bebida = pick(tavernMenusData.drinks);

    setData({
      preparo,
      proteina,
      base,
      vegetal,
      panificacao,
      bebida
    });

    addHistoryEntry('TAVERNA', `[Mesa da Estalagem] ${proteina} | Bebida: ${bebida}`);
  };

  const copy = () => {
    const text = `Mesa da Estalagem: ${data.proteina}
- Método de Preparo: ${data.preparo}
- Base & Carboidrato: ${data.base}
- Legumes & Guarnição: ${data.vegetal}
- Pão & Acompanhamento: ${data.panificacao}
- No Caneco: ${data.bebida}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-amber-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-amber-400/40">✦</span>

      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2a1c12] border border-[#6b4226] flex items-center justify-center text-amber-300 text-lg">
              🍺
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Mesa da Estalagem
              </h3>
              <p className="text-[11px] text-slate-400">Cardápio do Dia & Prato Quente</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="tavern-menu" />
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
              {data.proteina}
            </h4>
            <button
              type="button"
              onClick={copy}
              title="Copiar menu"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-amber-300/80 font-mono italic">
            "{data.preparo}"
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-oracle-gold font-semibold">Base & Amido:</strong> {data.base}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Legumes & Guarnição:</strong> {data.vegetal}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Cesto de Pães:</strong> {data.panificacao}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">No Caneco:</strong>
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
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Menu'}
        </button>
        <button
          type="button"
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Servir Mesa
        </button>
      </div>
    </div>
  );
}