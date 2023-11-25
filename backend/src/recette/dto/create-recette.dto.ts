import {
  IsNotEmpty,
  IsString,
  IsInt,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateRecetteDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  nom: string;

  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @IsNotEmpty()
  @IsString()
  etapes: string;

  @IsNotEmpty()
  @IsInt()
  duree: number;

  @IsOptional()
  @IsString()
  photo?: string;
}
