import React, { useState, useEffect } from 'react';
import { isCardPinned, toggleCardPin } from '../utils/pins';

interface PinButtonProps {
  cardId: string;
}

export default function PinButton({ cardId }: PinButtonProps) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    // Inicializa o estado com base no localStorage
    setPinned(isCardPinned(cardId));

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (Array.isArray(customEvent.detail)) {
        // Checa estritamente se ESTE card específico está no array
        setPinned(customEvent.detail.includes(cardId));
      }
    };

    window.addEventListener('oracle:pins-updated', handleUpdate);
    return () => window.removeEventListener('oracle:pins-updated', handleUpdate);
  }, [cardId]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleCardPin(cardId);
    setPinned(newState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={pinned ? 'Desafixar da Mesa Principal' : 'Fixar na Mesa Principal'}
      className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs transition-all shrink-0 ${
        pinned
          ? 'bg-[#2b2414] border-oracle-gold text-oracle-gold shadow-[0_0_8px_rgba(212,178,111,0.35)]'
          : 'bg-[#141830] border-[#2e3766] text-slate-500 hover:text-slate-300 hover:border-slate-400'
      }`}
    >
      📌
    </button>
  );
}