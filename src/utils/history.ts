export interface HistoryItem {
  id: string;
  tipo: 'TAVERNA' | 'NPC' | 'TESOURO';
  texto: string;
  hora: string;
}

export const addHistoryEntry = (tipo: 'TAVERNA' | 'NPC' | 'TESOURO', texto: string) => {
  const agora = new Date();
  const hora = agora.toTimeString().split(' ')[0];
  const item: HistoryItem = {
    id: Math.random().toString(36).substring(2, 9),
    tipo,
    texto,
    hora,
  };
  window.dispatchEvent(new CustomEvent('oracle:new-history', { detail: item }));
};