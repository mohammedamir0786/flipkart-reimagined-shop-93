
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: string;
  size?: "sm" | "md";
}

const RoleColors: Record<string, string> = {
  "Super Admin": "bg-purple-100 text-purple-800 border-purple-200",
  "Manager": "bg-blue-100 text-blue-800 border-blue-200",
  "Content Editor": "bg-green-100 text-green-800 border-green-200",
  "Support": "bg-amber-100 text-amber-800 border-amber-200",
  // Add more role colors as needed
};

const defaultColor = "bg-gray-100 text-gray-800 border-gray-200";

const RoleBadge = ({ role, size = "md" }: RoleBadgeProps) => {
  const colorClasses = RoleColors[role] || defaultColor;
  
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center rounded-full border",
        colorClasses,
        size === "sm" ? "h-2 w-2" : "h-3 w-3"
      )}
    />
  );
};

export default RoleBadge;
