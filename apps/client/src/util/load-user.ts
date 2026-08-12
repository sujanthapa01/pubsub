import { useAuthStore } from "@/store/auth"


export async function loadUser() {
    const { setLoading, setUser } = useAuthStore.getState();
    try {

        const response = await fetch("http://localhost:3000/auth/me", {
            credentials: "include"
        })

        if (!response.ok) {
            setUser(null);
            return
        }


        const user = await response.json()
        console.log(user)
        setUser(user)
        return

    } catch (error: any) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }

} 