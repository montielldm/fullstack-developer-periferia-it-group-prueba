import { IsNotEmpty, IsString, MaxLength, IsEmpty } from 'class-validator';

export class RegisterPostDto {
    @IsNotEmpty({ message: 'El titulo es obligatorio' })
    @IsString({ message: 'El titulo debe ser una cadena de texto' })
    title: string;

    @IsNotEmpty({ message: 'El contenido es obligatorio' })
    @IsString({ message: 'El contenido debe ser una cadena de texto' })
    @MaxLength(600, { message: 'El contenido no debe exceder los 600 caracteres' })    
    content: string;

    @IsEmpty({ message: 'El ID del autor no debe ser proporcionado' })
    authorId: number;
}