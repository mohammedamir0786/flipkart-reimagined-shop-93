
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
  userRole: string | null;
  login: (email: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => void;
  setUserRole: (roleId: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userEmail: null,
  userName: null,
  userRole: null,
  login: () => {},
  logout: () => {},
  signup: () => {},
  setUserRole: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserName = localStorage.getItem("userName");
    const storedUserRole = localStorage.getItem("userRoleId");
    
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserEmail(storedUserEmail);
      setUserName(storedUserName);
      setUserRole(storedUserRole);
    }
  }, []);

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    
    // Set default role to Super Admin (1) for simplicity
    // In a real app, this would be fetched from the backend
    const defaultRoleId = "1";
    setUserRole(defaultRoleId);
    
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRoleId", defaultRoleId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
    setUserRole(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRoleId");
  };

  const signup = (email: string, name: string) => {
    // In a real application, this would involve API calls to create a user
    // For now, we'll just store the information
    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredName", name);
    setUserName(name);
  };

  const updateUserRole = (roleId: string) => {
    setUserRole(roleId);
    localStorage.setItem("userRoleId", roleId);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userEmail, 
      userName, 
      userRole,
      login, 
      logout, 
      signup,
      setUserRole: updateUserRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
