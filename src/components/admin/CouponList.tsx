
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";
import { Coupon } from "@/pages/admin/CouponManagement";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type Props = {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onToggleStatus: (id: number) => void;
  isLoading: boolean;
};

export default function CouponList({ coupons, onEdit, onToggleStatus, isLoading }: Props) {
  if (!coupons.length && !isLoading) {
    return (
      <div className="text-gray-500 flex justify-center py-16">No coupons found.</div>
    );
  }
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coupon Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Min Order</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.code}</TableCell>
              <TableCell>
                <Badge variant={c.discountType === "flat" ? "secondary" : "outline"}>
                  {c.discountType === "flat" ? "Flat" : "Percentage"}
                </Badge>
              </TableCell>
              <TableCell>
                {c.discountType === "flat" ? (
                  <>₹{c.discountValue}</>
                ) : (
                  <>{c.discountValue}%</>
                )}
              </TableCell>
              <TableCell>₹{c.minOrder}</TableCell>
              <TableCell>
                <span className="text-sm">{c.expiry}</span>
              </TableCell>
              <TableCell>
                <Badge variant={c.status === "active" ? "success" : "outline"}>
                  {c.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(c)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant={c.status === "active" ? "destructive" : "secondary"}
                    size="sm"
                    onClick={() => onToggleStatus(c.id)}
                  >
                    {c.status === "active" ? <X size={14} /> : <Check size={14} />}
                    <span className="ml-1">{c.status === "active" ? "Deactivate" : "Activate"}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
