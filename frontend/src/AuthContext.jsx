import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); // Optional: store user details
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // You could also add a /me request here to fetch user details
      // and set the 'user' state.
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken, userDetails) => {
    setToken(newToken);
    setUser(userDetails); // userDetails is { id, name, email } from your backend
    navigate("/chat"); // Redirect to chat page after login
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
