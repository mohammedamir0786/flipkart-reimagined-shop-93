
import { useAuth } from "@/contexts/AuthContext";
import { useRoles, Permission } from "@/hooks/useRoles";

// Get user's current role ID from localStorage
const getCurrentUserRoleId = (): string => {
  try {
    // In a real app, this would be stored in the auth token or fetched from API
    // For this demo, we'll assume the logged-in user has a role ID stored
    return localStorage.getItem("userRoleId") || "1"; // Default to Super Admin
  } catch (error) {
    console.error("Error getting user role:", error);
    return "1"; // Default to Super Admin if there's an error
  }
};

export const usePermissions = () => {
  const { isLoggedIn } = useAuth();
  const { roles } = useRoles();
  
  // Get the current user's role ID
  const currentRoleId = getCurrentUserRoleId();
  
  // Find the user's role
  const userRole = roles.find(role => role.id === currentRoleId);

  // Check if user has permission for a specific module and action
  const hasPermission = (module: string, action: keyof Permission): boolean => {
    if (!isLoggedIn) return false;
    if (!userRole) return false;
    
    // Super Admin has all permissions
    if (userRole.name === "Super Admin") return true;
    
    // Check if the module exists in the role's permissions
    if (!userRole.permissions[module]) return false;
    
    return userRole.permissions[module][action] === true;
  };

  // Convenience methods for common permission checks
  const canView = (module: string): boolean => hasPermission(module, "view");
  const canCreate = (module: string): boolean => hasPermission(module, "create");
  const canEdit = (module: string): boolean => hasPermission(module, "edit");
  const canDelete = (module: string): boolean => hasPermission(module, "delete");

  // For components that need to know the user's role
  const currentRole = userRole?.name || null;

  return {
    hasPermission,
    canView,
    canCreate,
    canEdit,
    canDelete,
    currentRole,
    currentRoleId
  };
};
