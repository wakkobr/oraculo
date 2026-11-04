import React, { useState, useEffect } from 'react';
import type { HistoryItem } from '../utils/history';

export default function SessionLog() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    const handleNewItem = (event: Event) => {
      const customEvent = event as CustomEvent<HistoryItem>;
      if (customEvent.detail) {
        setHistory((prev) => [customEvent.detail, ...prev].slice(0, 30));
      }
    };

    window.addEventListener('oracle:new-history', handleNewItem);
    return () => window.removeEventListener('oracle:new-history', handleNewItem);
  }, []);

  const clearHistory = () => {
    setHistory([]);
  };

  const copyAllHistory = () => {
    if (history.length === 0) return;
    const text = history
      .map((item) => {
        const label = item.tipo === 'ENCONTRO' ? 'CENA' : item.tipo;
        return `[${item.hora}] [${label}] ${item.texto}`;
      })
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  const getBadgeStyle = (tipo: HistoryItem['tipo']) => {
    switch (tipo) {
      case 'TAVERNA':
        return 'bg-[#181d38] text-indigo-300 border border-indigo-500/30';
      case 'NPC':
        return 'bg-[#22173a] text-purple-300 border border-purple-500/30';
      case 'LIVRO':
        return 'bg-[#14232a] text-teal-300 border border-[#214b5c]';
      case 'COGUMELO':
        return 'bg-[#11241a] text-emerald-300 border border-[#1b5e3a]';
      case 'MAGIA':
        return 'bg-[#27153b] text-purple-300 border border-[#582885]';
      case 'ENCONTRO':
        return 'bg-[#2b1f14] text-amber-300 border border-[#6b4c23]';
      case 'TESOURO':
      default:
        return 'bg-[#2a1d13] text-[#d4b26f] border border-[#6b451e]/40';
    }
  };

  return (
    <section className="mt-12 bg-oracle-card border border-[#222744] rounded-xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)]">
      {/* Cabeçalho do Histórico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 border-b border-[#1c2242] gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#141830] border border-[#283058] flex items-center justify-center text-oracle-gold text-sm">
            📜
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-['Cinzel']">
              Registro da Sessão
            </h3>
            <p className="text-[11px] text-slate-400">
              Histórico dos últimos resultados sorteados na mesa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {history.length > 0 && (
            <>
              <button
                onClick={copyAllHistory}
                className="px-2.5 py-1 rounded bg-[#131730] hover:bg-[#1b2144] border border-[#2b3360] text-[11px] text-slate-300 hover:text-oracle-gold transition-colors flex items-center gap-1"
                title="Copiar todo o histórico"
              >
                <span>📋</span> {copiedAll ? 'Copiado!' : 'Copiar Tudo'}
              </button>
              <button
                onClick={clearHistory}
                className="px-2.5 py-1 rounded bg-[#1f141a] hover:bg-[#2d1822] border border-[#502231] text-[11px] text-red-300 hover:text-red-200 transition-colors flex items-center gap-1"
                title="Limpar histórico da sessão"
              >
                <span>🗑️</span> Limpar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Lista de Registros */}
      {history.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-500 font-mono">
          Nenhuma rolagem feita nesta sessão ainda. Role qualquer gerador acima para registrar aqui.
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-[#0a0d1d]/70 border border-[#1b203c] text-xs transition-colors hover:border-[#2d3664]"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-[10px] font-mono text-slate-500 shrink-0 pt-0.5">
                  {item.hora}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${getBadgeStyle(
                    item.tipo
                  )}`}
                >
                  {item.tipo === 'ENCONTRO' ? 'CENA' : item.tipo}
                </span>
                <span className="text-slate-300 wrap-break-word leading-relaxed">
                  {item.texto}
                </span>
              </div>
              <button
                onClick={() => {
                  const label = item.tipo === 'ENCONTRO' ? 'CENA' : item.tipo;
                  navigator.clipboard.writeText(`[${label}] ${item.texto}`);
                }}
                title="Copiar este item"
                className="text-slate-500 hover:text-oracle-gold text-xs shrink-0 transition-colors pt-0.5"
              >
                📋
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}