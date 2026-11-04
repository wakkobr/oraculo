import React, { useState } from 'react';
import booksData from '../data/books.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function BookCard() {
  const [data, setData] = useState({
    titulo: '50 COISAS PARA FAZER COM UM LICH MORTO',
    encadernacao: 'Volume encadernado em tábuas de carvalho presas por tiras de bronze.',
    nota: 'Há anotações apressadas a carvão nas margens dos primeiros capítulos.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const titulo = pick(booksData.livros).toUpperCase();
    const encadernacao = pick(booksData.encadernacoes);
    const nota = pick(booksData.notas);

    setData({ titulo, encadernacao, nota });
    // Registra no histórico como LIVRO
    addHistoryEntry('LIVRO' as any, titulo);
  };

  const copy = () => {
    const text = `Tomo / Livro: ${data.titulo}\nFormato: ${data.encadernacao}\nParticularidade: ${data.nota}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-indigo-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-indigo-400/40">✦</span>

      <div>
        {/* Topo do Card */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#14232a] border border-[#214b5c] flex items-center justify-center text-teal-300 text-lg">
              📚
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Tomos & Livros</h3>
              <p className="text-[11px] text-slate-400">Obras de estante & manuscritos</p>
            </div>
          </div>
          <PinButton cardId="tomos" />
          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Caixa de Resultado Sorteado */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Obra Sorteada:</span>
            <button onClick={copy} title="Copiar título" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors">
              📋
            </button>
          </div>
          <h4 className="text-base md:text-lg font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide leading-snug">
            {data.titulo}
          </h4>
        </div>

        {/* Detalhes Físicos */}
        <div className="space-y-2.5 text-xs text-slate-300 mb-6 leading-relaxed">
          <p><strong className="text-slate-100 font-semibold">Volume:</strong> {data.encadernacao}</p>
          <p><strong className="text-slate-100 font-semibold">Anotação:</strong> {data.nota}</p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Obra'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Rolar Livro
        </button>
      </div>
    </div>
  );
}