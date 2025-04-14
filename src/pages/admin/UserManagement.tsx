
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRoles } from "@/hooks/useRoles";
import RoleBadge from "@/components/admin/RoleBadge";

// Mock user data
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@flipkart.com", role: "1" },
  { id: "2", name: "John Doe", email: "john@flipkart.com", role: "2" },
  { id: "3", name: "Jane Smith", email: "jane@flipkart.com", role: "3" },
  { id: "4", name: "Mike Johnson", email: "mike@flipkart.com", role: "4" },
  { id: "5", name: "Sarah Wilson", email: "sarah@flipkart.com", role: "2" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const { roles } = useRoles();

  // Handle role change for a user
  const handleRoleChange = (userId: string, roleId: string) => {
    // Update the user's role
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: roleId } : user
    );
    
    setUsers(updatedUsers);
    
    // Store in localStorage (in a real app, this would be an API call)
    localStorage.setItem("admin_users", JSON.stringify(updatedUsers));
    
    // Find the role name for the toast message
    const roleName = roles.find(role => role.id === roleId)?.name || "Unknown role";
    
    toast({
      title: "Role Updated",
      description: `User role has been updated to ${roleName}`,
    });
  };

  // Get role name by ID
  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || "Unknown";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage admin users and their role assignments
        </p>
      </div>

      {/* Users Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <RoleBadge role={getRoleName(user.role)} />
                    <span>{getRoleName(user.role)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Select 
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
