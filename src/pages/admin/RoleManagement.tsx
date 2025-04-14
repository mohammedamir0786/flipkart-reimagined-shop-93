
import { useState } from "react";
import { PlusCircle, Pencil, Trash2, AlertCircle } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RoleBadge from "@/components/admin/RoleBadge";
import { useRoles } from "@/hooks/useRoles";

// UI Components for the Role Management Page
const RoleManagement = () => {
  // State for dialogs
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    permissions: {
      products: { view: false, create: false, edit: false, delete: false },
      orders: { view: false, create: false, edit: false, delete: false },
      customers: { view: false, create: false, edit: false, delete: false },
      analytics: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
    }
  });
  
  // Role to be deleted
  const [roleToDelete, setRoleToDelete] = useState<null | { id: string, name: string }>(null);

  // Get roles from our custom hook
  const { roles, isLoading, error, createRole, updateRole, deleteRole } = useRoles();

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle permission checkbox changes
  const handlePermissionChange = (module: string, permission: string, checked: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module as keyof typeof formData.permissions],
          [permission]: checked
        }
      }
    });
  };

  // Open add dialog
  const handleAddRole = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      permissions: {
        products: { view: false, create: false, edit: false, delete: false },
        orders: { view: false, create: false, edit: false, delete: false },
        customers: { view: false, create: false, edit: false, delete: false },
        analytics: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
      }
    });
    setIsEditMode(false);
    setIsAddEditDialogOpen(true);
  };

  // Open edit dialog
  const handleEditRole = (role: any) => {
    setFormData({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setIsEditMode(true);
    setIsAddEditDialogOpen(true);
  };

  // Open delete dialog
  const handleDeleteClick = (role: any) => {
    setRoleToDelete({ id: role.id, name: role.name });
    setIsDeleteDialogOpen(true);
  };

  // Submit form for add/edit
  const handleFormSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditMode) {
        await updateRole(formData.id, formData);
        toast({
          title: "Success",
          description: "Role updated successfully",
        });
      } else {
        await createRole(formData);
        toast({
          title: "Success",
          description: "New role created successfully",
        });
      }
      setIsAddEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save role",
        variant: "destructive",
      });
    }
  };

  // Confirm role deletion
  const handleDeleteConfirm = async () => {
    if (!roleToDelete) return;
    
    try {
      await deleteRole(roleToDelete.id);
      toast({
        title: "Success",
        description: `Role "${roleToDelete.name}" deleted successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
    }
  };

  // Display loading state
  if (isLoading) {
    return <div className="p-8 text-center">Loading roles...</div>;
  }

  // Display error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-destructive mb-2" />
        <h3 className="text-lg font-semibold">Error loading roles</h3>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">
            Create and manage admin roles and their permissions
          </p>
        </div>
        <Button onClick={handleAddRole} className="gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Role</span>
        </Button>
      </div>

      {/* Roles Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles && roles.length > 0 ? (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RoleBadge role={role.name} />
                      {role.name}
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(role.permissions).map(([module, perms]) => (
                        Object.entries(perms).some(([_, hasPermission]) => hasPermission) && (
                          <Badge key={module} variant="outline" className="capitalize">
                            {module}
                          </Badge>
                        )
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost"
                        size="icon" 
                        onClick={() => handleEditRole(role)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(role)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No roles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Modify role details and permissions' 
                : 'Create a new role with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Role Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Manager, Support Agent"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the role's responsibilities"
                rows={3}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-2">Module Permissions</h3>
              
              {Object.entries(formData.permissions).map(([module, permissions]) => (
                <div key={module} className="space-y-2">
                  <h4 className="text-sm font-medium capitalize">{module}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(permissions).map(([permission, value]) => (
                      <div key={`${module}-${permission}`} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${module}-${permission}`}
                          checked={value}
                          onCheckedChange={(checked) => {
                            handlePermissionChange(module, permission, checked === true);
                          }}
                        />
                        <label 
                          htmlFor={`${module}-${permission}`} 
                          className="text-sm font-medium capitalize"
                        >
                          {permission}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFormSubmit}>
              {isEditMode ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{roleToDelete?.name}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RoleManagement;
