import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContent";

export function ProtectedRout() {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to='/ogin' replace />
    }
    return <Outlet/>
}