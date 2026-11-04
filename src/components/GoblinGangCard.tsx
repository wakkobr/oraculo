import React, { useState } from 'react';
import goblinsData from '../data/goblins.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesGangue = [
  'Os Roedores de Canela',
  'A Matilha do Nariz Rachado',
  'Os Dentes Tortos',
  'Os Queima-Celeiros',
  'A Turba da Lua Podre',
  'Os Espeta-Canários',
  'Os Larápios da Lama Negra',
  'O Terror dos Galinheiros'
];

export default function GoblinGangCard() {
  const [data, setData] = useState({
    nome: 'Os Roedores de Canela',
    chefe: 'Um guerreiro goblin egocêntrico com armadura cheia de troféus de lata.',
    negocio: 'Emboscada e assalto a caravanas com metais e comida.',
    simbolo: 'Um crânio quebrado pintado com cal.',
    cores: 'Preto e Carmesim',
    covil: 'Em um complexo labiríntico de cavernas naturais gotejantes ao longo de uma garganta estreita na montanha.',
    tatica: 'Bater e correr: disparando virotes envenenados e sumindo nos arbustos.',
    alvo: 'Mercadores prósperos, caixeiros-viajantes e cambistas.',
    plano: 'A despensa e adega de uma taverna famosa.',
    reforco: 'Capangas bugbears armados com clavas pesadas e maças cravadas.',
    pet: 'Wargs cinzentos inteligentes e ardilosos usados como montaria.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesGangue);
    const chefe = pick(goblinsData.chefes);
    const negocio = pick(goblinsData.negocios);
    const simbolo = pick(goblinsData.simbolos);
    const cores = pick(goblinsData.cores);
    const local = pick(goblinsData.locais_covil);
    const tipo = pick(goblinsData.tipo_covil);
    const covil = `${tipo} (${local.toLowerCase()})`;
    const tatica = pick(goblinsData.taticas_luta);
    const alvo = pick(goblinsData.alvos_favoritos);
    const plano = pick(goblinsData.plano_invasao);
    const reforco = pick(goblinsData.reforcos);
    const pet = pick(goblinsData.guardioes_pets);

    setData({
      nome,
      chefe,
      negocio,
      simbolo,
      cores,
      covil,
      tatica,
      alvo,
      plano,
      reforco,
      pet
    });

    addHistoryEntry('FACCAO', `[Bando Goblin] ${nome} | Líder: ${chefe}`);
  };

  const copy = () => {
    const text = `Bando Goblinóide: ${data.nome}
• Estandarte: Símbolo: ${data.simbolo} | Cores: ${data.cores}
• Liderança: ${data.chefe}
• Covil: ${data.covil}
• Atividade Principal: ${data.negocio}
• Tática de Combate: ${data.tatica}
• Alvos Prediletos: ${data.alvo}
• Próxima Invasão: ${data.plano}
• Reforço Contratado: ${data.reforco}
• Feras Guardiãs: ${data.pet}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#222915] border border-[#526322] flex items-center justify-center text-lime-400 text-lg">
              👺
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Bandos Goblins
              </h3>
              <p className="text-[11px] text-slate-400">Goblins, Covis & Emboscadas</p>
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

        {/* Título do Bando */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar bando"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-lime-300/80 font-mono">
            {data.cores} • {data.simbolo}
          </p>
        </div>

        {/* Informações da Gangue */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-lime-300 font-semibold">Chefe:</strong> {data.chefe}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Covil:</strong> {data.covil}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Lida:</strong> {data.negocio}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Luta:</strong> {data.tatica}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Alvo Fácil:</strong> {data.alvo}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-lime-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Golpe em Planejamento:</strong>
            <span className="text-slate-200">{data.plano}</span>
          </p>
          <p className="text-amber-300/90">
            <strong className="text-amber-400 font-semibold">Aliados & Feras:</strong> {data.reforco} com {data.pet.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Bando'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Sortear Bando
        </button>
      </div>
    </div>
  );
}