import { api } from "@/helpers/axios.helpers";
import type { SignInModel } from "../models/signin.models";
import type { AuthResponse, User } from "@/types/auth.types";


export const signInService = async (formData: SignInModel): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/signin", formData);
    return data;
}

export const getMeInfoService = async (): Promise<User> => {
    const { data } = await api.get<User>("/users/get-profile");
    return data;
}