export interface IUsuario {
  id: number;
  created_at?: Date;
  updated_at?: Date;
  nome: string;
  tipo: "RECRUTADOR" | "CANDIDATO";
  senha?: string;
  email: string;
  telefone?: string | null;
  linkedin?: string | null;
  github?: string | null;
  portfolio?: string | null;
  usuario_hardskill?: UsuarioHardSkill[] | null;
  usuario_softskill?: UsuarioSoftSkill[] | null;
}

interface UsuarioHardSkill {
  id: number;
  created_at: Date;
  updated_at: Date;
  nivel_experiencia: number;
  id_usuario: number;
  id_hardskill: number;
}

interface UsuarioSoftSkill {
  id: number;
  created_at: Date;
  updated_at: Date;
  nivel_experiencia: number;
  id_usuario: number;
  id_softskill: number;
}
