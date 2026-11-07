import React, { useState } from 'react';
import trailRationsData from '../data/trail_rations.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

interface RationType {
  name: string;
  description: string;
  meat: string;
  bread: string;
  pickle: string;
  nuts: string;
  fruit: string;
  pot_boil: string;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export default function TrailRationCard() {
  const archetypes = trailRationsData.ration_archetypes as RationType[];

  const [data, setData] = useState({
    nome: 'Fardo do Batedor dos Bosques',
    descricao: 'Composição ligeira e calórica, optimizada para marcha rápida sob copas fechadas.',
    carne: 'Charque bovino seco com sal grosso',
    pao: 'Broa estaladiça de milho com banha',
    conserva: 'Cenouras tenras em conserva aromática',
    nozesFrutos: 'Mix de avelãs e pinhões silvestres • Maçãs desidratadas em rodelas',
    caldeirao: 'Feijão-preto miúdo para caldeirão de marcha',
    vinhoCorpo: 'Branco pálido, translúcido e mineral',
    vinhoTerroir: 'Encostas marítimas batidas pelo vento e maresia',
    vinhoAromaNotas: 'Flores de laranjeira e relva cortada com notas de maçã verde crocante',
    vinhoServico: 'Servido estalando de frio num cálice fino de vidro soprado',
    vinhoLenda: 'Vindimado originalmente por uma raça ancestral já extinta.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const ration = pick(archetypes);
    const terroir = pick(trailRationsData.wines.terroirs);
    const corpo = pick(trailRationsData.wines.bodies);
    const aroma = pick(trailRationsData.wines.aromas);
    const notas = pick(trailRationsData.wines.flavor_notes);
    const servico = pick(trailRationsData.wines.vessels_and_service);
    const lenda = pick(trailRationsData.wines.legends);

    setData({
      nome: ration.name,
      descricao: ration.description,
      carne: ration.meat,
      pao: ration.bread,
      conserva: ration.pickle,
      nozesFrutos: `${ration.nuts} • ${ration.fruit}`,
      caldeirao: ration.pot_boil,
      vinhoCorpo: corpo,
      vinhoTerroir: terroir,
      vinhoAromaNotas: `${aroma} com notas de ${notas.toLowerCase()}`,
      vinhoServico: servico,
      vinhoLenda: lenda
    });

    addHistoryEntry('TAVERNA', `[Ração de Trilha] ${ration.name} | Adega: ${corpo}`);
  };

  const copy = () => {
    const text = `Logística de Trilha: ${data.nome}
- Perfil de Viagem: ${data.descricao}
- Proteína Seca: ${data.carne}
- Pão de Guarda: ${data.pao}
- Conserva & Vegetal: ${data.conserva}
- Frutos & Sementes: ${data.nozesFrutos}
- Fervura de Caldeirão: ${data.caldeirao}

Garrafa de Adega: ${data.vinhoCorpo} (${data.vinhoTerroir})
- Bouquet & Notas: ${data.vinhoAromaNotas}
- Serviço de Mesa: ${data.vinhoServico}
- Lenda da Safra: "${data.vinhoLenda}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-oracle-card border border-[#252b4e] rounded-xl p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] relative">
      <span className="absolute top-2.5 left-2.5 text-[10px] text-purple-400/40">✦</span>
      <span className="absolute top-2.5 right-2.5 text-[10px] text-purple-400/40">✦</span>

      <div>
        <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#1c2242]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#221233] border border-[#5a278a] flex items-center justify-center text-purple-300 text-lg">
              🎒
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Logística de Trilha & Adega
              </h3>
              <p className="text-[11px] text-slate-400">Rações de Marcha & Safras de Vinho</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="trail-ration" />
            <button
              type="button"
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              type="button"
              onClick={copy}
              title="Copiar provisão"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-purple-300/80 font-mono italic">
            "{data.descricao}"
          </p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-purple-300 font-semibold">Proteína & Pão de Guarda:</strong> {data.carne}; {data.pao}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Conserva & Nozes:</strong> {data.conserva} ({data.nozesFrutos})
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Fervura no Caldeirão:</strong> {data.caldeirao}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-rose-200/90">
            <strong className="text-rose-400 font-semibold block mb-0.5">Garrafa Selecionada da Adega:</strong>
            <span className="text-slate-200">{data.vinhoCorpo} ({data.vinhoTerroir.toLowerCase()}). {data.vinhoServico}.</span>
            <span className="block text-[11px] text-rose-300/80 italic mt-0.5 font-serif">"{data.vinhoLenda}"</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          type="button"
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Provisão'}
        </button>
        <button
          type="button"
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Equipar Alforge
        </button>
      </div>
    </div>
  );
}