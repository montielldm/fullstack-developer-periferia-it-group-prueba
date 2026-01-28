import { z } from 'zod'

export const signInSchema = z.object({
    email: z.email("El correo electrónico no es válido."),
    password: z.string("La contraseña es obligatoria.").min(3, "La contraseña debe tener al menos 3 caracteres."),
})