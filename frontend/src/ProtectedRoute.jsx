import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // If there is no token, redirect to the /login page
    return <Navigate to="/" replace />;
  }

  // If there is a token, show the component (the ChatPage)
  return children;
}

export default ProtectedRoute;
