import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RecetteModule } from './recette/recette.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [RecetteModule, UtilisateurModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
