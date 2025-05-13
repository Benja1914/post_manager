import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
} from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El nombre no debe exceder los 255 caracteres.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  description: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de creación debe ser una fecha válida.' },
  )
  created_at?: string;

  @ApiProperty({ required: false, type: String, format: 'date-time' })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha de actualización debe ser una fecha válida.' },
  )
  updated_at?: string;
}
