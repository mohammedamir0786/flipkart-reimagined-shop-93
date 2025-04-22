
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminList } from "@/components/admin/AdminList";
import { AddAdminModal } from "@/components/admin/AddAdminModal";
import { useToast } from "@/hooks/use-toast";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "Super Admin" | "Product Manager" | "Order Manager";
  status: "active" | "inactive";
};

// Mock data - replace with API call later
const mockAdmins: AdminUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Super Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Product Manager",
    status: "active",
  },
];

export default function ManageAdmins() {
  const [admins] = useState<AdminUser[]>(mockAdmins);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAdmin = (newAdmin: Omit<AdminUser, "id" | "status">) => {
    toast({
      title: "Success",
      description: "Admin user added successfully",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Admins</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2" size={16} />
          Add New Admin
        </Button>
      </div>

      <AdminList admins={admins} />
      
      <AddAdminModal 
        open={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAdmin}
      />
    </div>
  );
}
