import { Module } from '@nestjs/common';
import { UtilisateursService } from './utilisateur.service';
import { UtilisateursController } from './utilisateur.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UtilisateursController],
  providers: [PrismaService, AuthService, UtilisateursService],
})
export class UtilisateurModule {}
