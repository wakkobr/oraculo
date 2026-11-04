import React, { useState } from 'react';
import piratesData from '../data/pirates.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type PirateMode = 'tripulacao' | 'pirata';

const nomesTripulacao = [
  'A Confraria da Caveira Escarlate',
  'Os Cães do Mar Salgado',
  'A Fúria dos Sete Mares',
  'Os Renegados da Quilha Negra',
  'O Terror do Mar Interior',
  'Os Saqueadores do Cabo da Morte',
  'A Irmandade da Tempestade',
  'Os Esqueletos da Manhã'
];

export default function PirateCrewCard() {
  const [mode, setMode] = useState<PirateMode>('tripulacao');

  // Estado da Tripulação
  const [crewState, setCrewState] = useState({
    nome: 'Os Renegados da Quilha Negra',
    navio: 'Uma escuna veloz de dois mastros perfeita para perseguições (Laden with treasure).',
    bandeira: 'O clássico crânio sobre dois ossos cruzados (Jolly Roger).',
    mascote: 'Uma arara-canindé vistosa (que grita "Mostre-me o saque!" ou "Terra à vista!").',
    capitao: 'Um ladino charmoso e debochado que rouba galeões com sorriso no rosto.',
    moral: 'Mercenária, gananciosa e ávida pela próxima presa mercante.',
    adornos: 'Bandanas listradas ou vermelhas amarradas na cabeça.',
    armamento: 'Cimitarras curvas e sabres curtos de marinha.',
    tatica: 'Bater e correr: disparando pistolas e voltando ao velame.',
    covil: 'Em uma lagoa oculta e abrigada protegida por um labirinto de recifes.',
    notoriedade: 'Uso desenfreado de barris de pólvora, bombas e fogo alquímico.',
    ambicao: 'Descobrir a localização e desenterrar um tesouro lendário esquecido.'
  });

  // Estado do Pirata Individual
  const [pirateState, setPirateState] = useState({
    tatuagem: 'Uma âncora pesada entalhada na pele do peito.',
    traco: 'Três dentes de ouro maciço que brilham a cada risada.',
    arma: 'Cimitarras curvas e sabres curtos de marinha.'
  });

  const [copied, setCopied] = useState(false);

  const roll = () => {
    if (mode === 'tripulacao') {
      const nome = pick(nomesTripulacao);
      const embarcacao = pick(piratesData.embarcacoes);
      const estado = pick(piratesData.estado_navio);
      const navio = `${embarcacao} (${estado.toLowerCase()})`;
      const bandeira = pick(piratesData.estandartes);
      const mascote = pick(piratesData.mascotes);
      const capitao = pick(piratesData.capitaes);
      const moral = pick(piratesData.moral_tripulacao);
      const adornos = pick(piratesData.adornos_iguais);
      const armamento = pick(piratesData.armamentos);
      const tatica = pick(piratesData.taticas_luta);
      const covil = pick(piratesData.esconderijos);
      const notoriedade = pick(piratesData.notoriedade);
      const ambicao = pick(piratesData.ambicoes);

      setCrewState({
        nome,
        navio,
        bandeira,
        mascote,
        capitao,
        moral,
        adornos,
        armamento,
        tatica,
        covil,
        notoriedade,
        ambicao
      });

      addHistoryEntry('FACCAO', `[Tripulação Pirata] ${nome} | Capitão: ${capitao}`);
    } else {
      const tatuagem = pick(piratesData.pirata.tatuagem);
      const traco = pick(piratesData.pirata.traco);
      const arma = pick(piratesData.armamentos);

      setPirateState({
        tatuagem,
        traco,
        arma
      });

      addHistoryEntry('NPC', `[Pirata] Traço: ${traco} | Tatuagem: ${tatuagem}`);
    }
  };

  const copy = () => {
    let text = '';
    if (mode === 'tripulacao') {
      text = `Bando Pirata: ${crewState.nome}
• Navio: ${crewState.navio}
• Pavilhão: ${crewState.bandeira}
• Mascote de Bordo: ${crewState.mascote}
• Capitão: ${crewState.capitao} (Moral: ${crewState.moral})
• Visual do Bando: Marujos ostentam ${crewState.adornos.toLowerCase()}
• Armas de Abordagem: ${crewState.armamento}
• Tática de Combate: ${crewState.tatica}
• Covil Costeiro: ${crewState.covil}
• Ambição da Tripulação: ${crewState.ambicao}
• Notoriedade dos Mares: ${crewState.notoriedade}`;
    } else {
      text = `Pirata de Bordo:
• Tatuagem: ${pirateState.tatuagem}
• Feição Notável: ${pirateState.traco}
• Arma em Punho: ${pirateState.arma}`;
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
        {/* Topo do Card */}
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#14232c] border border-[#224f66] flex items-center justify-center text-cyan-400 text-lg">
              🏴‍☠️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Tripulações Piratas
              </h3>
              <p className="text-[11px] text-slate-400">Corsários, Naus & Abordagens</p>
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

        {/* Alternador de Modo */}
        <div className="mb-3">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Visualizar:</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0a0d1d] border border-[#252b4e] rounded-lg">
            <button
              onClick={() => setMode('tripulacao')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'tripulacao'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚓ Nau & Tripulação
            </button>
            <button
              onClick={() => setMode('pirata')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'pirata'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🗡️ Marujo de Bordo
            </button>
          </div>
        </div>

        {/* Título do Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {mode === 'tripulacao' ? crewState.nome : 'Corsário dos Mares'}
            </h4>
            <button
              onClick={copy}
              title="Copiar dados"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-cyan-300/80 font-mono">
            {mode === 'tripulacao' ? `Bandeira: ${crewState.bandeira}` : pirateState.traco}
          </p>
        </div>

        {/* Conteúdo Dinâmico */}
        {mode === 'tripulacao' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-cyan-300 font-semibold">Nau:</strong> {crewState.navio}
            </p>
            <p>
              <strong className="text-cyan-300 font-semibold">Comando:</strong> {crewState.capitao}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Moral & Espírito:</strong> {crewState.moral} (Costumam trajar {crewState.adornos.toLowerCase()})
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Mascote do Navio:</strong> {crewState.mascote}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Arsenal:</strong> {crewState.armamento} — {crewState.tatica}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Refúgio:</strong> {crewState.covil}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Ambição da Tripulação:</strong>
              <span className="text-slate-200">{crewState.ambicao}</span>
            </p>
            <p className="text-rose-300/90">
              <strong className="text-rose-400 font-semibold">Fama nos Portos:</strong> {crewState.notoriedade}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-cyan-300 font-semibold">Tatuagem na Pele:</strong> {pirateState.tatuagem}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Aspecto Marcante:</strong> {pirateState.traco}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Empunhadura de Bordo:</strong>
              <span className="text-slate-300 italic font-serif">{pirateState.arma}</span>
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
          <span>🎲</span> {mode === 'tripulacao' ? 'Zarpar Nau' : 'Gerar Pirata'}
        </button>
      </div>
    </div>
  );
}