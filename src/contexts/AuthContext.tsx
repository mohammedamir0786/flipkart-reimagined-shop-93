
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserEmail = localStorage.getItem("userEmail");
    
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserEmail(storedUserEmail);
    }
  }, []);

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
