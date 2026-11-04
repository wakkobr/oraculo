import React, { useState } from 'react';
import spellsData from '../data/spells.json';
import { addHistoryEntry } from '../utils/history';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function SpellCard() {
  const [mode, setMode] = useState<'nivel' | 'classe'>('nivel');
  const [selectedLevel, setSelectedLevel] = useState<string>('3');
  const [selectedClass, setSelectedClass] = useState<string>('mago');
  
  const [data, setData] = useState({
    nome: 'Bola de Fogo',
    detalhe: 'Magia de 3º Nível (Evocação)',
    sub: 'Arcana / Mago & Feiticeiro'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    let nomeMagia = '';
    let detalheStr = '';
    let subStr = '';

    if (mode === 'nivel') {
      const list = spellsData.por_nivel[selectedLevel as keyof typeof spellsData.por_nivel] || spellsData.por_nivel['1'];
      nomeMagia = pick(list);
      detalheStr = selectedLevel === '0' ? 'Truque Mágico' : `Magia de ${selectedLevel}º Círculo / Nível`;
      subStr = 'Sorteada por Círculo Arcano';
    } else {
      const list = spellsData.por_classe[selectedClass as keyof typeof spellsData.por_classe] || spellsData.por_classe.mago;
      nomeMagia = pick(list);
      const cLabel = selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1);
      detalheStr = `Grimório de ${cLabel}`;
      subStr = `Lista de Conjurador: ${cLabel}`;
    }

    setData({
      nome: nomeMagia,
      detalhe: detalheStr,
      sub: subStr
    });

    addHistoryEntry('MAGIA' as any, `${nomeMagia} (${detalheStr})`);
  };

  const copy = () => {
    const text = `Magia Sorteada: ${data.nome}\n${data.detalhe} - ${data.sub}`;
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
              <p className="text-[11px] text-slate-400">Magias por Nível ou Classe</p>
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

        {/* Seletores: Modo e Filtro */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Filtrar por:</label>
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value as 'nivel' | 'classe')}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
            >
              <option value="nivel">📖 Círculo (Nível)</option>
              <option value="classe">🧙 Classe</option>
            </select>
          </div>

          <div>
            {mode === 'nivel' ? (
              <>
                <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Círculo:</label>
                <select 
                  value={selectedLevel} 
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
                >
                  <option value="0">Truques (Nível 0)</option>
                  <option value="1">1º Nível</option>
                  <option value="2">2º Nível</option>
                  <option value="3">3º Nível</option>
                  <option value="4">4º Nível</option>
                  <option value="5">5º Nível</option>
                  <option value="6">6º Nível</option>
                  <option value="7">7º Nível</option>
                  <option value="8">8º Nível</option>
                  <option value="9">9º Nível</option>
                </select>
              </>
            ) : (
              <>
                <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Classe:</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
                >
                  <option value="mago">Mago</option>
                  <option value="feiticeiro">Feiticeiro</option>
                  <option value="bruxo">Bruxo</option>
                  <option value="clerigo">Clérigo</option>
                  <option value="druida">Druida</option>
                  <option value="bardo">Bardo</option>
                </select>
              </>
            )}
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
          <p><strong className="text-purple-300 font-semibold">Classificação:</strong> {data.detalhe}</p>
          <p><strong className="text-purple-300 font-semibold">Origem:</strong> {data.sub}</p>
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