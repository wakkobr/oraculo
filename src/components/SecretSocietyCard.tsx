import React, { useState } from 'react';
import societiesData from '../data/secret_societies.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesSociedades = [
  'A Ordem do Véu Silencioso',
  'Os Tecelões da Rosa Negra',
  'O Tribunal da Meia-Noite',
  'A Confraria do Olho Cego',
  'A Fraternidade da Estrela Oculta',
  'Os Guardiões do Candelabro de Ferro',
  'O Círculo da Cinza Branca',
  'Os Senhores da Máscara de Prata'
];

export default function SecretSocietyCard() {
  const [data, setData] = useState({
    nome: 'A Ordem do Véu Silencioso',
    objetivo: 'Proteger o povo comum e os indefesos contra a tirania e abusos dos governantes.',
    lideranca: 'Um conselho oculto de assentos perpétuos transmitidos por direito hereditário de sangue.',
    reconhecimento: 'Um broche, alfinete de lapela ou anel de sinete minúsculo com gravura velada.',
    cores: 'Violeta imperial & Prata / Cinza-claro',
    simbolo: 'Corpo celeste místico (lua crescente)',
    lema: 'Conhecimento proibido',
    operacao: 'Trabalham em pequenas células clandestinas de três a cinco conspiradores.',
    hierarquia: 'Conhecem apenas o seu contato superior direto e rigorosamente mais ninguém.',
    covil: 'Criptas e catacumbas milenares esquecidas sob a fundação da metrópole.',
    membros: 'Uma colcha de retalhos eclética unindo desde cocheiros até juízes da suprema corte.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesSociedades);
    const objetivo = pick(societiesData.objetivos);
    const lideranca = pick(societiesData.lideres);
    const reconhecimento = pick(societiesData.reconhecimento);
    const cor1 = pick(societiesData.cores);
    const cor2 = pick(societiesData.cores);
    const cores = cor1 === cor2 ? cor1 : `${cor1} & ${cor2}`;
    const simbolo = pick(societiesData.simbolos);
    const lema = pick(societiesData.lemas);
    const operacao = pick(societiesData.modus_operandi);
    const hierarquia = pick(societiesData.conhecimento_rede);
    const covil = pick(societiesData.pontos_encontro);
    const membros = pick(societiesData.composicao);

    setData({
      nome,
      objetivo,
      lideranca,
      reconhecimento,
      cores,
      simbolo,
      lema,
      operacao,
      hierarquia,
      covil,
      membros
    });

    addHistoryEntry('FACCAO', `[Sociedade Secreta] ${nome} | Meta: ${objetivo}`);
  };

  const copy = () => {
    const text = `Sociedade Secreta: ${data.nome}
• Causa Principal: ${data.objetivo}
• Ideal / Lema Sagrado: "${data.lema}"
• Liderança Oculta: ${data.lideranca}
• Sinal de Reconhecimento: ${data.reconhecimento}
• Insígnia & Cores: ${data.simbolo} (Cores: ${data.cores})
• Célula & Operação: ${data.operacao} (Estrutura: ${data.hierarquia.toLowerCase()})
• Enclave / Reuniões: ${data.covil}
• Perfil dos Iniciados: ${data.membros}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#1f1938] border border-[#4d3c8c] flex items-center justify-center text-indigo-300 text-lg">
              👁️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Sociedades Secretas
              </h3>
              <p className="text-[11px] text-slate-400">Ordens Ocultas, Células & Senhas</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="sociedades-secretas" />
            <button
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Nome da Sociedade */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar sociedade"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-indigo-300/80 font-mono italic">
            "{data.lema}" • {data.cores}
          </p>
        </div>

        {/* Informações da Ordem */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-indigo-300 font-semibold">Causa:</strong> {data.objetivo}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Liderança:</strong> {data.lideranca}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Sinal Secreto:</strong> {data.reconhecimento}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Símbolo Oculto:</strong> {data.simbolo}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Modo de Operação:</strong> {data.operacao} ({data.hierarquia.toLowerCase()})
          </p>
          <p>
            <strong className="text-amber-300 font-semibold">Adepto Típico:</strong> {data.membros}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-indigo-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Enclave de Reunião:</strong>
            <span className="text-slate-200">{data.covil}</span>
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Sociedade'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Desvendar Ordem
        </button>
      </div>
    </div>
  );
}