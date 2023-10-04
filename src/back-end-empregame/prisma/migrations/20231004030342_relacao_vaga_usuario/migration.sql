/*
  Warnings:

  - Added the required column `id_usuario` to the `vaga` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vaga" ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vaga" ADD CONSTRAINT "vaga_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
