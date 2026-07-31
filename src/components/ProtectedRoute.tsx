import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContent";
import { Spinner } from "./spinner/Spinner";

export function ProtectedRoute() {
  const { user, initialLoading } = useAuth();

  if (initialLoading) return <Spinner />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
