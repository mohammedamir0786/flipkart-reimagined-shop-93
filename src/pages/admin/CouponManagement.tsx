
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import CouponList from "@/components/admin/CouponList";
import CouponForm from "@/components/admin/CouponForm";
import EditCouponModal from "@/components/admin/EditCouponModal";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Filter, Search } from "lucide-react";

// Coupon type
export type Coupon = {
  id: number;
  code: string;
  discountType: "flat" | "percentage";
  discountValue: number;
  minOrder: number;
  expiry: string;
  status: "active" | "inactive";
};

const initialCoupons: Coupon[] = [
  {
    id: 1,
    code: "SUMMER25",
    discountType: "percentage",
    discountValue: 25,
    minOrder: 100,
    expiry: "2025-08-31",
    status: "active",
  },
  {
    id: 2,
    code: "WELCOME10",
    discountType: "flat",
    discountValue: 10,
    minOrder: 50,
    expiry: "2025-06-30",
    status: "inactive",
  },
];

export default function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);

  // Simulate loading with mock api delay
  const withLoading = async (fn: () => Promise<void>) => {
    setIsLoading(true);
    await fn();
    setIsLoading(false);
  };

  // Add new coupon
  const handleAddCoupon = async (coupon: Omit<Coupon, "id">) => {
    await withLoading(async () => {
      setCoupons((prev) => [
        { ...coupon, id: Date.now() },
        ...prev,
      ]);
      toast({ title: "Coupon Added", description: "Coupon added successfully." });
      setShowForm(false);
    });
  };

  // Edit coupon
  const handleEditCoupon = async (data: Coupon) => {
    await withLoading(async () => {
      setCoupons((prev) =>
        prev.map((c) => (c.id === data.id ? data : c))
      );
      toast({ title: "Coupon Updated", description: "Coupon updated successfully." });
      setEditCoupon(null);
    });
  };

  // Change coupon status (activate/deactivate)
  const handleToggleStatus = async (id: number) => {
    await withLoading(async () => {
      setCoupons((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: c.status === "active" ? "inactive" : "active",
              }
            : c
        )
      );
      toast({ title: "Status Updated", description: "Coupon status changed." });
    });
  };

  // Filtered/ searched list
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : coupon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Coupon Management</h1>
        <Button onClick={() => setShowForm(true)} className="gap-1">
          <Plus size={16} />
          New Coupon
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-start">
        <div className="flex items-center gap-2">
          <span className="text-sm">Search:</span>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
            <input
              className="border rounded px-8 py-2 text-sm focus:ring-2 focus:ring-primary"
              placeholder="Coupon code"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0 ml-0 md:ml-4">
          <Filter size={16} />
          <select
            className="border rounded px-2 py-2 text-sm"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center my-8">
          <Loader2 className="animate-spin text-flipkart-blue" size={28} />
        </div>
      )}
      <CouponList
        coupons={filteredCoupons}
        onEdit={setEditCoupon}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
      />
      <CouponForm open={showForm} onClose={() => setShowForm(false)} onSave={handleAddCoupon} />
      {editCoupon && (
        <EditCouponModal
          coupon={editCoupon}
          onClose={() => setEditCoupon(null)}
          onSave={handleEditCoupon}
        />
      )}
    </div>
  );
}
