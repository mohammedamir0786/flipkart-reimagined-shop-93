import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, Wand2, Loader2 } from "lucide-react";
import { featuredProducts, newArrivals, topDeals } from "@/data/mockData";
import { Product } from "@/components/ProductCard";
import AIDescriptionModal from "@/components/admin/AIDescriptionModal";
import { toast } from "sonner";

interface AdminProduct extends Product {
  status: 'active' | 'draft' | 'archived';
  stock: number;
  sku?: string;
  category?: string;
  description?: string;
}

const mockProducts: AdminProduct[] = [
  ...featuredProducts.map(p => ({ 
    ...p, 
    status: 'active' as const, 
    stock: Math.floor(Math.random() * 100) + 1,
    sku: `SKU-${p.id}${Math.floor(Math.random() * 1000)}`,
    category: "Electronics",
    description: "This is a product description. It would contain detailed information about the product, its features, specifications and benefits."
  })),
  ...newArrivals.map(p => ({ 
    ...p, 
    status: 'active' as const, 
    stock: Math.floor(Math.random() * 100) + 1,
    sku: `SKU-${p.id}${Math.floor(Math.random() * 1000)}`,
    category: "Home & Kitchen",
    description: "This is a product description. It would contain detailed information about the product, its features, specifications and benefits."
  })),
  ...topDeals.map(p => ({ 
    ...p, 
    status: 'draft' as const, 
    stock: Math.floor(Math.random() * 100) + 1,
    sku: `SKU-${p.id}${Math.floor(Math.random() * 1000)}`,
    category: "Fashion",
    description: "This is a product description. It would contain detailed information about the product, its features, specifications and benefits."
  })),
];

const categories = [
  "Electronics",
  "Mobile Phones",
  "Laptops",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Toys & Games",
  "Sports & Fitness",
  "Books",
  "Grocery",
];

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = id !== undefined;
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<AdminProduct>({
    id: 0,
    title: "",
    image: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    rating: 0,
    reviews: 0,
    status: "draft",
    stock: 0,
    sku: "",
    category: "",
    description: "",
  });
  
  useEffect(() => {
    if (isEditMode && id) {
      const productId = parseInt(id);
      const product = mockProducts.find(p => p.id === productId);
      
      if (product) {
        setFormData(product);
      } else {
        navigate("/admin/products");
        toast.error("Product not found");
      }
    }
  }, [isEditMode, id, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "originalPrice" || name === "stock") {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked ? 'active' : 'draft' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message = isEditMode
        ? "Product updated successfully"
        : "Product created successfully";
      
      toast.success(message);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAIDescription = (description: string) => {
    setFormData({ ...formData, description });
    setIsAIModalOpen(false);
    toast.success("AI description applied!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/admin/products")}
          >
            <ChevronLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            form="product-form"
            className="bg-flipkart-blue hover:bg-flipkart-blue/90"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditMode ? "Update Product" : "Create Product"
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Basic details about your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Name</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="Product name" 
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleSelect("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input 
                        id="sku" 
                        name="sku" 
                        placeholder="SKU" 
                        value={formData.sku}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="description">Description</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 text-flipkart-blue"
                        onClick={() => setIsAIModalOpen(true)}
                      >
                        <Wand2 size={14} />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Product description" 
                      className={`min-h-32 ${
                        formData.description && formData.description.length > 0
                          ? "border-green-300 focus:border-green-500 focus-visible:ring-green-500/30"
                          : ""
                      }`}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      placeholder="https://example.com/image.jpg" 
                      value={formData.image}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>
                Set your product pricing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Sale Price (₹)</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number"
                    placeholder="0.00" 
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Regular Price (₹)</Label>
                  <Input 
                    id="originalPrice" 
                    name="originalPrice" 
                    type="number"
                    placeholder="0.00" 
                    value={formData.originalPrice || ""}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input 
                    id="discount" 
                    name="discount" 
                    type="number"
                    placeholder="0" 
                    value={formData.discount || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
              <CardDescription>
                Manage product stock and inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock" 
                  name="stock" 
                  type="number"
                  placeholder="0" 
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>
                Product visibility settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Published</Label>
                  <div className="text-sm text-muted-foreground">
                    {formData.status === "active" ? 
                      "Product is visible to customers" : 
                      "Product is hidden from customers"}
                  </div>
                </div>
                <Switch 
                  id="status" 
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleSwitchChange("status", checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {formData.image && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48 border rounded-md overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt={formData.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <AIDescriptionModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)}
        onApply={handleAIDescription}
        productTitle={formData.title}
        productCategory={formData.category || ""}
      />
    </div>
  );
};

export default ProductForm;
