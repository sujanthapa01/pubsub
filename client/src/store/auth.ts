import { create } from "zustand"

export type User = {
    id: String
    email: String
    display_name: String
    picture: String
}


type AuthState = {
    user: User | null,
    loading: boolean

    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void


    setlogout: () => void
}


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setlogout: () => set({
        user: null,
        loading: false
    })

}))