import React, { useState, useEffect } from 'react';
import type { HistoryItem } from '../utils/history';

export default function SessionLog() {
  const [items, setItems] = useState<HistoryItem[]>([
    {
      id: '1',
      tipo: 'TESOURO',
      texto: '100 PC, 20 PP, 1 PO | Pequena turquesa azulada (vale ~15 PO)',
      hora: '18:01:39',
    },
    {
      id: '2',
      tipo: 'NPC',
      texto: 'Rurik Barbaferro (Anao)',
      hora: '18:01:39',
    },
    {
      id: '3',
      tipo: 'TAVERNA',
      texto: 'O Machado Dorminhoco (Pernil de carneiro assado com ervas dos ermos e pão rústico de centeio.)',
      hora: '18:01:39',
    },
  ]);

  useEffect(() => {
    const handleNewEntry = (e: Event) => {
      const customEvent = e as CustomEvent<HistoryItem>;
      if (customEvent.detail) {
        setItems((prev) => [customEvent.detail, ...prev.slice(0, 9)]);
      }
    };
    window.addEventListener('oracle:new-history', handleNewEntry);
    return () => window.removeEventListener('oracle:new-history', handleNewEntry);
  }, []);

  const clearLog = () => setItems([]);

  const copyItem = (texto: string) => {
    navigator.clipboard.writeText(texto);
  };

  return (
    <div className="mt-12 bg-[#0a0d1e] border border-[#2b335c] rounded-xl p-5 shadow-2xl relative">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#1b2144]">
        <div className="flex items-center gap-2">
          <span className="text-[#d4b26f] text-base">🕒</span>
          <h3 className="text-sm font-bold text-[#f2dfb3] font-['Cinzel'] tracking-wider uppercase">
            Registro da Sessão (Últimos Sorteios)
          </h3>
        </div>
        <button
          onClick={clearLog}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors font-mono"
        >
          <span>🗑</span> Limpar Registro
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 font-mono py-4 text-center">Nenhum sorteio registrado nesta sessão ainda.</p>
      ) : (
        <div className="space-y-2 font-mono text-xs">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2 rounded bg-[#0d1229]/80 border border-[#1d2448] hover:border-[#2f3b75] transition-colors"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                    item.tipo === 'TAVERNA'
                    ? 'bg-[#181d38] text-indigo-300 border border-indigo-500/30'
                    : item.tipo === 'NPC'
                    ? 'bg-[#22173a] text-purple-300 border border-purple-500/30'
                    : item.tipo === 'LIVRO'
                    ? 'bg-[#14232a] text-teal-300 border border-[#214b5c]'
                    : 'bg-[#2a1d13] text-[#d4b26f] border border-[#6b451e]/40'
                  }`}
                >
                  {item.tipo}
                </span>
                <span className="text-slate-300 truncate">{item.texto}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="text-slate-500 text-[11px]">{item.hora}</span>
                <button
                  onClick={() => copyItem(item.texto)}
                  title="Copiar linha"
                  className="text-slate-400 hover:text-[#d4b26f] transition-colors text-xs"
                >
                  📋
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}