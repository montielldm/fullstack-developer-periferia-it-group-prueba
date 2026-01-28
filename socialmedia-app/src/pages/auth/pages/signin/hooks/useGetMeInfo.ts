import { useMutation } from "@tanstack/react-query";
import { getMeInfoService } from "../services/signin.services";
import { useAuthStore } from "@/context/auth.context";

export default function useGetMeInfo() {
    const { setUser } = useAuthStore((state) => state);
    
    const queryMeInfo = useMutation({
        mutationFn: getMeInfoService,
        onSuccess: (data) => {
            setUser(data);
        }
    });

    return queryMeInfo;
}