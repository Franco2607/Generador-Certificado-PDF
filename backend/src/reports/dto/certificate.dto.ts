import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @IsNotEmpty()
  conductorNombre: string;

  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  empresa: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;
}