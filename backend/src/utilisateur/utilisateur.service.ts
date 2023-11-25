import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Utilisateur, Prisma } from '@prisma/client';

@Injectable()
export class UtilisateursService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UtilisateurCreateInput): Promise<Utilisateur> {
    return this.prisma.utilisateur.create({
      data,
    });
  }

  async utilisateur(
    utilisateurWhereUniqueInput: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur | null> {
    return this.prisma.utilisateur.findUnique({
      where: utilisateurWhereUniqueInput,
    });
  }

  async utilisateurs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UtilisateurWhereUniqueInput;
    where?: Prisma.UtilisateurWhereInput;
    orderBy?: Prisma.UtilisateurOrderByWithRelationInput;
  }): Promise<Utilisateur[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.utilisateur.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateUser(params: {
    where: Prisma.UtilisateurWhereUniqueInput;
    data: Prisma.UtilisateurUpdateInput;
  }): Promise<Utilisateur> {
    const { where, data } = params;
    return this.prisma.utilisateur.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.UtilisateurWhereUniqueInput,
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.delete({
      where,
    });
  }
}
