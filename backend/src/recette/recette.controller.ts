import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecettesService } from './recette.service';
import { Recette, Prisma } from '@prisma/client';
import { BasicAuthGuard } from 'src/auth/basic-auth/basic-auth.guard';

@Controller('recettes')
export class RecettesController {
  constructor(private readonly recettesService: RecettesService) {}

  @Post()
  async createRecette(
    @Body() createRecetteData: Prisma.RecetteCreateInput,
  ): Promise<Recette> {
    try {
      return await this.recettesService.createRecette(createRecetteData);
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  @Get()
  async findAllRecettes(): Promise<Recette[]> {
    return await this.recettesService.recettes({});
  }

  @Get(':id')
  async findRecetteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Recette> {
    const recette = await this.recettesService.recette({ id });
    if (!recette) {
      throw new NotFoundException(`Recette avec l'ID ${id} non trouvée`);
    }
    return recette;
  }

  @Put(':id')
  async updateRecette(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecetteData: Prisma.RecetteUpdateInput,
  ): Promise<Recette> {
    try {
      return await this.recettesService.updateRecette({
        where: { id },
        data: updateRecetteData,
      });
    } catch (error) {
      throw new NotFoundException(
        `Erreur lors de la mise à jour de la recette avec l'ID ${id}`,
      );
    }
  }

  @Delete(':id')
  async removeRecette(@Param('id', ParseIntPipe) id: number): Promise<Recette> {
    try {
      return await this.recettesService.deleteRecette({ id });
    } catch (error) {
      throw new NotFoundException(
        `Erreur lors de la suppression de la recette avec l'ID ${id}`,
      );
    }
  }
  @Get('search')
  searchRecettes(
    @Query('nom') nom?: string,
    @Query('ingredients') ingredients?: string,
    @Query('dureeMax') dureeMax?: number,
  ) {
    return this.recettesService.searchRecettes({ nom, ingredients, dureeMax });
  }
  @UseGuards(BasicAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return await this.recettesService.findAll(req.user.id);
  }
}
