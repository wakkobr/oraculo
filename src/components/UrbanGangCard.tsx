import React, { useState } from 'react';
import gangsData from '../data/urban_gangs.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesGangues = [
  'Os Ratos da Sarjeta',
  'A Irmandade do Estilete Torto',
  'Os Punhais do Cais Negro',
  'Os Olhos da Meia-Noite',
  'A Turba dos Dentes de Ouro',
  'Os Quebra-Canelas',
  'Os Corvos do Calçamento',
  'Os Chacais do Beco Fundo'
];

export default function UrbanGangCard() {
  const [data, setData] = useState({
    nome: 'Os Ratos da Sarjeta',
    esquema: 'Furtos menores, arrombamentos noturnos de residências e batedores de carteira nas feiras.',
    cores: 'Preto sólido & Cinza-chumbo / Aço escuro',
    simbolo: 'Um rato gordo mordendo uma moeda.',
    adorno: 'Bandanas estampadas amarradas na testa ou boca.',
    lider: 'Um ladino charmoso e sedutor que resolve disputas com conversa e vinho.',
    recrutamento: 'Meninos de rua e órfãos ágeis como batedores e olheiros.',
    ambicao: 'Dominar a política municipal subornando e chantageando magistrados.',
    armamento: 'Estiletes pontiagudos e facas de lâmina serrilhada.',
    tatica: 'Bater e correr: esfaqueando nas costelas e sumindo pelas frestas dos becos.',
    covil: 'Em galerias de tijolos secos nos esgotos fétidos da metrópole.',
    respeito: 'Mercadores abastados, ourives e caixeiros da praça comercial.',
    membro: 'Uma adaga de estilete bem afiada enfiada em cada uma das botas.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesGangues);
    const esquema = pick(gangsData.esquemas);
    const cor1 = pick(gangsData.cores);
    const cor2 = pick(gangsData.cores);
    const cores = cor1 === cor2 ? cor1 : `${cor1} & ${cor2}`;
    const simbolo = pick(gangsData.simbolos);
    const adorno = pick(gangsData.adornos_grupo);
    const lider = pick(gangsData.lideres);
    const recrutamento = pick(gangsData.alvos_recrutamento);
    const ambicao = pick(gangsData.ambicoes);
    const armamento = pick(gangsData.armamentos);
    const tatica = pick(gangsData.taticas_luta);
    const covil = pick(gangsData.esconderijos);
    const respeito = pick(gangsData.respeito_medo);
    const membro = pick(gangsData.membro_individual);

    setData({
      nome,
      esquema,
      cores,
      simbolo,
      adorno,
      lider,
      recrutamento,
      ambicao,
      armamento,
      tatica,
      covil,
      respeito,
      membro
    });

    addHistoryEntry('FACCAO', `[Gangue Urbana] ${nome} | Líder: ${lider}`);
  };

  const copy = () => {
    const text = `Gangue Urbana: ${data.nome}
• Cores & Insígnia: ${data.cores} (Símbolo: ${data.simbolo})
• Marca Visual da Turba: ${data.adorno}
• Esquema de Lucro: ${data.esquema}
• Liderança: ${data.lider}
• Recrutamento Preferencial: ${data.recrutamento}
• Arsenal Comum: ${data.armamento}
• Tática nas Vielas: ${data.tatica}
• Covil / Esconderijo: ${data.covil}
• Ambição do Bando: ${data.ambicao}
• Temidos / Respeitados por: ${data.respeito}
• Integrante Típico: ${data.membro}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#271d15] border border-[#6b4724] flex items-center justify-center text-amber-400 text-lg">
              🗡️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Gangues Urbanas
              </h3>
              <p className="text-[11px] text-slate-400">Larápios, Becos & Extorsão</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="gangues-urbanas" />
            <button
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Título da Gangue */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar gangue"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-amber-300/80 font-mono">
            {data.cores} • {data.simbolo}
          </p>
        </div>

        {/* Informações da Facção */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-amber-400 font-semibold">Liderança:</strong> {data.lider}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Covil:</strong> {data.covil}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Negócio:</strong> {data.esquema}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Arsenal:</strong> {data.armamento} — {data.tatica}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Recrutamento:</strong> Alvos: {data.recrutamento.toLowerCase()}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Traje / Adorno:</strong> Ostentam {data.adorno.toLowerCase()}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Ambição nas Sombras:</strong>
            <span className="text-slate-200">{data.ambicao}</span>
          </p>
          <p className="text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Figura de Beco:</strong> {data.membro}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Gangue'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Gerar Gangue
        </button>
      </div>
    </div>
  );
}