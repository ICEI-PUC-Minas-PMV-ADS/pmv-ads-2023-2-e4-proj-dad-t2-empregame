export interface IUsuario {
  id?: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  nome: string;
  tipo?: "RECRUTADOR" | "CANDIDATO" | null;
  senha?: string | null;
  email?: string | null;
  telefone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  usuario_hardskill?: IUsuarioHardSkill[] | null;
  usuario_softskill?: IUsuarioSoftSkill[] | null;
}

export interface IUsuarioHardSkill {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  nivel_experiencia: number;
  id_usuario?: number;
  id_hardskill?: number;
  hardskill: { nome: string };
}

export interface IUsuarioSoftSkill {
  id: number;
  created_at: Date;
  updated_at: Date;
  nivel_experiencia: number;
  id_usuario: number;
  id_softskill: number;
  softskill: { nome: string };
}
