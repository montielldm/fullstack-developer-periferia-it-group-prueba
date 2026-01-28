import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { ScanEye, Send } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import useSignInMutation from "../hooks/useSignInMutation"
import { signInSchema } from "../schemas/signin.schemas"

export default function SignInForm() {
    const [isVisible, setVisible] = useState<boolean>(false)
    const { mutate, isPending } = useSignInMutation()
    const formId = "signin-form";

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof signInSchema>) {
        mutate(values)
    }

    return (
        <form id={formId} className={"space-y-2"} onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => {
                    const fieldId = `${formId}-email`;
                    return (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={fieldId} className="text-sm font-normal">Correo</FieldLabel>
                            <Input
                                {...field}
                                id={fieldId}
                                aria-invalid={fieldState.invalid}
                                placeholder="example@example.com"
                                type="text"
                                autoComplete="email"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )
                }}
            />

            <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => {
                    const fieldId = `${formId}-password`;
                    return (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={fieldId} className="text-sm font-normal">Contraseña</FieldLabel>
                            <InputGroup>
                                <InputGroupInput
                                    {...field}
                                    id={fieldId}
                                    type={isVisible ? "text" : "password"}
                                    placeholder="********"
                                    aria-invalid={fieldState.invalid}
                                />
                                <InputGroupAddon align="inline-end">
                                    <Button
                                        aria-label="visible password"
                                        type="button"
                                        onClick={() => {
                                            setVisible(!isVisible)
                                        }}
                                        size="icon-xs"
                                        variant="ghost"
                                    >
                                        <ScanEye size={16} />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )
                }}
            />
            <div className="space-y-1">
                <Button type="submit" className="w-full">
                    {
                        isPending ? (
                            <>
                                <Spinner />
                                Iniciando sesión...
                            </>
                        ) : (
                            <>
                                <Send />
                                Iniciar Sesión
                            </>

                        )
                    }
                </Button>
            </div>
        </form >
    )
}
