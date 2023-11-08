export interface IMensagem {
  id?: number;
  created_at?: Date;
  conteudo: string;
  id_usuario?: number | null;
  id_vaga_candidato?: number;
}
