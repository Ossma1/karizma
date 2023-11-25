import { IsString, IsInt, IsOptional, MinLength } from 'class-validator';

export class UpdateRecetteDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  nom?: string;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsString()
  etapes?: string;

  @IsOptional()
  @IsInt()
  duree?: number;

  @IsOptional()
  @IsString()
  photo?: string;
}
