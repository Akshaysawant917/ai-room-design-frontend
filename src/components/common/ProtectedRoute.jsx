import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm text-[#6e7169]">
        Loading your account...
      </div>
    );
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}

export default ProtectedRoute;
