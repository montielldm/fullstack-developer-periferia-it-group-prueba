import { secureStorage } from "@/helpers/storage.helpers";
import type { User } from "@/types/auth.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

interface AuthActions {
    signIn: (access_token: string) => void;
    signOut: () => void;
    setUser: (user: User) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
    persist((set) => ({
        isAuthenticated: false,
        user: null,
        signIn: (access_token: string) => {
            secureStorage.set("access_token", access_token);
               
            set(() => ({
                isAuthenticated: true,
            }))
        },
        setUser: (user: User) => {
            set(() => ({
                user,
                }))
        },
        signOut: () => {
            secureStorage.remove("access_token");
            set(() => ({
                user: null,
                isAuthenticated: false,
            }))
        },
    }), {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
    })
)