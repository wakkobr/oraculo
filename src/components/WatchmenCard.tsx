import React, { useState } from 'react';
import watchData from '../data/watchmen.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type WatchMode = 'guarnicao' | 'investigador' | 'guarda';

const nomesGuarda = [
  'A Guarda do Portão Norte',
  'Os Vigias da Torre do Relógio',
  'A Patrulha do Falcão Azul',
  'Os Casacas-de-Ferro do Cais',
  'A Guarda Noturna da Baixa',
  'A Milícia da Praça das Armas',
  'Os Escudeiros da Sentinela Solitária',
  'A Guarnição da Ponte de Pedra'
];

export default function WatchmenCard() {
  const [mode, setMode] = useState<WatchMode>('guarnicao');

  // Estado da Guarnição
  const [garrisonState, setGarrisonState] = useState({
    nome: 'A Guarda do Portão Norte',
    cores: 'Azul-marinho profundo & Prata / Cinza-claro',
    simbolo: 'Um escudo chanfrado de guarnição.',
    capitao: 'Um veterano encardido e cínico que já viu de tudo nas ruas da cidade.',
    moral: 'Respeitosa, profissional e atenta às ordens do regulamento.',
    reputacao: 'Confiabilidade constante: chegam antes do segundo grito de socorro.',
    equipamento: 'Elmos cônicos polidos e peitorais de aço com o brasão oficial da metrópole empunhando alabardas imponentes para controle de multidão e adagas afiadas.'
  });

  // Estado do Investigador
  const [constableState, setConstableState] = useState({
    perfil: 'Um acadêmico erudito formado nas grandes bibliotecas reais.',
    rosto: 'Olhos atentos, penetrantes e clínicos que reparam em milímetros.',
    motivacao: 'Pelo puro fascínio mental de desatar nós e solucionar enigmas criminais.',
    item: 'Uma lente de aumento de cristal polido em armação de bronze.'
  });

  // Estado do Guarda Comum
  const [guardState, setGuardState] = useState({
    perfil: 'O filho de um carvoeiro ou pescador das docas.',
    rosto: 'Expressão obstinada e queixo erguido de soldado vigilante.',
    motivacao: 'Pelo soldo regular e tigela de ensopado quente garantida.',
    item: 'Um cantil de couro cheio de vinho tinto barato escondido sob o manto.'
  });

  const [copied, setCopied] = useState(false);

  const roll = () => {
    if (mode === 'guarnicao') {
      const nome = pick(nomesGuarda);
      const cor1 = pick(watchData.cores);
      const cor2 = pick(watchData.cores);
      const cores = cor1 === cor2 ? cor1 : `${cor1} & ${cor2}`;
      const simbolo = pick(watchData.simbolos);
      const capitao = pick(watchData.capitaes);
      const moral = pick(watchData.moral_tropa);
      const reputacao = pick(watchData.reputacao);
      const fardamento = pick(watchData.fardamentos);
      const armamento = pick(watchData.armamentos);
      const equipamento = `${fardamento} empunhando ${armamento.toLowerCase()}`;

      setGarrisonState({
        nome,
        cores,
        simbolo,
        capitao,
        moral,
        reputacao,
        equipamento
      });

      addHistoryEntry('FACCAO', `[Guarda Urbana] ${nome} | Capitão: ${capitao}`);
    } else if (mode === 'investigador') {
      const perfil = pick(watchData.investigador.perfil);
      const rosto = pick(watchData.investigador.rosto);
      const motivacao = pick(watchData.investigador.motivacao);
      const item = pick(watchData.investigador.item);

      setConstableState({
        perfil,
        rosto,
        motivacao,
        item
      });

      addHistoryEntry('NPC', `[Investigador da Guarda] ${perfil} | Motivação: ${motivacao}`);
    } else {
      const perfil = pick(watchData.guarda.perfil);
      const rosto = pick(watchData.guarda.rosto);
      const motivacao = pick(watchData.guarda.motivacao);
      const item = pick(watchData.guarda.item);

      setGuardState({
        perfil,
        rosto,
        motivacao,
        item
      });

      addHistoryEntry('NPC', `[Guarda da Patrulha] ${perfil} | Motivação: ${motivacao}`);
    }
  };

  const copy = () => {
    let text = '';
    if (mode === 'guarnicao') {
      text = `Guarda Urbana: ${garrisonState.nome}
• Estandarte & Cores: ${garrisonState.cores} (Insígnia: ${garrisonState.simbolo})
• Comando: ${garrisonState.capitao}
• Moral da Tropa: ${garrisonState.moral}
• Fama nas Ruas: ${garrisonState.reputacao}
• Equipamento Padrão: ${garrisonState.equipamento}`;
    } else if (mode === 'investigador') {
      text = `Oficial Investigador / Meirinho:
• Perfil: ${constableState.perfil}
• Traço Facial: ${constableState.rosto}
• Por Que Investiga: ${constableState.motivacao}
• Carrega Consigo: ${constableState.item}`;
    } else {
      text = `Soldado da Patrulha:
• Perfil: ${guardState.perfil}
• Traço Facial: ${guardState.rosto}
• Por Que Serve: ${guardState.motivacao}
• Carrega na Algibeira: ${guardState.item}`;
    }

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
            <div className="w-9 h-9 rounded-lg bg-[#142338] border border-[#234b7a] flex items-center justify-center text-sky-400 text-lg">
              🛡️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Guardas Urbanos
              </h3>
              <p className="text-[11px] text-slate-400">Patrulhas, Investigadores & Rondas</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="guardas-urbanos" />
            <button
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Alternador de Modo */}
        <div className="mb-3">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Visualizar:</label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0a0d1d] border border-[#252b4e] rounded-lg">
            <button
              onClick={() => setMode('guarnicao')}
              className={`py-1 text-[11px] rounded font-medium transition-all ${
                mode === 'guarnicao'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏰 Guarnição
            </button>
            <button
              onClick={() => setMode('investigador')}
              className={`py-1 text-[11px] rounded font-medium transition-all ${
                mode === 'investigador'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔍 Oficial
            </button>
            <button
              onClick={() => setMode('guarda')}
              className={`py-1 text-[11px] rounded font-medium transition-all ${
                mode === 'guarda'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚔️ Patrulheiro
            </button>
          </div>
        </div>

        {/* Título do Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {mode === 'guarnicao'
                ? garrisonState.nome
                : mode === 'investigador'
                ? 'Oficial Investigador'
                : 'Soldado de Patrulha'}
            </h4>
            <button
              onClick={copy}
              title="Copiar dados"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-sky-300/80 font-mono">
            {mode === 'guarnicao'
              ? `${garrisonState.cores} • ${garrisonState.simbolo}`
              : mode === 'investigador'
              ? constableState.perfil
              : guardState.perfil}
          </p>
        </div>

        {/* Conteúdo Dinâmico */}
        {mode === 'guarnicao' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-sky-300 font-semibold">Comando:</strong> {garrisonState.capitao}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Espírito da Tropa:</strong> {garrisonState.moral}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Armamento:</strong> {garrisonState.equipamento}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Fama nos Bairros:</strong>
              <span className="text-slate-200">{garrisonState.reputacao}</span>
            </p>
          </div>
        ) : mode === 'investigador' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-sky-300 font-semibold">Perfil:</strong> {constableState.perfil}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Semblante:</strong> {constableState.rosto}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Por Que Serve:</strong> {constableState.motivacao}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Pertence Pessoal:</strong>
              <span className="text-slate-300 italic font-serif">{constableState.item}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-sky-300 font-semibold">Perfil:</strong> {guardState.perfil}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Semblante:</strong> {guardState.rosto}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Por Que Serve:</strong> {guardState.motivacao}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Na Algibeira:</strong>
              <span className="text-slate-300 italic font-serif">{guardState.item}</span>
            </p>
          </div>
        )}
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> {mode === 'guarnicao' ? 'Sortear Guarda' : mode === 'investigador' ? 'Gerar Oficial' : 'Gerar Ronda'}
        </button>
      </div>
    </div>
  );
}