import React, { useState } from 'react';
import spellsData from '../data/spells.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type SpellClass = 'mago' | 'bruxo' | 'feiticeiro' | 'clerigo' | 'druida' | 'bardo' | 'paladino' | 'guardiao';

const classLabels: Record<SpellClass, string> = {
  mago: 'Mago',
  feiticeiro: 'Feiticeiro',
  bruxo: 'Bruxo',
  clerigo: 'Clérigo',
  druida: 'Druida',
  bardo: 'Bardo',
  paladino: 'Paladino',
  guardiao: 'Guardião'
};

export default function SpellCard() {
  const [selectedClass, setSelectedClass] = useState<SpellClass>('mago');
  const [selectedLevel, setSelectedLevel] = useState<string>('3');
  
  const [data, setData] = useState({
    nome: 'Bola de Fogo',
    detalhe: 'Magia de 3º Círculo / Nível',
    sub: 'Grimório de Mago'
  });
  const [copied, setCopied] = useState(false);

  // Paladino e Guardião só conjuram de 1º a 5º nível
  const isHalfCaster = selectedClass === 'paladino' || selectedClass === 'guardiao';
  const availableLevels = isHalfCaster 
    ? ['1', '2', '3', '4', '5'] 
    : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const handleClassChange = (newClass: SpellClass) => {
    setSelectedClass(newClass);
    if ((newClass === 'paladino' || newClass === 'guardiao') && (selectedLevel === '0' || Number(selectedLevel) > 5)) {
      setSelectedLevel('1');
    }
  };

  const roll = () => {
    const classSpells = spellsData.classes[selectedClass] as Record<string, string[]>;
    const spellList = classSpells[selectedLevel] || classSpells['1'] || [];

    if (spellList.length === 0) return;

    const nomeMagia = pick(spellList);
    const nivelLabel = selectedLevel === '0' ? 'Truque Mágico' : `Magia de ${selectedLevel}º Círculo`;
    const classeLabel = classLabels[selectedClass];

    setData({
      nome: nomeMagia,
      detalhe: nivelLabel,
      sub: `Grimório de ${classeLabel}`
    });

    addHistoryEntry('MAGIA', `${nomeMagia} (${classeLabel}, ${nivelLabel})`);
  };

  const copy = () => {
    const text = `Magia: ${data.nome}\n${data.detalhe} - ${data.sub}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#27153b] border border-[#582885] flex items-center justify-center text-purple-300 text-lg">
              ✨
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Grimório Arcano</h3>
              <p className="text-[11px] text-slate-400">Magias por Classe & Círculo</p>
            </div>
          </div>
          <PinButton cardId="taverna" />
          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Seletores Combinados: Classe E Círculo */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Classe:</label>
            <select 
              value={selectedClass} 
              onChange={(e) => handleClassChange(e.target.value as SpellClass)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
            >
              <option value="mago">Mago</option>
              <option value="feiticeiro">Feiticeiro</option>
              <option value="bruxo">Bruxo</option>
              <option value="clerigo">Clérigo</option>
              <option value="druida">Druida</option>
              <option value="bardo">Bardo</option>
              <option value="paladino">Paladino</option>
              <option value="guardiao">Guardião</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Círculo:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
            >
              {availableLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl === '0' ? 'Truques (Nível 0)' : `${lvl}º Nível`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bloco de Resultado Sorteado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base md:text-lg font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button onClick={copy} title="Copiar magia" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
              📋
            </button>
          </div>
        </div>

        {/* Detalhes da Magia */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p><strong className="text-purple-300 font-semibold">Círculo:</strong> {data.detalhe}</p>
          <p><strong className="text-purple-300 font-semibold">Conjurador:</strong> {data.sub}</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Magia'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Conjurar Magia
        </button>
      </div>
    </div>
  );
}