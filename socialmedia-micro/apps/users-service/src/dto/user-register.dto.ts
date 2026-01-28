import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    firstName: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    lastName: string;

    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'El correo electrónico debe ser una dirección válida' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}