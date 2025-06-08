export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Event {
  id: string;
  tipo: 'enchente' | 'incendio' | 'terremoto' | 'deslizamento';
  localizacao: string;
  estado: string;
  severidade: 'baixa' | 'media' | 'alta';
  dataOcorrencia: string;
  descricao: string;
  status: 'ativo' | 'resolvido' | 'monitorando';
}

export interface DashboardStats {
  totalEventos: number;
  eventosAtivos: number;
  severidadeAlta: number;
  regioesMaisAfetadas: string[];
}