const PIN_STORAGE_KEY = 'oracle:pinned_cards';

// Cards essenciais que vêm afixados por defeito na primeira utilização
export const DEFAULT_PINS = ['taverna', 'npc', 'cenas', 'tesouro'];

export function getPinnedCards(): string[] {
  if (typeof window === 'undefined') return DEFAULT_PINS;
  try {
    const stored = localStorage.getItem(PIN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PINS;
  } catch {
    return DEFAULT_PINS;
  }
}

export function isCardPinned(cardId: string): boolean {
  return getPinnedCards().includes(cardId);
}

export function toggleCardPin(cardId: string): boolean {
  if (typeof window === 'undefined') return false;
  const current = getPinnedCards();
  let updated: string[];

  if (current.includes(cardId)) {
    updated = current.filter((id) => id !== cardId);
  } else {
    updated = [...current, cardId];
  }

  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('oracle:pins-updated', { detail: updated }));
  } catch (err) {
    console.error('Erro ao guardar pin:', err);
  }

  return updated.includes(cardId);
}