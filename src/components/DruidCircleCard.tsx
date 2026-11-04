import React, { useState } from 'react';
import druidsData from '../data/druid_circles.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type DruidCategory = 'terra' | 'clima' | 'desastres' | 'arvores' | 'bestas' | 'aguas';

const nomesCirculo: Record<DruidCategory, string[]> = {
  terra: ['Círculo das Raízes Profundas', 'A Irmandade do Cânion Vermelho', 'Os Guardiões dos Menires'],
  clima: ['Círculo da Tempestade Eterna', 'Os Peregrinos da Brisa Matinal', 'A Ordem dos Céus Cinzentos'],
  desastres: ['Círculo da Fenda Glacial', 'Os Filhos do Vulcão Desperto', 'A Voz do Terremoto'],
  arvores: ['Círculo do Carvalho Titânico', 'Os Tecelões das Copas Altas', 'A Fraternidade da Seiva Antiga'],
  bestas: ['Círculo das Presas Sangrentas', 'A Matilha das Sombras Uivantes', 'A Manada Primitiva'],
  aguas: ['Círculo das Águas Profundas', 'Os Guardiões do Lago Oculto', 'A Confraria dos Rios Serpenteantes']
};

export default function DruidCircleCard() {
  const [categoria, setCategoria] = useState<DruidCategory>('arvores');
  const [data, setData] = useState({
    nome: 'Círculo do Carvalho Titânico',
    ramo: 'Círculo das Árvores Anciãs',
    filosofia: 'A harmonia mística e a comunhão plena com o mundo natural.',
    localSagrado: 'Um bosque sagrado protegido onde a luz do sol dança entre folhas intocadas.',
    detalheSitio: 'Flores raras e perfumadas cujo aroma induz transe meditativo.',
    focoDruidico: 'Um cajado de tronco retorcido colhido de uma árvore milenar petrificada.',
    focoNatural: 'Carvalhos majestosos ou bordos de copa dourada.',
    bestaFavorecida: 'Gaviões de copa ou corujas-buraqueiras.',
    habito: 'Só usam madeira que caiu naturalmente dos galhos ao chão.',
    missao: 'Resgatar e preservar a pureza natural de um local perante o avanço da civilização.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const circuloInfo = druidsData.categorias[categoria];
    const nome = pick(nomesCirculo[categoria]);
    const filosofia = pick(druidsData.filosofias);
    const localSagrado = pick(druidsData.locais_sagrados);
    const detalheSitio = pick(druidsData.detalhes_sitio);
    const focoDruidico = pick(druidsData.focos_druidicos);
    const focoNatural = pick(circuloInfo.foco_natural);
    const bestaFavorecida = pick(circuloInfo.besta_favorecida);
    const habito = pick(circuloInfo.habito_ritual);
    const missao = pick(druidsData.missoes);

    setData({
      nome,
      ramo: circuloInfo.nome,
      filosofia,
      localSagrado,
      detalheSitio,
      focoDruidico,
      focoNatural,
      bestaFavorecida,
      habito,
      missao
    });

    addHistoryEntry('FACCAO', `[Círculo Druídico] ${nome} (${circuloInfo.nome})`);
  };

  const copy = () => {
    const text = `Círculo Druídico: ${data.nome} (${data.ramo})
• Ideal / Filosofia: ${data.filosofia}
• Devoção / Foco Natural: ${data.focoNatural}
• Fera Companheira: ${data.bestaFavorecida}
• Santuário: ${data.localSagrado} (Marcado por: ${data.detalheSitio})
• Foco Primal: ${data.focoDruidico}
• Rito / Tradição Severa: ${data.habito}
• Missão Atual: ${data.missao}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#142618] border border-[#235e2e] flex items-center justify-center text-emerald-400 text-lg">
              🍃
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Círculos Druídicos
              </h3>
              <p className="text-[11px] text-slate-400">Guardiões da Natureza & Ermos</p>
            </div>
          </div>
          <PinButton cardId="druidas" />
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
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Vertente Elemental:</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as DruidCategory)}
            className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
          >
            <option value="arvores">🌳 Árvores Anciãs & Bosques</option>
            <option value="terra">⛰️ Terra & Profundezas</option>
            <option value="clima">⛈️ Ventos & Clima</option>
            <option value="desastres">🌋 Cataclismos & Forças Brutas</option>
            <option value="bestas">🐺 Bestas Primitivas & Manadas</option>
            <option value="aguas">🌊 Águas Profundas & Mares</option>
          </select>
        </div>

        {/* Nome do Círculo */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar círculo"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-emerald-300/80 font-mono">
            {data.ramo}
          </p>
        </div>

        {/* Detalhes do Círculo */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-emerald-400 font-semibold">Filosofia:</strong> {data.filosofia}
          </p>
          <p>
            <strong className="text-emerald-400 font-semibold">Devoção Sagrada:</strong> {data.focoNatural}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Besta Irmã:</strong> {data.bestaFavorecida}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Santuário:</strong> {data.localSagrado} ({data.detalheSitio})
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Foco Primal:</strong> {data.focoDruidico}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-emerald-200/90">
            <strong className="text-oracle-gold font-semibold block mb-0.5">Tradição & Rito:</strong>
            <span className="text-slate-200">{data.habito}</span>
          </p>
          <p className="text-amber-300/90">
            <strong className="text-amber-400 font-semibold">Vontade da Terra:</strong> {data.missao}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Círculo'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Despertar Círculo
        </button>
      </div>
    </div>
  );
}