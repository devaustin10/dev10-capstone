import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    navigate("/login"); //redirect user to login page
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
