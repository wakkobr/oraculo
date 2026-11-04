import React, { useState } from 'react';
import vignettesData from '../data/vignettes.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type AmbientKey = 'dungeon' | 'village' | 'city' | 'forest' | 'sea';

export default function VignetteCard() {
  const [ambient, setAmbient] = useState<AmbientKey>('dungeon');
  const [data, setData] = useState({
    ambienteNome: 'Masmorra & Catacumbas',
    texto: 'Um rato passa correndo carregando um osso de dedo humano com um anel de ouro engastado.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const pool = vignettesData.ambientes[ambient];
    const texto = pick(pool.itens);

    setData({
      ambienteNome: pool.nome,
      texto
    });

    addHistoryEntry('ENCONTRO', `[${pool.nome}] ${texto}`);
  };

  const copy = () => {
    const text = `Cena (${data.ambienteNome}):\n${data.texto}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1f1938] border border-[#443673] flex items-center justify-center text-amber-200 text-lg">
              🎭
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Cenas & Detalhes</h3>
              <p className="text-[11px] text-slate-400">Ganchos visuais e eventos locais</p>
            </div>
          </div>
          <PinButton cardId="cenas" />
          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Seletor de Ambiente */}
        <div className="mb-3">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Local / Ambiente:</label>
          <select 
            value={ambient} 
            onChange={(e) => setAmbient(e.target.value as AmbientKey)}
            className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
          >
            <option value="dungeon">💀 Masmorra & Catacumbas</option>
            <option value="village">🌾 Aldeia Idílica</option>
            <option value="city">🐀 Cidade Decadente</option>
            <option value="forest">🌲 Floresta Ancestral</option>
            <option value="sea">⛵ Em Alto-Mar</option>
          </select>
        </div>

        {/* Bloco de Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/80">O que vocês observam:</span>
            <button onClick={copy} title="Copiar cena" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
              📋
            </button>
          </div>
        </div>

        {/* Texto da Cena */}
        <div className="text-xs text-slate-200 mb-6 leading-relaxed bg-[#090d1f]/60 p-3.5 rounded-lg border border-[#1d2342] min-h-19.5 flex items-center">
          <p className="italic font-serif">"{data.texto}"</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Cena'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Sortear Cena
        </button>
      </div>
    </div>
  );
}