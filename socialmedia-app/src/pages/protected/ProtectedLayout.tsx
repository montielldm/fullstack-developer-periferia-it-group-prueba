import { useAuthStore } from "@/context/auth.context";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import Container from "./components/Container";
import UserAccount from "./components/UserAccount";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuthStore((state) => state)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth/signin", { replace: true });
        }
    }, [isAuthenticated, navigate])

    return isAuthenticated ? (
        <div className="p-3 mt-10">
            <Container>
                <div>
                    <UserAccount />
                </div>
                <Outlet />
            </Container>
        </div>
    ) : <Navigate to={"/auth/signin"} />
}
