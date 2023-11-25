import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UtilisateursService } from './utilisateur.service';
import { Utilisateur, Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(
    private readonly utilisateursService: UtilisateursService,
    private authService: AuthService,
  ) {}

  @Post()
  async createUtilisateur(
    @Body() createUtilisateurData: Prisma.UtilisateurCreateInput,
  ): Promise<Utilisateur> {
    return this.utilisateursService.createUser(createUtilisateurData);
  }

  @Get()
  async findAllUtilisateurs(): Promise<Utilisateur[]> {
    return this.utilisateursService.utilisateurs({});
  }

  @Get(':id')
  async findUtilisateurById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Utilisateur | null> {
    return this.utilisateursService.utilisateur({ id });
  }

  @Put(':id')
  async updateUtilisateur(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUtilisateurData: Prisma.UtilisateurUpdateInput,
  ): Promise<Utilisateur> {
    return this.utilisateursService.updateUser({
      where: { id },
      data: updateUtilisateurData,
    });
  }

  @Delete(':id')
  async removeUtilisateur(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Utilisateur> {
    return this.utilisateursService.deleteUser({ id });
  }
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
