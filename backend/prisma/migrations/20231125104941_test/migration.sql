/*
  Warnings:

  - You are about to drop the `Enseignant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Etudiant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Enseignant";

-- DropTable
DROP TABLE "Etudiant";

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recette" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "etapes" TEXT NOT NULL,
    "duree" INTEGER NOT NULL,
    "photo" TEXT,
    "utilisateurId" INTEGER NOT NULL,

    CONSTRAINT "Recette_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Recette" ADD CONSTRAINT "Recette_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
