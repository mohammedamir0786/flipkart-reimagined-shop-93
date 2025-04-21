
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coupon } from "@/pages/admin/CouponManagement";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (coupon: Omit<Coupon, "id">) => void;
};

export default function CouponForm({ open, onClose, onSave }: Props) {
  const [values, setValues] = useState<Omit<Coupon, "id">>({
    code: "",
    discountType: "flat",
    discountValue: 0,
    minOrder: 0,
    expiry: "",
    status: "active",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((val) => ({
      ...val,
      [name]: name === "discountValue" || name === "minOrder" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    onSave(values);
    setValues({
      code: "",
      discountType: "flat",
      discountValue: 0,
      minOrder: 0,
      expiry: "",
      status: "active",
    });
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Coupon</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            name="code"
            placeholder="Coupon Code"
            value={values.code}
            onChange={handleChange}
            required
            className="uppercase tracking-wider"
          />
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-xs">Discount Type</label>
              <select
                name="discountType"
                value={values.discountType}
                onChange={handleChange}
                className="border rounded w-full px-2 py-2"
              >
                <option value="flat">Flat</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-xs">
                {values.discountType === "flat" ? "Discount Amount (₹)" : "Discount Percent (%)"}
              </label>
              <Input
                name="discountValue"
                type="number"
                min={1}
                value={values.discountValue}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Input
            name="minOrder"
            type="number"
            min={0}
            placeholder="Minimum Order Amount"
            value={values.minOrder}
            onChange={handleChange}
            required
          />
          <Input
            name="expiry"
            type="date"
            placeholder="Expiry Date"
            value={values.expiry}
            onChange={handleChange}
            required
          />
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Add Coupon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
