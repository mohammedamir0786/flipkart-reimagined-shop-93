
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart4, 
  Settings,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Shield,
  UserCog
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/usePermissions";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isVisible?: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed, isVisible = true }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  if (!isVisible) return null;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-md mb-1 transition-colors",
        isActive 
          ? "bg-flipkart-blue text-white hover:bg-flipkart-blue/90" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { canView } = usePermissions();
  
  return (
    <div className={cn(
      "bg-white border-r h-screen sticky top-0 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn(
        "h-16 border-b flex items-center px-4 transition-all",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="font-bold text-flipkart-blue text-xl italic">
            Flipkart
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsCollapsed(prev => !prev)}
          className="text-gray-500"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      {/* Navigation */}
      <nav className="p-2 mt-4">
        <NavItem 
          to="/admin" 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          isCollapsed={isCollapsed}
          isVisible={canView('dashboard')}
        />
        <NavItem 
          to="/admin/products" 
          icon={<ShoppingBag size={20} />} 
          label="Products" 
          isCollapsed={isCollapsed}
          isVisible={canView('products')}
        />
        <NavItem 
          to="/admin/customers" 
          icon={<Users size={20} />} 
          label="Customers" 
          isCollapsed={isCollapsed}
          isVisible={canView('customers')}
        />
        <NavItem 
          to="/admin/analytics" 
          icon={<BarChart4 size={20} />} 
          label="Analytics" 
          isCollapsed={isCollapsed}
          isVisible={canView('analytics')}
        />
        <NavItem 
          to="/admin/analytics/payments" 
          icon={<CreditCard size={20} />} 
          label="Payment Analytics" 
          isCollapsed={isCollapsed}
          isVisible={canView('analytics')}
        />
        
        {/* Settings section with role management */}
        <div className="mt-6 pt-4 border-t">
          <NavItem 
            to="/admin/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            isCollapsed={isCollapsed}
            isVisible={canView('settings')}
          />
          <NavItem 
            to="/admin/settings/roles" 
            icon={<Shield size={20} />} 
            label="Role Management" 
            isCollapsed={isCollapsed}
            isVisible={canView('settings')}
          />
          <NavItem 
            to="/admin/settings/users" 
            icon={<UserCog size={20} />} 
            label="User Management" 
            isCollapsed={isCollapsed}
            isVisible={canView('settings')}
          />
        </div>
      </nav>
      
      {/* Admin Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-xs text-gray-500">
            Admin Dashboard v1.0
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
