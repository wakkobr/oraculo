import React, { useState } from 'react';
import loots from '../data/loots.json';
import { addHistoryEntry } from '../utils/history';

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const rollDice = (count: number, sides: number) => {
  let total = 0;
  for (let i = 0; i < count; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return total;
};

type LootType = 'individual' | 'hoard';
type CRTier = 'cr0_4' | 'cr5_10' | 'cr11_16' | 'cr17';

export default function LootCard() {
  const [lootType, setLootType] = useState<LootType>('hoard');
  const [cr, setCr] = useState<CRTier>('cr0_4');
  const [data, setData] = useState({
    titulo: 'BAÚ DE COVIL (ND 0–4)',
    moedas: '2.100 PC, 1.200 PP, 90 PO',
    valiosos: 'Gemas: Malaquita verde-clara (10 PO), Pedra-da-lua pálida (50 PO)',
    magico: 'Bolsa de Carga'
  });
  const [copied, setCopied] = useState(false);

  const roll = () => {
    let moedasStr = '';
    let valiososStr = 'Nenhum item de valor';
    let magicoStr = 'Nenhum item mágico (saque mundano)';
    let tituloStr = '';

    if (lootType === 'individual') {
      if (cr === 'cr0_4') {
        tituloStr = 'SAQUE INDIVIDUAL (ND 0–4)';
        const cp = rollDice(3, 6) * 10;
        const sp = rollDice(1, 6) * 5;
        const gp = rollDice(1, 6);
        moedasStr = `${cp} PC, ${sp} PP, ${gp} PO`;
        valiososStr = pick(loots.gemas['10gp']);
        magicoStr = Math.random() > 0.85 ? `✦ ${pick(loots.tabela_a)}` : 'Nenhum (bolsos comuns)';
      } else if (cr === 'cr5_10') {
        tituloStr = 'SAQUE INDIVIDUAL (ND 5–10)';
        const sp = rollDice(4, 6) * 10;
        const gp = rollDice(2, 6) * 10;
        const pp = rollDice(1, 6);
        moedasStr = `${sp} PP, ${gp} PO, ${pp} PL`;
        valiososStr = pick(loots.gemas['50gp']);
        magicoStr = Math.random() > 0.65 ? `✦ ${pick(loots.tabela_b)}` : 'Nenhum item mágico';
      } else if (cr === 'cr11_16') {
        tituloStr = 'SAQUE INDIVIDUAL (ND 11–16)';
        const gp = rollDice(4, 6) * 100;
        const pp = rollDice(1, 6) * 10;
        moedasStr = `${gp.toLocaleString('pt-BR')} PO, ${pp} PL`;
        valiososStr = `${pick(loots.gemas['100gp'])} & ${pick(loots.objetos_arte['250gp'])}`;
        magicoStr = `✦ ${pick(loots.tabela_f)}`;
      } else {
        tituloStr = 'SAQUE INDIVIDUAL (ND 17+)';
        const gp = rollDice(8, 6) * 100;
        const pp = rollDice(3, 6) * 100;
        moedasStr = `${gp.toLocaleString('pt-BR')} PO, ${pp} PL`;
        valiososStr = `${pick(loots.gemas['500gp'])} & ${pick(loots.objetos_arte['750gp'])}`;
        magicoStr = `✦ ${pick(loots.tabela_g)}`;
      }
    } else {
      // Covil / Baú (Hoard)
      if (cr === 'cr0_4') {
        tituloStr = 'BAÚ DE COVIL (ND 0–4)';
        const cp = rollDice(6, 6) * 100;
        const sp = rollDice(3, 6) * 100;
        const gp = rollDice(2, 6) * 10;
        moedasStr = `${cp.toLocaleString('pt-BR')} PC, ${sp.toLocaleString('pt-BR')} PP, ${gp} PO`;
        valiososStr = `Gemas: ${pick(loots.gemas['10gp'])}, ${pick(loots.gemas['50gp'])}`;
        magicoStr = `✦ ${pick(loots.tabela_a)} | ✦ ${pick(loots.tabela_b)}`;
      } else if (cr === 'cr5_10') {
        tituloStr = 'COVIL HEROICO (ND 5–10)';
        const sp = rollDice(4, 6) * 100;
        const gp = rollDice(6, 6) * 100;
        const pp = rollDice(2, 6) * 10;
        moedasStr = `${sp.toLocaleString('pt-BR')} PP, ${gp.toLocaleString('pt-BR')} PO, ${pp} PL`;
        valiososStr = `Arte: ${pick(loots.objetos_arte['250gp'])} & Gema: ${pick(loots.gemas['100gp'])}`;
        magicoStr = `✦ ${pick(loots.tabela_c)} & ✦ ${pick(loots.tabela_f)}`;
      } else if (cr === 'cr11_16') {
        tituloStr = 'TESOURO LENDÁRIO (ND 11–16)';
        const gp = rollDice(12, 6) * 100;
        const pp = rollDice(8, 6) * 100;
        moedasStr = `${gp.toLocaleString('pt-BR')} PO, ${pp} PL`;
        valiososStr = `Arte: ${pick(loots.objetos_arte['750gp'])} & Gema: ${pick(loots.gemas['1000gp'])}`;
        magicoStr = `✦ ${pick(loots.tabela_d)} & ✦ ${pick(loots.tabela_g)} & ✦ ${pick(loots.tabela_h)}`;
      } else {
        tituloStr = 'COVIL ANCESTRAL (ND 17+)';
        const gp = rollDice(12, 6) * 1000;
        const pp = rollDice(8, 6) * 1000;
        moedasStr = `${gp.toLocaleString('pt-BR')} PO, ${pp.toLocaleString('pt-BR')} PL`;
        valiososStr = `Relíquia: ${pick(loots.objetos_arte['7500gp'])} & 2x ${pick(loots.gemas['5000gp'])}`;
        magicoStr = `✦ Supremo: ${pick(loots.tabela_i)} & ✦ ${pick(loots.tabela_e)}`;
      }
    }

    const resultado = {
      titulo: tituloStr,
      moedas: moedasStr,
      valiosos: valiososStr,
      magico: magicoStr
    };

    setData(resultado);
    addHistoryEntry('TESOURO', `${tituloStr} | ${moedasStr} | ${magicoStr}`);
  };

  const copy = () => {
    const text = `${data.titulo}\nMoedas: ${data.moedas}\nObjetos/Gemas: ${data.valiosos}\nItens Mágicos: ${data.magico}`;
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
            <div className="w-9 h-9 rounded-lg bg-[#2a1d13] border border-[#6b451e] flex items-center justify-center text-oracle-gold text-lg">
              💎
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">Tesouro & Saque</h3>
              <p className="text-[11px] text-slate-400">Tabelas Oficiais D&D 5e</p>
            </div>
          </div>

          <button 
            onClick={roll} 
            title="Sortear novamente"
            className="w-8 h-8 rounded-lg bg-[#141830] border border-[#2e3766] hover:border-oracle-gold/50 flex items-center justify-center text-slate-300 hover:text-oracle-gold transition-colors"
          >
            ↻
          </button>
        </div>

        {/* Seletores: Tipo e ND */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Tipo:</label>
            <select 
              value={lootType} 
              onChange={(e) => setLootType(e.target.value as LootType)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
            >
              <option value="hoard">👑 Covil / Baú (Itens Mágicos)</option>
              <option value="individual">💰 Individual (Bolsos)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Desafio (ND):</label>
            <select 
              value={cr} 
              onChange={(e) => setCr(e.target.value as CRTier)}
              className="w-full bg-[#0a0d1c] border border-[#252b4e] rounded px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-oracle-gold/40"
            >
              <option value="cr0_4">ND 0 a 4</option>
              <option value="cr5_10">ND 5 a 10</option>
              <option value="cr11_16">ND 11 a 16</option>
              <option value="cr17">ND 17+</option>
            </select>
          </div>
        </div>

        {/* Bloco de Resultado */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-base font-bold text-oracle-gold-light font-['Cinzel'] tracking-wide">
              {data.titulo}
            </h4>
            <button onClick={copy} title="Copiar saque" className="text-slate-500 hover:text-oracle-gold text-xs transition-colors shrink-0">
              📋
            </button>
          </div>
        </div>

        {/* Detalhes do Saque */}
        <div className="space-y-2 text-xs text-slate-300 mb-6 leading-relaxed bg-[#090d1f]/60 p-3 rounded-lg border border-[#1d2342]">
          <p><strong className="text-oracle-gold font-semibold">Moedas:</strong> {data.moedas}</p>
          <p><strong className="text-oracle-gold font-semibold">Gemas / Arte:</strong> {data.valiosos}</p>
          <p className="border-t border-[#1d2448] pt-1.5 mt-1.5">
            <strong className="text-sky-300 font-semibold block mb-0.5">Itens Mágicos:</strong>
            <span className="text-sky-200 leading-snug block font-mono text-[11px]">{data.magico}</span>
          </p>
        </div>
      </div>

      {/* Ações inferiores */}
      <div className="grid grid-cols-2 gap-2.5 pt-2">
        <button 
          onClick={copy}
          className="w-full py-2 px-3 rounded-md bg-[#131730] hover:bg-[#1a2042] border border-[#2b3360] text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
        >
          <span>📋</span> {copied ? 'Copiado!' : 'Copiar Saque'}
        </button>
        <button 
          onClick={roll}
          className="w-full py-2 px-3 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] hover:brightness-110 text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1"
        >
          <span>🎲</span> Saquear Baú
        </button>
      </div>
    </div>
  );
}