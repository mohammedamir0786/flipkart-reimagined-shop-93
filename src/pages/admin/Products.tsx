
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Search,
  Plus,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { featuredProducts, newArrivals, topDeals } from "@/data/mockData";
import { Product } from "@/components/ProductCard";

interface AdminProduct extends Product {
  status: 'active' | 'draft' | 'archived';
  stock: number;
}

// Convert the existing product data to admin products
const mockProducts: AdminProduct[] = [
  ...featuredProducts.map(p => ({ ...p, status: 'active' as const, stock: Math.floor(Math.random() * 100) + 1 })),
  ...newArrivals.map(p => ({ ...p, status: 'active' as const, stock: Math.floor(Math.random() * 100) + 1 })),
  ...topDeals.map(p => ({ ...p, status: 'draft' as const, stock: Math.floor(Math.random() * 100) + 1 })),
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Filter products based on search query
  const filteredProducts = searchQuery
    ? mockProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockProducts;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button 
          className="bg-flipkart-blue hover:bg-flipkart-blue/90 flex items-center gap-1"
          onClick={() => navigate("/admin/products/add")}
        >
          <Plus size={16} />
          Add Product
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search products..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium line-clamp-1">{product.title}</div>
                      <div className="text-sm text-gray-500">ID: {product.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                <TableCell className="hidden md:table-cell">₹{product.price.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={
                      product.status === "active" 
                        ? "success" 
                        : product.status === "draft"
                        ? "outline"
                        : "destructive"
                    }
                    className={product.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                      >
                        <Pencil className="mr-2" size={14} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <FileText className="mr-2" size={14} />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2" size={14} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;
