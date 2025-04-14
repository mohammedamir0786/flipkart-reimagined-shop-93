
import { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Mail, Phone, MapPin, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock customer data
const mockCustomers = [
  { 
    id: "1", 
    name: "Rahul Sharma", 
    email: "rahul.sharma@example.com", 
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    orderCount: 12,
    totalSpent: 24800,
    status: "active"
  },
  { 
    id: "2", 
    name: "Priya Singh", 
    email: "priya.singh@example.com", 
    phone: "+91 87654 32109",
    location: "Delhi, NCR",
    orderCount: 8,
    totalSpent: 15600,
    status: "active"
  },
  { 
    id: "3", 
    name: "Amit Kumar", 
    email: "amit.kumar@example.com", 
    phone: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    orderCount: 5,
    totalSpent: 9200,
    status: "inactive"
  },
  { 
    id: "4", 
    name: "Deepika Patel", 
    email: "deepika.patel@example.com", 
    phone: "+91 65432 10987",
    location: "Hyderabad, Telangana",
    orderCount: 10,
    totalSpent: 18500,
    status: "active"
  },
  { 
    id: "5", 
    name: "Vikram Reddy", 
    email: "vikram.reddy@example.com", 
    phone: "+91 54321 09876",
    location: "Chennai, Tamil Nadu",
    orderCount: 3,
    totalSpent: 4700,
    status: "inactive"
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(mockCustomers);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Stats calculation
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === "active").length;
  const totalOrders = customers.reduce((acc, customer) => acc + customer.orderCount, 0);
  const totalRevenue = customers.reduce((acc, customer) => acc + customer.totalSpent, 0);
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
        <p className="text-muted-foreground">
          View and manage your customer accounts
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search customers..." 
            className="pl-9 w-full sm:w-[300px]" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>
      
      {/* Customers Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-3 w-3" /> {customer.email}
                      </span>
                      <span className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="mr-2 h-3 w-3" /> {customer.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                      {customer.location}
                    </div>
                  </TableCell>
                  <TableCell>{customer.orderCount}</TableCell>
                  <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    {customer.status === "active" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
                        <X className="h-3 w-3" /> Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No customers found for "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Customers;
