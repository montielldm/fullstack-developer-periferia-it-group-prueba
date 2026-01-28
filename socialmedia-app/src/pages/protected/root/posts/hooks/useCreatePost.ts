import { useMutation } from "@tanstack/react-query";
import { createPostService } from "../services/posts.services";
import { toast } from "sonner";
import { queryClient } from "@/App";

export default function useCreatePostMutation() {
    const mutation = useMutation({
        mutationFn: createPostService,
        onSuccess: () => {
            toast.success("Post creado satisfactoriamente!");
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: () => {
            toast.error("Error al crear el post. Inténtalo de nuevo.");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    });
    return mutation;
}