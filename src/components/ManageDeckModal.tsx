import React, { useState, useEffect } from 'react';
import { getPinnedCards, toggleCardPin, DEFAULT_PINS } from '../utils/pins';

const ALL_CARDS = [
  { id: 'taverna', nome: 'Taverna & Boatos', categoria: 'Sessão & Cidades' },
  { id: 'npc', nome: 'NPC Instantâneo', categoria: 'Sessão & Cidades' },
  { id: 'cenas', nome: 'Cenas & Detalhes', categoria: 'Sessão & Cidades' },
  { id: 'tesouro', nome: 'Tesouros & Saque', categoria: 'Sessão & Cidades' },
  { id: 'grimorio', nome: 'Grimório Arcano', categoria: 'Arcano' },
  { id: 'tomos', nome: 'Livros & Manuscritos', categoria: 'Arcano' },
  { id: 'alquimia-cogumelos', nome: 'Fungos & Alquimia', categoria: 'Alquimia' },
  { id: 'guardas-urbanos', nome: 'Guardas Urbanos & Patrulha', categoria: 'Facções' },
  { id: 'gangues-urbanas', nome: 'Gangues Urbanas & Larápios', categoria: 'Facções' },
  { id: 'sociedades-secretas', nome: 'Sociedades Secretas', categoria: 'Facções' },
  { id: 'hordas', nome: 'Hordas Selvagens & Clãs', categoria: 'Facções' },
  { id: 'nobres', nome: 'Casas Nobres', categoria: 'Facções' },
  { id: 'militares', nome: 'Companhias Militares', categoria: 'Facções' },
  { id: 'mercenarios', nome: 'Tropas Mercenárias', categoria: 'Facções' },
  { id: 'assassinos', nome: 'Guildas de Assassinos', categoria: 'Facções' },
  { id: 'foras-da-lei', nome: 'Bandos Foras-da-Lei', categoria: 'Facções' },
  { id: 'piratas', nome: 'Tripulações Piratas', categoria: 'Facções' },
  { id: 'goblins', nome: 'Bandos Goblins', categoria: 'Facções' },
  { id: 'cultos', nome: 'Cultos & Seitas', categoria: 'Facções' },
  { id: 'druidas', nome: 'Círculos Druídicos', categoria: 'Facções' },
  { id: 'mercadores', nome: 'Guildas Mercantes', categoria: 'Facções' },
  { id: 'artesaos', nome: 'Guildas de Ofício', categoria: 'Facções' },
  { id: 'trupes', nome: 'Trupes Teatrais', categoria: 'Facções' },
];

export default function ManageDeckModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [pinned, setPinned] = useState<string[]>([]);

  useEffect(() => {
    setPinned(getPinnedCards());
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) setPinned(customEvent.detail);
    };
    window.addEventListener('oracle:pins-updated', handleUpdate);
    return () => window.removeEventListener('oracle:pins-updated', handleUpdate);
  }, []);

  const handleToggle = (id: string) => {
    toggleCardPin(id);
  };

  const handleReset = () => {
    localStorage.setItem('oracle:pinned_cards', JSON.stringify(DEFAULT_PINS));
    window.dispatchEvent(new CustomEvent('oracle:pins-updated', { detail: DEFAULT_PINS }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-oracle-gold hover:text-oracle-gold-light border border-[#2b3360] hover:border-oracle-gold/50 px-3 py-1.5 rounded-lg bg-[#0e1224] transition-all font-mono flex items-center gap-1.5 shadow-xs"
      >
        <span>⚙️</span> Personalizar Mesa ({pinned.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#0b0e1e] border border-[#2a325c] rounded-xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between p-4 border-b border-[#1c2242]">
              <div className="flex items-center gap-2.5">
                <span className="text-oracle-gold text-base">📌</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 font-['Cinzel'] tracking-wide">
                    Gerenciar Cards da Mesa
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Selecione quais geradores aparecem na página principal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#141830] text-slate-400 hover:text-slate-200 border border-[#22294c] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Lista com scroll */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {ALL_CARDS.map((card) => {
                const isSelected = pinned.includes(card.id);
                return (
                  <div
                    key={card.id}
                    onClick={() => handleToggle(card.id)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#151c38] border-oracle-gold/40 text-slate-200'
                        : 'bg-[#090c1a] border-[#1a203c] text-slate-400 hover:border-[#2d3664]'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{card.nome}</p>
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                        {card.categoria}
                      </span>
                    </div>
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors ${
                        isSelected
                          ? 'bg-oracle-gold text-[#0b0e1e] font-bold'
                          : 'bg-[#141830] text-slate-600 border border-[#242b50]'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Rodapé com Ações */}
            <div className="p-3.5 border-t border-[#1c2242] flex items-center justify-between bg-[#080a16]">
              <button
                onClick={handleReset}
                className="text-[11px] text-red-400 hover:text-red-300 font-mono underline"
              >
                Restaurar Padrão da Mesa
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-md bg-[linear-gradient(135deg,#d4b26f_0%,#b8934a_100%)] text-[#0c0e18] text-xs font-bold font-['Cinzel'] tracking-wider hover:brightness-110"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}