import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Recette, Prisma } from '@prisma/client';

@Injectable()
export class RecettesService {
  constructor(private prisma: PrismaService) {}

  async createRecette(data: Prisma.RecetteCreateInput): Promise<Recette> {
    try {
      return await this.prisma.recette.create({ data });
    } catch (error) {
      throw new BadRequestException('Erreur lors de la création de la recette');
    }
  }

  async recette(
    recetteWhereUniqueInput: Prisma.RecetteWhereUniqueInput,
  ): Promise<Recette | null> {
    const recette = await this.prisma.recette.findUnique({
      where: recetteWhereUniqueInput,
    });
    if (!recette) {
      throw new NotFoundException(`Recette non trouvée`);
    }
    return recette;
  }

  async recettes(params: Prisma.RecetteFindManyArgs): Promise<Recette[]> {
    try {
      return await this.prisma.recette.findMany(params);
    } catch (error) {
      throw new BadRequestException(
        'Erreur lors de la récupération des recettes',
      );
    }
  }

  async updateRecette(params: {
    where: Prisma.RecetteWhereUniqueInput;
    data: Prisma.RecetteUpdateInput;
  }): Promise<Recette> {
    try {
      return await this.prisma.recette.update(params);
    } catch (error) {
      throw new NotFoundException(
        `Erreur lors de la mise à jour de la recette`,
      );
    }
  }

  async deleteRecette(where: Prisma.RecetteWhereUniqueInput): Promise<Recette> {
    try {
      return await this.prisma.recette.delete({ where });
    } catch (error) {
      throw new NotFoundException(
        `Erreur lors de la suppression de la recette`,
      );
    }
  }
  async searchRecettes(queryParams: {
    nom?: string;
    ingredients?: string;
    dureeMax?: number;
  }): Promise<Recette[]> {
    const { nom, ingredients, dureeMax } = queryParams;

    return this.prisma.recette.findMany({
      where: {
        AND: [
          nom ? { nom: { contains: nom, mode: 'insensitive' } } : {},
          ingredients
            ? { ingredients: { contains: ingredients, mode: 'insensitive' } }
            : {},
          dureeMax ? { duree: { lte: dureeMax } } : {},
        ],
      },
    });
  }
  async findAll(userId: number): Promise<Recette[]> {
    return this.prisma.recette.findMany({
      where: {
        utilisateurId: userId,
      },
    });
  }
}
