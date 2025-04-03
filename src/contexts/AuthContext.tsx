
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
  login: (email: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserEmail(storedUserEmail);
      setUserName(storedUserName);
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
    setUserName(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  };

  const signup = (email: string, name: string) => {
    // In a real application, this would involve API calls to create a user
    // For now, we'll just store the information
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredName", name);
    setUserName(name);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userName, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
