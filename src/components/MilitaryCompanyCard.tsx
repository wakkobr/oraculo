import React, { useState } from 'react';
import militaryData from '../data/military_companies.json';
import { addHistoryEntry } from '../utils/history';
import PinButton from './PinButton';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

type MilitaryMode = 'companhia' | 'soldado';

const nomesCompanhia = [
  'A 4ª Guarda dos Leões Reais',
  'Os Lanceiros do Estandarte Escarlate',
  'O Regimento do Sol da Meia-Noite',
  'A Brigada dos Corvos de Aço',
  'Os Homens-de-Armas da Fronteira',
  'O 2º Batalhão de Infantaria Ducal',
  'Os Casacas-de-Ferro da Fortaleza',
  'A Vanguarda do Martelo Cinzento'
];

export default function MilitaryCompanyCard() {
  const [mode, setMode] = useState<MilitaryMode>('companhia');

  // Estado da Companhia
  const [companyState, setCompanyState] = useState({
    nome: 'A 4ª Guarda dos Leões Reais',
    cores: 'Azul-real',
    estandarte: 'Um leão coroado de garras abertas.',
    comandante: 'Um estrategista genial e frio, formado nas melhores academias bélicas.',
    moral: 'Disciplinada, profissional e estritamente subordinada ao regulamento.',
    especialidade: 'Defesa obstinada de redutos, pontes e paliçadas fortificadas.',
    equipamento: 'Elmos cônicos e couraças de ferro estampadas com o emblema do reino empunhando espadas longas de combate e bestas pesadas na retaguarda.',
    recrutas: 'Homens-de-armas profissionais com instrução formal de guarnição.',
    reputacao: 'Cantar rimas chulas e baladas obscenas durante marchas noturnas.'
  });

  // Estado do Soldado Individual
  const [soldierState, setSoldierState] = useState({
    origem: 'Um garoto de lavoura que trocou o arado pela lança.',
    rosto: 'Uma cicatriz esbranquiçada de corte que cruza o lábio superior.',
    motivacao: 'Pelo soldo para quitar dívidas de jogo com usurários da capital.',
    item: 'Uma medalha religiosa desgastada dada pela mãe como proteção.'
  });

  const [copied, setCopied] = useState(false);

  const roll = () => {
    if (mode === 'companhia') {
      const nome = pick(nomesCompanhia);
      const cores = pick(militaryData.cores);
      const estandarte = pick(militaryData.estandartes);
      const comandante = pick(militaryData.comandantes);
      const moral = pick(militaryData.moral_tropa);
      const especialidade = pick(militaryData.especializacoes);
      const armadura = pick(militaryData.armaduras);
      const arma = pick(militaryData.armamentos);
      const equipamento = `${armadura} empunhando ${arma.toLowerCase()}`;
      const recrutas = pick(militaryData.perfil_recrutas);
      const reputacao = pick(militaryData.reputacao_notoria);

      setCompanyState({
        nome,
        cores,
        estandarte,
        comandante,
        moral,
        especialidade,
        equipamento,
        recrutas,
        reputacao
      });

      addHistoryEntry('FACCAO', `[Companhia Militar] ${nome} | Oficial: ${comandante}`);
    } else {
      const origem = pick(militaryData.soldado.origem);
      const rosto = pick(militaryData.soldado.rosto);
      const motivacao = pick(militaryData.soldado.motivacao);
      const item = pick(militaryData.soldado.item_pessoal);

      setSoldierState({
        origem,
        rosto,
        motivacao,
        item
      });

      addHistoryEntry('NPC', `[Soldado] ${origem} | Foco: ${motivacao}`);
    }
  };

  const copy = () => {
    let text = '';
    if (mode === 'companhia') {
      text = `Companhia Militar: ${companyState.nome}
• Estandarte: ${companyState.estandarte} (Cores: ${companyState.cores})
• Oficial Comandante: ${companyState.comandante} (Moral: ${companyState.moral})
• Especialização de Batalha: ${companyState.especialidade}
• Composição da Tropa: ${companyState.recrutas}
• Fardamento e Arsenal: ${companyState.equipamento}
• Fama no Acampamento: ${companyState.reputacao}`;
    } else {
      text = `Soldado da Companhia:
• Origem: ${soldierState.origem}
• Traço Facial: ${soldierState.rosto}
• Por Que Luta: ${soldierState.motivacao}
• Carrega Consigo: ${soldierState.item}`;
    }

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
            <div className="w-9 h-9 rounded-lg bg-[#271d15] border border-[#6b4724] flex items-center justify-center text-amber-300 text-lg">
              ⚔️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
                Companhias Militares
              </h3>
              <p className="text-[11px] text-slate-400">Regimentos, Linhas & Recrutas</p>
            </div>
          </div>
          <PinButton cardId="militares" />
          <button
            onClick={roll}
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Alternador de Modo */}
        <div className="mb-3">
          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Visualizar:</label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#0a0d1d] border border-[#252b4e] rounded-lg">
            <button
              onClick={() => setMode('companhia')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'companhia'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🏛️ Regimento Regular
            </button>
            <button
              onClick={() => setMode('soldado')}
              className={`py-1 text-xs rounded font-medium transition-all ${
                mode === 'soldado'
                  ? 'bg-[#1e254d] text-oracle-gold font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🪖 Soldado da Fila
            </button>
          </div>
        </div>

        {/* Título do Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {mode === 'companhia' ? companyState.nome : 'Recruta da Linha de Frente'}
            </h4>
            <button
              onClick={copy}
              title="Copiar dados"
              className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0"
            >
              📋
            </button>
          </div>
          <p className="text-[11px] text-amber-300/80 font-mono">
            {mode === 'companhia'
              ? `${companyState.cores} • ${companyState.estandarte}`
              : soldierState.origem}
          </p>
        </div>

        {/* Conteúdo Dinâmico */}
        {mode === 'companhia' ? (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-amber-300 font-semibold">Comando:</strong> {companyState.comandante}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Disciplina / Moral:</strong> {companyState.moral}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Doutrina:</strong> {companyState.especialidade}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Tropa:</strong> {companyState.recrutas}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Equipamento:</strong> {companyState.equipamento}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Fama nos Bivaques:</strong>
              <span className="text-slate-200">{companyState.reputacao}</span>
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
            <p>
              <strong className="text-amber-300 font-semibold">Origem:</strong> {soldierState.origem}
            </p>
            <p>
              <strong className="text-slate-400 font-semibold">Feições:</strong> {soldierState.rosto}
            </p>
            <p>
              <strong className="text-oracle-gold font-semibold">Por Que Luta:</strong> {soldierState.motivacao}
            </p>
            <p className="border-t border-[#1d2448] pt-1.5 mt-1.5 text-amber-200/90">
              <strong className="text-oracle-gold font-semibold block mb-0.5">Carrega nos Bolsos / Coldre:</strong>
              <span className="text-slate-300 italic font-serif">{soldierState.item}</span>
            </p>
          </div>
        )}
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar'}
        </button>
        <button
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> {mode === 'companhia' ? 'Gerar Companhia' : 'Gerar Soldado'}
        </button>
      </div>
    </div>
  );
}