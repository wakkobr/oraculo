import React, { useState } from 'react';
import cultsData from '../data/cults.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesSeitas = [
  'A Irmandade da Chama Oculta',
  'Os Filhos da Lua Carmesim',
  'A Ordem do Olho Desperto',
  'Os Sussurradores do Abismo',
  'O Círculo da Serpente Eterna',
  'Os Peregrinos da Asa Negra',
  'A Confraria do Deus Esquecido',
  'O Tribunal da Estrela Sangrenta'
];

export default function CultCard() {
  const [data, setData] = useState({
    nome: 'Os Filhos da Lua Carmesim',
    devocao: 'Um deus morto cujos restos astrais ainda emanam poder corrompido.',
    sede: 'Criptas e catacumbas antigas e esquecidas sob a fundação da metrópole.',
    lider: 'Um pregador carismático de oratória arrebatadora e hipnótica.',
    membros: 'Indivíduos de todas as classes sociais, desde mendigos maltrapilhos até juízes e fidalgos.',
    ritual: 'Cânticos dissonantes e incantações blasfemas entoadas na escuridão por horas.',
    objetivo: 'Romper o Véu e abrir um portal dimensional definitivo para outro Plano.',
    regra: 'Seguir um código rígido de vestimentas (túnicas de cor única, capuzes ou máscaras de marfim).',
    tabu: 'Solos sagrados, igrejas consagradas e santuários de deuses benévolos.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesSeitas);
    const devocao = pick(cultsData.devocao);
    const sede = pick(cultsData.ponto_encontro);
    const lider = pick(cultsData.lideres);
    const membros = pick(cultsData.composicao);
    const ritual = pick(cultsData.rituais);
    const objetivo = pick(cultsData.objetivos);
    const regra = pick(cultsData.regras_estritas);
    const tabu = pick(cultsData.tabus_medos);

    setData({
      nome,
      devocao,
      sede,
      lider,
      membros,
      ritual,
      objetivo,
      regra,
      tabu
    });

    addHistoryEntry('FACCAO', `[Culto] ${nome} | Venera: ${devocao}`);
  };

  const copy = () => {
    const text = `Culto Oculto: ${data.nome}
• Veneram: ${data.devocao}
• Covil / Encontro: ${data.sede}
• Liderança: ${data.lider}
• Fiéis / Seguidores: ${data.membros}
• Rito Sacro: ${data.ritual}
• Propósito Supremo: ${data.objetivo}
• Mandamento Rígido: ${data.regra}
• Tabu / Temor: ${data.tabu}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#27152b] border border-[#64216e] flex items-center justify-center text-fuchsia-300 text-lg">
              🕯️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Cultos & Seitas
              </h3>
              <p className="text-[11px] text-slate-400">Fanáticos, Rituais & Heresias</p>
            </div>
          </div>
          <PinButton cardId="cultos" />
          <button
            onClick={roll}
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Título do Culto */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar culto"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-fuchsia-300/80 font-mono">
            Veneram: {data.devocao}
          </p>
        </div>

        {/* Detalhes do Culto */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-fuchsia-300 font-semibold">Liderança:</strong> {data.lider}
          </p>
          <p>
            <strong className="text-fuchsia-300 font-semibold">Covil Secreto:</strong> {data.sede}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Adepto Típico:</strong> {data.membros}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Prática Ritual:</strong> {data.ritual}
          </p>
          <p>
            <strong className="text-amber-300 font-semibold">Grande Ambição:</strong> {data.objetivo}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Doutrina Estrita:</strong> {data.regra}
          </p>
          <p className="text-purple-300/90">
            <strong className="text-purple-400 font-semibold">Pavor / Tabu:</strong> Evitam a todo custo {data.tabu.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Culto'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Evocar Seita
        </button>
      </div>
    </div>
  );
}