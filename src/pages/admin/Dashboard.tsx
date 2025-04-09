
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart } from "recharts";
import { BarChart3, ShoppingBag, Users, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 400 },
    { name: "Feb", sales: 300 },
    { name: "Mar", sales: 500 },
    { name: "Apr", sales: 700 },
    { name: "May", sales: 600 },
    { name: "Jun", sales: 800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹248,540</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,245</div>
              <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                <ShoppingBag size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+3.2% new products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12,234</div>
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <Users size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+8.3% new users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3.24%</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <BarChart3 size={20} />
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">+1.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Last 6 months sales performance
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                {/* Chart content would go here */}
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500 text-sm">Sales chart visualization</p>
                </div>
              </LineChart>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>
              Distribution by product category
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <BarChart
                data={[
                  { category: "Electronics", count: 45 },
                  { category: "Fashion", count: 30 },
                  { category: "Home", count: 15 },
                  { category: "Books", count: 10 },
                ]}
                margin={{
                  top: 5,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                {/* Chart content would go here */}
                <div className="flex justify-center items-center h-full">
                  <p className="text-gray-500 text-sm">Category chart visualization</p>
                </div>
              </BarChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
