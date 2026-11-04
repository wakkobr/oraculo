import React, { useState } from 'react';
import merchantData from '../data/merchant_guilds.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type MerchantViewMode = 'corporacao' | 'negociante';

export default function MerchantGuildCard() {
  const [mode, setMode] = useState<MerchantViewMode>('corporacao');

  // Estado da Guilda / Companhia
  const [guildState, setGuildState] = useState({
    nome: 'Consórcio das Velas Douradas',
    tipo: 'Companhia Mercantil Transcontinental',
    controle: 'O magnata mercador mais rico e influente de toda a cidade.',
    status: 'Absoluto e tirânico; domínio monopolista de ponta a ponta sobre o comércio da comarca.',
    sede: 'Atrás dos cofres e salões de uma das casas bancárias mais prestigiadas.',
    praticas: 'Preços mínimos tabelados por cartel e propinas rotineiras para acobertar pequenas contravenções.',
    missao: 'Uma caravana de especiarias inteira desapareceu misteriosamente na travessia das colinas.'
  });

  // Estado do Negociante / NPC
  const [npcState, setNpcState] = useState({
    tipo: 'Mercador de Caravanas',
    origem: 'Membro juramentado de um tradicional clã de caravaneiros nômades.',
    postura: 'Um ar arrogante e sorriso de escárnio de quem sabe que você precisa dele.',
    agenda: 'Contratar aventureiros para resgatar ou afanar um artefato arcano sob encomenda.',
    bolsos: 'Algumas gemas preciosas lapidadas costuradas no forro da túnica.',
    escambo: 'Barras e lingotes puros de ouro e prata sem cunho real.',
    lojista: 'Hiperativo e solícito demais, tentando empurrar quinquilharias a qualquer custo.'
  });

  const [copied, setCopied] = useState(false);

  const nomesGuilda = [
    'Consórcio das Velas Douradas',
    'Companhia das Índias Orientais do Mar Interior',
    'Liga Mercante da Balança de Prata',
    'Sindicato dos Mercadores Livres',
    'Confraria dos Sete Mares & Caravanas',
    'Sociedade Comercial do Cifrão Escarlate'
  ];

  const roll = () => {
    if (mode === 'corporacao') {
      const nome = pick(nomesGuilda);
      const isCompanhiaMaritima = Math.random() > 0.5;
      const tipo = isCompanhiaMaritima 
        ? pick(merchantData.companhia_maritima.especialidades) 
        : 'Guilda Comercial & Liga de Mercadores Locais';
      const controle = isCompanhiaMaritima 
        ? pick(merchantData.companhia_maritima.diretoria) 
        : pick(merchantData.controle);
      const status = pick(merchantData.status_controle);
      const sede = pick(merchantData.sede);
      const praticas = pick(merchantData.corrupcao_ilegalidades);
      
      const nivelMissao = Math.random();
      const missao = nivelMissao > 0.6 
        ? `[Maior] ${pick(merchantData.missoes.maior)}` 
        : nivelMissao > 0.3 
        ? `[Padrão] ${pick(merchantData.missoes.padrao)}` 
        : `[Menor] ${pick(merchantData.missoes.menor)}`;

      setGuildState({
        nome,
        tipo,
        controle,
        status,
        sede,
        praticas,
        missao
      });

      addHistoryEntry('FACCAO', `[Mercadores] ${nome} | Liderança: ${controle}`);
    } else {
      const origem = pick(merchantData.mercador.origem);
      const postura = pick(merchantData.mercador.aparencia);
      const agenda = pick(merchantData.mercador.agenda);
      const bolsos = pick(merchantData.mercador.bolsos);
      const escambo = pick(merchantData.mercador.moeda_alternativa);
      const lojista = `${pick(merchantData.lojista.humor)} (Objetivo imediato: ${pick(merchantData.lojista.desejo).toLowerCase()})`;

      setNpcState({
        tipo: 'Comerciante / Caixeiro',
        origem,
        postura,
        agenda,
        bolsos,
        escambo,
        lojista
      });

      addHistoryEntry('NPC', `[Mercador] ${origem} | Foco: ${agenda}`);
    }
  };

  const copy = () => {
    let text = '';
    if (mode === 'corporacao') {
      text = `Guilda / Companhia Mercante: ${guildState.nome}
• Ramo: ${guildState.tipo}
• Liderança: ${guildState.controle}
• Domínio Econômico: ${guildState.status}
• Sede / Escritórios: ${guildState.sede}
• Práticas & Moral: ${guildState.praticas}
• Demanda Atual / Contrato: ${guildState.missao}`;
    } else {
      text = `Negociante / Mercador NPC:
• Origem: ${npcState.origem}
• Ar & Postura: ${npcState.postura}
• Interesses: ${npcState.agenda}
• Nos Bolsos: ${npcState.bolsos}
• Aceita em Escambo: ${npcState.escambo}
• No Balcão: ${npcState.lojista}`;
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
            <div className="w-9 h-9 rounded-lg bg-[#272115] border border-[#6b5821] flex items-center justify-center text-yellow-400 text-lg">
              ⚖️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Guildas Mercantes
              </h3>
              <p className="text-[11px] text-slate-400">Companhias, Moedas & Mascates</p>
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
              onClick={() => setMode('corporacao')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'corporacao'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ Corporação Mercantil
            </button>
            <button
              onClick={() => setMode('negociante')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'negociante'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💰 Mercador & Balcão
            </button>
          </div>
        </div>

        {/* Título do Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {mode === 'corporacao' ? guildState.nome : 'Negociante & Balcão'}
            </h4>
            <button
              onClick={copy}
              title="Copiar dados"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-yellow-300/80 font-mono">
            {mode === 'corporacao' ? guildState.tipo : npcState.origem}
          </p>
        </div>

        {/* Conteúdo Dinâmico */}
        {mode === 'corporacao' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-yellow-400 font-semibold">Comando:</strong> {guildState.controle}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Mercado:</strong> {guildState.status}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Sede:</strong> {guildState.sede}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Práticas:</strong> {guildState.praticas}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-yellow-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Demanda Atual / Missão:</strong>
              <span className="text-slate-200">{guildState.missao}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-yellow-400 font-semibold">Postura:</strong> {npcState.postura}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Interesse:</strong> {npcState.agenda}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Nos Bolsos:</strong> {npcState.bolsos}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Aceita em Troca:</strong> {npcState.escambo}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-yellow-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">No Balcão da Loja:</strong>
              <span className="text-slate-300 italic font-serif">{npcState.lojista}</span>
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
          <span>🎲</span> {mode === 'corporacao' ? 'Gerar Guilda' : 'Gerar Mercador'}
        </button>
      </div>
    </div>
  );
}