import React, { useState } from 'react';
import outlawsData from '../data/outlaws.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type OutlawCategory = 'geral' | 'cacadores' | 'salteadores' | 'contrabandistas';

const nomesBando = [
  'Os Lobos da Estrada Real',
  'A Confraria do Arco Quebrado',
  'Os Filhos da Floresta Negra',
  'Os Ratos da Charneca',
  'A Irmandade da Névoa Cinzenta',
  'Os Justiceiros do Ramo Verde',
  'O Terror dos Mercadores',
  'Os Renegados da Colina Vermelha'
];

export default function OutlawBandCard() {
  const [categoria, setCategoria] = useState<OutlawCategory>('geral');
  const [data, setData] = useState({
    nome: 'Os Lobos da Estrada Real',
    negocio: 'Assalto a comboios e caravanas carregadas de gemas, metais preciosos e tapeçarias.',
    cores: 'Verde-floresta escuro & Marrom-chocolate escuro',
    simbolo: 'Um crânio rústico pintado com carvão.',
    lider: 'Um ladino charmoso e galanteador que rouba com elegância e deboche.',
    membros: 'Veteranos de guerras passadas desmobilizados sem terra nem pensão.',
    armamento: 'Arcos longos de precisão colhidos dos próprios guardas florestais.',
    esconderijo: 'Em uma gruta úmida e oculta atrás de uma cachoeira ruidosa.',
    reputacao: 'Nobres arrogantes, cortesãos e damas de carruagem.',
    ambicao: 'Lutar por liberdade, equidade e abolição dos dízimos feudais.',
    detalheEspecial: 'Ataque em enxame berrando e saltando dos barrancos sobre as carroças.',
    foraDaLei: 'Um chapéu de abas largas desabadas adornado com uma pena de coruja.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesBando);
    const cor1 = pick(outlawsData.cores);
    const cor2 = pick(outlawsData.cores);
    const cores = cor1 === cor2 ? cor1 : `${cor1} & ${cor2}`;
    const simbolo = pick(outlawsData.simbolos);
    const lider = pick(outlawsData.lideres);
    const membros = pick(outlawsData.membros);
    const armamento = pick(outlawsData.armamentos);
    const esconderijo = pick(outlawsData.esconderijos);
    const reputacao = pick(outlawsData.reputacao);
    const ambicao = pick(outlawsData.ambicoes);
    const foraDaLei = pick(outlawsData.traço_individual);

    let negocio = pick(outlawsData.negocios);
    let detalheEspecial = '';

    if (categoria === 'cacadores') {
      negocio = 'Caça predatória e comércio ilegal nas reservas protegidas.';
      const presa = pick(outlawsData.subtipos.cacadores.presas);
      const motivo = pick(outlawsData.subtipos.cacadores.motivo);
      detalheEspecial = `Presa cobiçada: ${presa} (Motivação: ${motivo.toLowerCase()})`;
    } else if (categoria === 'salteadores') {
      negocio = 'Emboscadas violentas a carruagens e saque de estradas.';
      const tatica = pick(outlawsData.subtipos.salteadores.tatica);
      const fama = pick(outlawsData.subtipos.salteadores.notoriedade);
      detalheEspecial = `Tática: ${tatica} (Fama: ${fama.toLowerCase()})`;
    } else if (categoria === 'contrabandistas') {
      negocio = 'Rotas secretas e transporte ilegal de mercadorias proibidas.';
      const metodo = pick(outlawsData.subtipos.contrabandistas.metodo);
      const patrono = pick(outlawsData.subtipos.contrabandistas.patrono);
      detalheEspecial = `Método: ${metodo} (Conivência / Patrono: ${patrono.toLowerCase()})`;
    } else {
      detalheEspecial = `Foco: ${ambicao}`;
    }

    setData({
      nome,
      negocio,
      cores,
      simbolo,
      lider,
      membros,
      armamento,
      esconderijo,
      reputacao,
      ambicao,
      detalheEspecial,
      foraDaLei
    });

    addHistoryEntry('FACCAO', `[Foras-da-Lei] ${nome} | Líder: ${lider}`);
  };

  const copy = () => {
    const text = `Bando de Foras-da-Lei: ${data.nome}
• Cores & Estandarte: ${data.cores} (Símbolo: ${data.simbolo})
• Ofício Ilegal: ${data.negocio}
• Liderança: ${data.lider}
• Perfil do Bando: ${data.membros}
• Arsenal Comum: ${data.armamento}
• Covil / Esconderijo: ${data.esconderijo}
• Temidos / Respeitados por: ${data.reputacao}
• Modus Operandi: ${data.detalheEspecial}
• Fora-da-Lei de Destaque: ${data.foraDaLei}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#271d15] border border-[#6b4724] flex items-center justify-center text-amber-400 text-lg">
              🏹
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Bandos Foras-da-Lei
              </h3>
              <p className="text-[11px] text-slate-400">Salteadores, Caçadores & Contrabando</p>
            </div>
          </div>
          <PinButton cardId="foras-da-lei" />
          <button
            onClick={roll}
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Seletor de Categoria */}
        <div className="mb-3">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Ramo de Atuação:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as OutlawCategory)}
            className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
          >
            <option value="geral">🌲 Bando Geral dos Ermos</option>
            <option value="salteadores">⚔️ Salteadores de Estrada</option>
            <option value="cacadores">🦌 Caçadores Ilegais (Presas Nobres)</option>
            <option value="contrabandistas">📦 Contrabandistas de Cargas</option>
          </select>
        </div>

        {/* Nome do Bando */}
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
            <strong className="text-slate-400 font-semibold">Composição:</strong> {data.membros}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Covil / Refúgio:</strong> {data.esconderijo}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Lida Principal:</strong> {data.negocio}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Arsenal Típico:</strong> {data.armamento}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Modus Operandi:</strong>
            <span className="text-slate-200">{data.detalheEspecial}</span>
          </p>
          <p className="text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Figura do Bando:</strong> {data.foraDaLei}
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