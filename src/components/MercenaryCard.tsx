import React, { useState } from 'react';
import mercenariesData from '../data/mercenaries.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesCompanhia = [
  'A Companhia dos Punhos de Ferro',
  'Os Corvos de Aço',
  'A Legião da Rosa Sangrenta',
  'Os Chacais do Desfiladeiro',
  'Os Espadas-Livradas do Norte',
  'A Irmandade da Chama Cinzenta',
  'Os Lanceiros da Névoa',
  'Os Feras de Aluguel'
];

export default function MercenaryCard() {
  const [data, setData] = useState({
    nome: 'Os Corvos de Aço',
    cores: 'Cinza-escuro / Ferro fundido',
    estandarte: 'Um corvo pousado de olhar atento.',
    comandante: 'Um ex-campeão das arenas de gladiadores coberto de cicatrizes.',
    moral: 'Profissional, respeitosa e estritamente atenta ao soldo.',
    contrato: 'Sob contrato com alguns mercadores.',
    especialidade: 'Assalto frontal pesado contra linhas defensivas inimigas.',
    fama: 'Jamais aceitar rendições ou poupar prisioneiros de guerra.',
    estilo: 'Manobras militares impecáveis de manual de veteranos.',
    equipamento: 'Armaduras de escamas sobrepostas empunhando espadas longas e escudos pesados.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesCompanhia);
    const cores = pick(mercenariesData.cores);
    const estandarte = pick(mercenariesData.estandarte);
    const comandante = pick(mercenariesData.comandantes);
    const moral = pick(mercenariesData.moral_tropa);
    const contrato = pick(mercenariesData.situacao_atual);
    const especialidade = pick(mercenariesData.especializacoes);
    const fama = pick(mercenariesData.fama_sombria);
    const estilo = pick(mercenariesData.estilo_combate);
    const armadura = pick(mercenariesData.armaduras);
    const arma = pick(mercenariesData.armamentos);
    const equipamento = `${armadura} empunhando ${arma.toLowerCase()}`;

    setData({
      nome,
      cores,
      estandarte,
      comandante,
      moral,
      contrato,
      especialidade,
      fama,
      estilo,
      equipamento
    });

    addHistoryEntry('FACCAO', `[Mercenários] ${nome} | Capitão: ${comandante}`);
  };

  const copy = () => {
    const text = `Companhia Mercenária: ${data.nome}
• Estandarte: ${data.estandarte} (Cores: ${data.cores})
• Comandante: ${data.comandante} (Moral da tropa: ${data.moral})
• Contrato Atual: ${data.contrato}
• Doutrina de Guerra: ${data.especialidade}
• Modo de Combate: ${data.estilo}
• Equipamento Padrão: ${data.equipamento}
• Fama Notória: ${data.fama}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#272118] border border-[#5c4927] flex items-center justify-center text-amber-400 text-lg">
              🛡️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Tropas Mercenárias
              </h3>
              <p className="text-[11px] text-slate-400">Espadas de Aluguel & Guerras</p>
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

        {/* Título da Companhia */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar companhia"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-amber-300/80 font-mono">
            {data.cores} • {data.estandarte}
          </p>
        </div>

        {/* Ficha da Tropa */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-amber-300 font-semibold">Comando:</strong> {data.comandante}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Moral:</strong> {data.moral}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Contrato:</strong> {data.contrato}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Especialidade:</strong> {data.especialidade}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Armamento:</strong> {data.equipamento}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Estilo & Doutrina:</strong>
            <span className="text-slate-200">{data.estilo}</span>
          </p>
          <p className="text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Fama Notória:</strong> {data.fama}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Tropa'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Convocar Tropa
        </button>
      </div>
    </div>
  );
}