import React, { useState } from 'react';
import hordesData from '../data/savage_hordes.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const nomesHordas = [
  'A Horda dos Presas de Sangue',
  'O Clã do Machado Rachado',
  'A Tribo do Trovão Negro',
  'Os Guerreiros da Garra de Urso',
  'Os Cavaleiros das Estepes Cinzentas',
  'A Horda do Lobo Vermelho',
  'O Clã das Cinzas Queimadas',
  'A Confederação do Cervo de Prata'
];

export default function SavageHordeCard() {
  const [data, setData] = useState({
    nome: 'A Horda dos Presas de Sangue',
    origem: 'Uma tribo de nômades caçadores que segue manadas pelas estepes.',
    marcha: 'Montados em corcéis selvagens, bisões de carga ou montarias de combate.',
    lider: 'Um senhor da guerra carismático que galvaniza a fúria das tribos.',
    virtude: 'Bravura obstinada diante da morte iminente.',
    totem: 'Feras Totêmicas Ancestrais (ursos pardos, javalis espinhosos, lobos uivantes ou águias reais)',
    costume: 'Berros de guerra histéricos, urros guturais e batidas de escudos no combate.',
    reputacao: 'Jamais poupar guerreiros rendidos ou deixar sobreviventes.',
    tabu: 'Forasteiros inteiramente cobertos por couraças e armaduras de placas de aço.',
    temperamento: 'Altamente agressivo, vingativo e pronto para desembainhar armas ao menor olhar.'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    const nome = pick(nomesHordas);
    const origem = pick(hordesData.origem);
    const marcha = pick(hordesData.deslocamento);
    const lider = pick(hordesData.lideres);
    const virtude = pick(hordesData.virtudes);
    const totem = pick(hordesData.iconografia);
    const costume = pick(hordesData.costumes_ritos);
    const reputacao = pick(hordesData.reputacao_sombria);
    const tabu = pick(hordesData.tabus_medos);
    const temperamento = pick(hordesData.temperamento);

    setData({
      nome,
      origem,
      marcha,
      lider,
      virtude,
      totem,
      costume,
      reputacao,
      tabu,
      temperamento
    });

    addHistoryEntry('FACCAO', `[Horda Bárbara] ${nome} | Líder: ${lider}`);
  };

  const copy = () => {
    const text = `Horda Selvagem / Clã Bárbaro: ${data.nome}
• Natureza: ${data.origem}
• Liderança: ${data.lider}
• Marcha & Deslocamento: ${data.marcha}
• Estandarte & Totem: ${data.totem}
• Valor Supremo do Clã: ${data.virtude}
• Temperamento da Turba: ${data.temperamento}
• Rito Notável: ${data.costume}
• Fama Terrível: ${data.reputacao}
• Pavor / Tabu Ritual: Evitam ${data.tabu.toLowerCase()}`;

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
            <div className="w-9 h-9 rounded-lg bg-[#2b1814] border border-[#6b2c22] flex items-center justify-center text-orange-400 text-lg">
              🪓
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Hordas Selvagens
              </h3>
              <p className="text-[11px] text-slate-400">Bárbaros, Clãs & Saqueadores</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PinButton cardId="hordas" />
            <button
              onClick={roll}
              title="Sortear novamente"
              className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
            >
              ↻
            </button>
          </div>
        </div>

        {/* Título da Horda */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.nome}
            </h4>
            <button
              onClick={copy}
              title="Copiar horda"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-orange-300/80 font-mono">
            Totem: {data.totem}
          </p>
        </div>

        {/* Informações da Facção */}
        <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p>
            <strong className="text-orange-400 font-semibold">Liderança:</strong> {data.lider}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Origem:</strong> {data.origem}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Marcha:</strong> {data.marcha}
          </p>
          <p>
            <strong className="text-oracle-gold font-semibold">Virtude Suprema:</strong> {data.virtude}
          </p>
          <p>
            <strong className="text-slate-400 font-semibold">Disposição:</strong> {data.temperamento}
          </p>
          <p>
            <strong className="text-amber-300 font-semibold">Rito Ancestral:</strong> {data.costume}
          </p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-rose-300/90">
            <strong className="text-rose-400 font-semibold">Crueldade Notória:</strong> {data.reputacao}
          </p>
          <p className="text-purple-300/90">
            <strong className="text-purple-400 font-semibold">Pavor / Tabu:</strong> {data.tabu}
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Horda'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Evocar Clã
        </button>
      </div>
    </div>
  );
}