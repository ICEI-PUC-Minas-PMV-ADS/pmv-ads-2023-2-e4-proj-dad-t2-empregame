-- CreateTable
CREATE TABLE "usuario" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(511) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(255),
    "linkedin" VARCHAR(511),
    "github" VARCHAR(511),
    "portfolio" VARCHAR(511),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaga" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "disabled_at" TIMESTAMP,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT NOT NULL,
    "salario" VARCHAR(255) NOT NULL,
    "beneficios" TEXT,
    "empresa_nome" VARCHAR(255) NOT NULL,
    "empresa_cidade" VARCHAR(255) NOT NULL,
    "empresa_estado" VARCHAR(255) NOT NULL,
    "situacao" VARCHAR(255) NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hardskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "hardskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "softskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" VARCHAR(255) NOT NULL,

    CONSTRAINT "softskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_hardskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "nivel_experiencia" SMALLINT NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_hardskill" BIGINT NOT NULL,

    CONSTRAINT "usuario_hardskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_softskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "nivel_experiencia" SMALLINT NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_softskill" BIGINT NOT NULL,

    CONSTRAINT "usuario_softskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaga_hardskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_hardskill" BIGINT NOT NULL,

    CONSTRAINT "vaga_hardskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaga_softskill" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_softskill" BIGINT NOT NULL,

    CONSTRAINT "vaga_softskill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaga_candidato" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "match" BOOLEAN NOT NULL DEFAULT false,
    "id_usuario" BIGINT NOT NULL,
    "id_vaga" BIGINT NOT NULL,

    CONSTRAINT "vaga_candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensagem" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conteudo" TEXT NOT NULL,
    "id_usuario" BIGINT NOT NULL,
    "id_vaga_candidato" BIGINT NOT NULL,

    CONSTRAINT "mensagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario_hardskill" ADD CONSTRAINT "usuario_hardskill_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_hardskill" ADD CONSTRAINT "usuario_hardskill_id_hardskill_fkey" FOREIGN KEY ("id_hardskill") REFERENCES "hardskill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_softskill" ADD CONSTRAINT "usuario_softskill_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario_softskill" ADD CONSTRAINT "usuario_softskill_id_softskill_fkey" FOREIGN KEY ("id_softskill") REFERENCES "softskill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_hardskill" ADD CONSTRAINT "vaga_hardskill_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_hardskill" ADD CONSTRAINT "vaga_hardskill_id_hardskill_fkey" FOREIGN KEY ("id_hardskill") REFERENCES "hardskill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_softskill" ADD CONSTRAINT "vaga_softskill_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_softskill" ADD CONSTRAINT "vaga_softskill_id_softskill_fkey" FOREIGN KEY ("id_softskill") REFERENCES "softskill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_candidato" ADD CONSTRAINT "vaga_candidato_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vaga_candidato" ADD CONSTRAINT "vaga_candidato_id_vaga_fkey" FOREIGN KEY ("id_vaga") REFERENCES "vaga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mensagem" ADD CONSTRAINT "mensagem_id_vaga_candidato_fkey" FOREIGN KEY ("id_vaga_candidato") REFERENCES "vaga_candidato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
