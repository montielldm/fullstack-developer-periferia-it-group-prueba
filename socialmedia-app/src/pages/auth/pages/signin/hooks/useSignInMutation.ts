import { useMutation } from "@tanstack/react-query";
import { signInService } from "../services/signin.services";
import { useAuthStore } from "@/context/auth.context";
import { useNavigate } from "react-router";
import useGetMeInfo from "./useGetMeInfo";
import { toast } from "sonner"

export default function useSignInMutation() {
    const { signIn } = useAuthStore((state) => state);
    const navigate = useNavigate();
    const { mutate } = useGetMeInfo();


    const mutation = useMutation({
        mutationFn: signInService,
        onSuccess: (data) => {
            signIn(data.access_token);
            toast.success("Inicio de sesión exitoso!!");
            mutate();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Error al iniciar sesión");
        },
        onSettled: () => {
            navigate("/app", { replace: true  });
        }
    })

    return mutation;
}
