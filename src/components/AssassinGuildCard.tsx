import React, { useState } from 'react';
import guildsData from '../data/assassins.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesGuilda = [
  'Irmandade da Névoa Escarlate',
  'Os Filhos da Serpente Negra',
  'A Ordem do Estilete Silencioso',
  'O Tribunal da Meia-Noite',
  'Os Tecelões do Sudário',
  'A Mão de Obsidiana',
  'O Corvo sem Olhos',
  'A Confraria dos Últimos Suspiros'
];

export default function AssassinGuildCard() {
  const [data, setData] = useState({
    nome: 'Irmandade da Névoa Escarlate',
    simbolo: 'Um crânio estilizado.',
    metodo: 'Veneno de contato embebido na lâmina da arma.',
    armamento: 'Adagas envenenadas e espadas curtas equilibradas.',
    operacao: 'Atuam estritamente em duplas coordenadas.',
    lider: 'Uma mulher fatal astuta que comanda pelos bastidores.',
    objetivo: 'Corromper a política e chantagear magistrados da cidade.',
    codigo: 'Crianças pequenas e jovens inocentes.',
    tatica: 'Táticas de ataque rápido e fuga imediata (bater e sumir).',
    horario: 'À meia-noite em ponto, ao bater do último sino da torre.',
    esconderijo: 'Em catacumbas esquecidas sob o complexo do templo municipal.',
    medo: 'Nobres arrogantes, cortesãos e governantes.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesGuilda);
    const simbolo = pick(guildsData.simbolos);
    const metodo = pick(guildsData.metodos);
    const armamento = pick(guildsData.armamentos);
    const operacao = pick(guildsData.operacao);
    const lider = pick(guildsData.lideres);
    const objetivo = pick(guildsData.objetivos);
    const codigo = pick(guildsData.codigo_honra);
    const tatica = pick(guildsData.taticas);
    const horario = pick(guildsData.horarios);
    const esconderijo = pick(guildsData.esconderijos);
    const medo = pick(guildsData.respeito_medo);

    setData({
      nome,
      simbolo,
      metodo,
      armamento,
      operacao,
      lider,
      objetivo,
      codigo,
      tatica,
      horario,
      esconderijo,
      medo
    });

    addHistoryEntry('FACCAO', `[Guilda de Assassinos] ${nome} | Líder: ${lider}`);
  };

  const copy = () => {
    const text = `Guilda de Assassinos: ${data.nome}
• Símbolo: ${data.simbolo}
• Líder: ${data.lider}
• Esconderijo: ${data.esconderijo}
• Método Preferido: ${data.metodo}
• Armamento: ${data.armamento}
• Modus Operandi: ${data.operacao} (${data.tatica})
• Momento do Golpe: ${data.horario}
• Objetivo: ${data.objetivo}
• Código de Honra (Alvos Proibidos): ${data.codigo}
• Temida/Respeitada por: ${data.medo}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#2b1414] border border-[#6b2525] flex items-center justify-center text-red-400 text-lg">
              🗡️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Guilda de Assassinos
              </h3>
              <p className="text-[11px] text-slate-400">Contratos, Venenos & Sombras</p>
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

        {/* Nome Sorteado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar guilda"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-red-300/80 font-mono">
            Símbolo: {data.simbolo}
          </p>
        </div>

        {/* Ficha da Guilda */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-red-400 font-semibold">Liderança:</strong> {data.lider}
          </p>
          <p>
            <strong className="text-red-400 font-semibold">Covil:</strong> {data.esconderijo}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Execução:</strong> {data.metodo}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Armamento:</strong> {data.armamento}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Operação:</strong> {data.operacao} — {data.tatica} ({data.horario})
          </p>
          <p>
            <strong className="text-amber-300 font-semibold">Ambição:</strong> {data.objetivo}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Alvos Proibidos:</strong> Jamais aceitam contratos contra {data.codigo.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Guilda'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Forjar Guilda
        </button>
      </div>
    </div>
  );
}