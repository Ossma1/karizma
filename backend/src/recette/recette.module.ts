import { Module } from '@nestjs/common';
import { RecettesService } from './recette.service';
import { RecettesController } from './recette.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasicAuthGuard } from 'src/auth/basic-auth/basic-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [RecettesController],
  providers: [PrismaService, AuthService, BasicAuthGuard, RecettesService],
})
export class RecetteModule {}
