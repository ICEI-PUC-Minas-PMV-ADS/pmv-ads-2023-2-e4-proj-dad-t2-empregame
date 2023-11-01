export interface IVaga {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  disabled_at?: Date | null;
  nome: string;
  descricao: string;
  salario: string;
  beneficios?: string | null;
  empresa_nome: string;
  empresa_cidade: string;
  empresa_estado: string;
  situacao: "ATIVO" | "INATIVO";
  id_usuario?: number;
  vaga_hardskill?: IVagaHardSkill[] | null;
  vaga_softskill?: IVagaSoftSkill[] | null;
  vaga_candidato?: IVagaCandidato[] | null;
  usuario?: {
    nome: string;
    id: number;
  };
}

export interface IVagaHardSkill {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  id_vaga: number;
  id_hardskill: number;
  hardskill?: { nome: string };
}

export interface IVagaSoftSkill {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  id_vaga: number;
  id_softskill: number;
  softskill?: { nome: string };
}

export interface IVagaCandidato {
  id: number;
  created_at: Date;
  updated_at: Date;
  match: boolean;
  id_usuario: number;
  id_vaga: number;
  usuario?: { nome: string };
}
