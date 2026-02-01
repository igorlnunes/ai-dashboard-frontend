export interface Experience {
  cargo: string;
  empresa: string;
  periodo: string;
  local: string;
  descricao?: string;
}

export interface Education {
  instituicao: string;
  curso: string;
  periodo?: string;
  nivel?: string;
}

export interface Certification {
  titulo: string;
  instituicao: string;
  emitido_em: string;
  expira_em?: string;
  credencial?: string;
}

export interface Volunteerwork {
  cargo: string;
  organizacao: string;
  periodo: string;
  descricao?: string;
}

export interface Languages {
  [key: string]: string;
}

export interface Author {
  nome: string;
  titulo?: string;
  localizacao: string;
  conexoes: number;
  experiencia: Experience[];
  educacao: Education[];
  certificacoes: Certification[];
  voluntariado: Volunteerwork[];
  idiomas?: Languages;
  competencias: string[];
  github?: string;
  linkedin?: string;
}

export interface ProjectLinks {
  frontend: string;
  backend: string;
}
