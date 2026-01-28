import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema } from "../posts/schemas/post.schema";
import type z from "zod";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import useCreatePostMutation from "../posts/hooks/useCreatePost";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";

export default function AddPost() {
    const { mutate, isPending } = useCreatePostMutation();
    const [open, setOpen] = useState<boolean>(false);
    const formId = "post-form";

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            content: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof postSchema>) {
        mutate(values)
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form id={formId} className={"space-y-2"} onSubmit={form.handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    <Button disabled={isPending} className="w-full">
                        {
                            isPending ? (
                                <>
                                    <Spinner />
                                    "Creando..."
                                </>
                            ) : (<>
                                <Plus />
                                Agregar Post
                            </>)
                        }
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Agregar Post</DialogTitle>
                        <DialogDescription>
                            Agregar un nuevo post a la plataforma.
                        </DialogDescription>
                    </DialogHeader>
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-title"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Título del post"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="content"
                        render={({ field, fieldState }) => {
                            const fieldId = `${formId}-description`;
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={fieldId}>Mensaje</FieldLabel>
                                    <Textarea
                                        {...field}
                                        id={fieldId}
                                        aria-invalid={fieldState.invalid}
                                        rows={4}
                                        className='resize-none'
                                        placeholder="Mensaje del post"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )
                        }}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" form={formId} disabled={isPending}>
                            {
                                isPending ? "Creando..." : "Agregar Post"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
