
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Types for our roles system
export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Permissions {
  products: Permission;
  orders: Permission;
  customers: Permission;
  analytics: Permission;
  settings: Permission;
  [key: string]: Permission;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permissions;
}

// Mock data for roles
const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all dashboard modules and features",
    permissions: {
      products: { view: true, create: true, edit: true, delete: true },
      orders: { view: true, create: true, edit: true, delete: true },
      customers: { view: true, create: true, edit: true, delete: true },
      analytics: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: true, edit: true, delete: true },
    }
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage products, orders, and view analytics",
    permissions: {
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: true, create: false, edit: true, delete: false },
      customers: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    }
  },
  {
    id: "3",
    name: "Content Editor",
    description: "Can manage product listings only",
    permissions: {
      products: { view: true, create: true, edit: true, delete: false },
      orders: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      analytics: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    }
  },
  {
    id: "4",
    name: "Support",
    description: "Can view orders and customers to provide support",
    permissions: {
      products: { view: true, create: false, edit: false, delete: false },
      orders: { view: true, create: false, edit: false, delete: false },
      customers: { view: true, create: false, edit: false, delete: false },
      analytics: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    }
  },
];

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate loading from localStorage or use initial data
        const storedRoles = localStorage.getItem("admin_roles");
        if (storedRoles) {
          setRoles(JSON.parse(storedRoles));
        } else {
          // Use initial data if nothing in localStorage
          setRoles(initialRoles);
          localStorage.setItem("admin_roles", JSON.stringify(initialRoles));
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, []);

  // Create a new role
  const createRole = async (roleData: Omit<Role, "id">) => {
    try {
      // Generate a new ID (in a real app, the backend would do this)
      const newRole: Role = {
        ...roleData,
        id: Date.now().toString()
      };

      const updatedRoles = [...roles, newRole];
      setRoles(updatedRoles);
      localStorage.setItem("admin_roles", JSON.stringify(updatedRoles));
      return newRole;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create role");
      setError(error);
      throw error;
    }
  };

  // Update an existing role
  const updateRole = async (id: string, roleData: Partial<Role>) => {
    try {
      const roleIndex = roles.findIndex(role => role.id === id);
      if (roleIndex === -1) {
        throw new Error("Role not found");
      }

      const updatedRoles = [...roles];
      updatedRoles[roleIndex] = { ...updatedRoles[roleIndex], ...roleData };
      setRoles(updatedRoles);
      localStorage.setItem("admin_roles", JSON.stringify(updatedRoles));
      return updatedRoles[roleIndex];
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to update role");
      setError(error);
      throw error;
    }
  };

  // Delete a role
  const deleteRole = async (id: string) => {
    try {
      // Check if it's the Super Admin role, which shouldn't be deleted
      if (id === "1") {
        throw new Error("Cannot delete Super Admin role");
      }

      const updatedRoles = roles.filter(role => role.id !== id);
      setRoles(updatedRoles);
      localStorage.setItem("admin_roles", JSON.stringify(updatedRoles));
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to delete role");
      setError(error);
      throw error;
    }
  };

  // Get a role by ID
  const getRoleById = (id: string) => {
    return roles.find(role => role.id === id);
  };

  return { 
    roles, 
    isLoading, 
    error, 
    createRole, 
    updateRole, 
    deleteRole,
    getRoleById 
  };
};
