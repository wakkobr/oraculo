import React, { useState } from 'react';
import troupesData from '../data/troupes.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function TroupeCard() {
  const [data, setData] = useState({
    nome: 'Os Menestréis da Máscara Dourada',
    transporte: 'Em uma carroça cigana pintada e colorida, puxada por belos corcéis.',
    reputacao: 'Sátira política mordaz e escárnio da nobreza local.',
    divulgacao: 'Pequenas encenações e esquetes teatrais nas esquinas mais movimentadas.',
    partida: 'Sob ameaça direta de masmorra expedida por um senhor feudal ofendido.',
    boato: 'É, na verdade, um fora da lei famigerado e procurado pela coroa sob disfarce impecável.'
  });
  const [copied, setCopied] = useState(false);

  const nomesTrupe = [
    'Os Menestréis da Máscara Dourada',
    'Companhia do Corvo Prateado',
    'O Grande Circo de Papel & Sombras',
    'A Caravana dos Bufões Errantes',
    'Os Histriões do Velho Rei',
    'Teatro Mambembe da Lua Cheia',
    'Os Saltimbancos da Torre Despedaçada',
    'O Espelho de Prata & Cobre'
  ];

  const roll = () => {
    const nome = pick(nomesTrupe);
    const transporte = pick(troupesData.transporte);
    const reputacao = pick(troupesData.reputacao);
    const divulgacao = pick(troupesData.divulgacao);
    const partida = pick(troupesData.partida_anterior);
    const boato = pick(troupesData.boato_secreto);

    setData({
      nome,
      transporte,
      reputacao,
      divulgacao,
      partida,
      boato
    });

    addHistoryEntry('FACCAO' as any, `[Trupe] ${nome} | Especialidade: ${reputacao}`);
  };

  const copy = () => {
    const text = `Companhia Artística: ${data.nome}\n• Locomoção: ${data.transporte}\n• Fama/Estilo: ${data.reputacao}\n• Anúncio: ${data.divulgacao}\n• Última Parada: ${data.partida}\n• Boato Secreto: ${data.boato}`;
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
            <div className="w-9 h-9 rounded-lg bg-[#2b172a] border border-[#6b2567] flex items-center justify-center text-pink-300 text-lg">
              🎪
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Trupe Itinerante</h3>
              <p className="text-[11px] text-slate-400">Facções & Artistas Mambembes</p>
            </div>
          </div>
          <PinButton cardId="trupes" />
          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Título da Trupe Sorteada */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button onClick={copy} title="Copiar trupe" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
              📋
            </button>
          </div>
        </div>

        {/* Detalhes da Companhia */}
        <div className="space-y-2 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p><strong className="text-pink-300 font-semibold">Viagem:</strong> {data.transporte}</p>
          <p><strong className="text-pink-300 font-semibold">Espetáculo:</strong> {data.reputacao}</p>
          <p><strong className="text-pink-300 font-semibold">Divulgação:</strong> {data.divulgacao}</p>
          <p><strong className="text-amber-300/90 font-semibold">Origem:</strong> {data.partida}</p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5">
            <strong className="text-rose-400 font-semibold block mb-0.5">Segredo dos Bastidores:</strong>
            <span className="text-rose-200/90 italic font-serif leading-snug block">"{data.boato}"</span>
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Trupe'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Sortear Trupe
        </button>
      </div>
    </div>
  );
}