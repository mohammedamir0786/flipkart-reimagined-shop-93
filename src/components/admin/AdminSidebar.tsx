
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  badge?: string;
}

const NavItem = ({ to, icon, label, isCollapsed, badge }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  const content = (
    <Link
      to={to}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3 rounded-md mb-1 transition-all duration-200",
        isActive 
          ? "bg-flipkart-blue text-white hover:bg-flipkart-blue/90" 
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
      {!isCollapsed && badge && (
        <Badge variant="secondary" className="h-5 text-xs font-semibold">
          {badge}
        </Badge>
      )}
    </Link>
  );
  
  return isCollapsed ? (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 text-white border-none">
          {label}
          {badge && <Badge variant="outline" className="ml-2 bg-white/20 text-white border-none">{badge}</Badge>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : content;
};

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className={cn(
      "bg-white border-r h-screen sticky top-0 transition-all duration-300 shadow-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn(
        "h-16 border-b flex items-center transition-all px-4",
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
          className="text-gray-500 hover:text-flipkart-blue hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      {/* Navigation */}
      <div className="p-2 mt-4 flex flex-col h-[calc(100%-4rem)]">
        <nav className="space-y-1">
          <NavItem 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isCollapsed={isCollapsed}
            badge="New"
          />
          <NavItem 
            to="/admin/products" 
            icon={<ShoppingBag size={20} />} 
            label="Products" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/admin/admins" 
            icon={<ShieldCheck size={20} />} 
            label="Manage Admins" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/admin/customers" 
            icon={<UserCheck size={20} />} 
            label="Customers" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/admin/analytics" 
            icon={<BarChart4 size={20} />} 
            label="Analytics" 
            isCollapsed={isCollapsed}
          />
          <NavItem 
            to="/admin/analytics/payments" 
            icon={<CreditCard size={20} />} 
            label="Payment Analytics" 
            isCollapsed={isCollapsed}
          />
        </nav>
        
        <div className="mt-auto">
          <NavItem 
            to="/admin/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
      
      {/* Admin Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="text-xs text-gray-500 flex items-center justify-between">
            <span>Admin Dashboard v1.0</span>
            <Badge variant="outline" className="text-[10px] h-5">BETA</Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
