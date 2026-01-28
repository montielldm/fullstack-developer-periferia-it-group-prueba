import { useAuthStore } from "@/context/auth.context"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export default function AuthLayout() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/app", { replace: true } )
        }
    }, [isAuthenticated, navigate])
    
    return (
    <div>
        <Outlet />
    </div>
  )
}
