
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usePermissions } from "@/hooks/usePermissions";

interface ProtectedRouteProps {
  children: ReactNode;
  module: string;
  action: "view" | "create" | "edit" | "delete";
}

const ProtectedRoute = ({ children, module, action }: ProtectedRouteProps) => {
  const { hasPermission } = usePermissions();
  
  if (!hasPermission(module, action)) {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
