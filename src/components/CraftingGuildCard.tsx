import React, { useState } from 'react';
import guildData from '../data/crafting_guilds.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type ViewMode = 'guilda' | 'artesao';

export default function CraftingGuildCard() {
  const [mode, setMode] = useState<ViewMode>('guilda');
  
  // Estado para Corporação Completa
  const [guildState, setGuildState] = useState({
    nome: 'Irmandade dos Ferreiros de Armas & Armaduras',
    status: 'Monopólio absoluto; controle rigoroso sobre cada grama de matéria-prima e produto final na região.',
    corrupcao: 'Mestres da influência política; trocam favores sutis e presentes refinados com magistrados e fiscais.',
    sede: 'Em um pavilhão aberto de colunas de pedra no coração do grande bazar da cidade.',
    missao: 'Liberar um carregamento retido nos portões da cidade por um fiscal alfandegário burocrata e inflexível.'
  });

  // Estado para Artesão / NPC
  const [npcState, setNpcState] = useState({
    oficio: 'Ferreiros de Armas & Armaduras',
    posto: 'Um mestre consagrado de reputação incontestável.',
    rosto: 'Olhos atentos e penetrantes que medem milímetros num piscar.',
    corpo: 'Mãos trêmulas quando em repouso, mas firmes como rocha ao trabalhar.',
    pericia: 'Forjar ou confeccionar um item específico com perfeição incomparável.',
    sonho: 'Produzir a obra-prima definitiva que imortalizará seu nome na história.',
    aprendiz: 'Efervescente e ávido por aprender qualquer segredo ou técnica do ofício. (Busca: Dicas e conselhos práticos).'
  });

  const [copied, setCopied] = useState(false);

  const roll = () => {
    const ofc = pick(guildData.oficios);

    if (mode === 'guilda') {
      const status = pick(guildData.status_controle);
      const corrupcao = pick(guildData.corrupcao_ilegalidades);
      const sede = pick(guildData.sede);
      const nivelMissao = Math.random();
      const missao = nivelMissao > 0.6 
        ? `[Maior] ${pick(guildData.missoes.maior)}` 
        : nivelMissao > 0.3 
        ? `[Padrão] ${pick(guildData.missoes.padrao)}` 
        : `[Menor] ${pick(guildData.missoes.menor)}`;

      const prefixos = ['Corporação dos', 'Irmandade dos', 'Venerável Confraria dos', 'Grêmio Oficial dos', 'Liga dos'];
      const nomeCompleto = `${pick(prefixos)} ${ofc}`;

      setGuildState({
        nome: nomeCompleto,
        status,
        corrupcao,
        sede,
        missao
      });

      addHistoryEntry('FACCAO', `[Guilda de Artesãos] ${nomeCompleto} | Sede: ${sede}`);
    } else {
      const posto = pick(guildData.artesao.posto);
      const rosto = pick(guildData.artesao.tracos);
      const corpo = pick(guildData.artesao.peculiaridade);
      const pericia = pick(guildData.artesao.pericia);
      const sonho = pick(guildData.artesao.sonho);
      const aprendiz = `${pick(guildData.aprendiz.humor)} (Desejo: ${pick(guildData.aprendiz.busca)})`;

      setNpcState({
        oficio: ofc,
        posto,
        rosto,
        corpo,
        pericia,
        sonho,
        aprendiz
      });

      addHistoryEntry('NPC', `[Artesão de ${ofc}] ${posto} | Destaque: ${pericia}`);
    }
  };

  const copy = () => {
    let text = '';
    if (mode === 'guilda') {
      text = `Guilda de Artesãos: ${guildState.nome}
• Domínio & Poder: ${guildState.status}
• Sede: ${guildState.sede}
• Moralidade & Práticas: ${guildState.corrupcao}
• Demanda / Gancho: ${guildState.missao}`;
    } else {
      text = `Artesão (${npcState.oficio}):
• Posição: ${npcState.posto}
• Aparência: ${npcState.rosto} — ${npcState.corpo}
• Perícia de Destaque: ${npcState.pericia}
• Grande Sonho: ${npcState.sonho}
• Aprendiz na Oficina: ${npcState.aprendiz}`;
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
            <div className="w-9 h-9 rounded-lg bg-[#271d15] border border-[#6b4724] flex items-center justify-center text-amber-300 text-lg">
              ⚒️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Guildas de Ofício
              </h3>
              <p className="text-[11px] text-slate-400">Artesãos, Oficinas & Mestres</p>
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
              onClick={() => setMode('guilda')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'guilda' 
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ Corporação
            </button>
            <button
              onClick={() => setMode('artesao')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'artesao' 
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔨 Mestre & Oficina
            </button>
          </div>
        </div>

        {/* Título do Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {mode === 'guilda' ? guildState.nome : `Oficina de ${npcState.oficio}`}
            </h4>
            <button onClick={copy} title="Copiar detalhes" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
              📋
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico */}
        {mode === 'guilda' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p><strong className="text-amber-300 font-semibold">Poder:</strong> {guildState.status}</p>
            <p><strong className="text-amber-300 font-semibold">Sede:</strong> {guildState.sede}</p>
            <p><strong className="text-slate-400 font-semibold">Conduta:</strong> {guildState.corrupcao}</p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Demanda Atual / Missão:</strong>
              <span className="text-slate-200">{guildState.missao}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p><strong className="text-amber-300 font-semibold">Posição:</strong> {npcState.posto}</p>
            <p><strong className="text-slate-400 font-semibold">Aparência:</strong> {npcState.rosto} {npcState.corpo}</p>
            <p><strong className="text-oracle-gold font-semibold">Habilidade:</strong> {npcState.pericia}</p>
            <p><strong className="text-slate-400 font-semibold">Ambição:</strong> {npcState.sonho}</p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Aprendiz na Bancada:</strong>
              <span className="text-slate-300 italic font-serif">{npcState.aprendiz}</span>
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
          <span>🎲</span> {mode === 'guilda' ? 'Gerar Guilda' : 'Gerar Artesão'}
        </button>
      </div>
    </div>
  );
}