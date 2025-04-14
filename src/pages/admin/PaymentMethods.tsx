
import { useState, useMemo } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartTooltip, 
  Legend 
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, subDays, subWeeks, subMonths } from "date-fns";
import { Calendar as CalendarIcon, HelpCircle, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock payment data
const mockPaymentData = [
  { 
    name: "UPI",
    orders: 4250,
    revenue: 4250000,
    color: "#8B5CF6"
  },
  { 
    name: "Credit Card", 
    orders: 2500,
    revenue: 5000000,
    color: "#0EA5E9"
  },
  { 
    name: "Debit Card", 
    orders: 1800,
    revenue: 2700000,
    color: "#F97316"
  },
  { 
    name: "Net Banking", 
    orders: 950,
    revenue: 1425000,
    color: "#D946EF"
  },
  { 
    name: "Cash on Delivery", 
    orders: 1500,
    revenue: 1125000,
    color: "#8A898C"
  }
];

// Filter options
const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "custom", label: "Custom Range" }
];

const statusOptions = [
  { value: "all", label: "All Orders" },
  { value: "completed", label: "Completed" },
  { value: "processing", label: "Processing" },
  { value: "canceled", label: "Canceled" }
];

const PaymentMethods = () => {
  const [dateRange, setDateRange] = useState("month");
  const [orderStatus, setOrderStatus] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Calculate totals and percentages
  const totalOrders = useMemo(() => mockPaymentData.reduce((sum, item) => sum + item.orders, 0), []);
  const totalRevenue = useMemo(() => mockPaymentData.reduce((sum, item) => sum + item.revenue, 0), []);
  
  // Add percentage to data
  const chartData = useMemo(() => mockPaymentData.map(item => ({
    ...item,
    percentage: (item.orders / totalOrders) * 100
  })), [totalOrders]);

  // Find top payment method
  const topPaymentMethod = useMemo(() => {
    return mockPaymentData.reduce((max, item) => item.orders > max.orders ? item : max, mockPaymentData[0]);
  }, []);

  // Format for pie chart
  const formattedChartData = chartData.map(item => ({
    name: item.name,
    value: item.percentage,
    color: item.color
  }));

  // Date range label
  const dateRangeLabel = useMemo(() => {
    switch(dateRange) {
      case "today":
        return format(new Date(), "PP");
      case "week":
        return `${format(subDays(new Date(), 7), "PP")} - ${format(new Date(), "PP")}`;
      case "month":
        return `${format(subMonths(new Date(), 1), "PP")} - ${format(new Date(), "PP")}`;
      case "custom":
        return date ? format(date, "PP") : "Select a date";
      default:
        return "This Month";
    }
  }, [dateRange, date]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Payment Methods Analytics</h2>
        <div className="flex items-center gap-4">
          <div>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {dateRange === "custom" && (
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[190px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing data for {dateRangeLabel}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Orders</CardTitle>
            <CardDescription>All payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalOrders.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            <CardDescription>All payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{(totalRevenue / 100000).toFixed(2)}L</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top Payment Method</CardTitle>
            <CardDescription>Most used by customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{topPaymentMethod.name}</div>
              <Badge variant="success" className="text-xs">
                {Math.round((topPaymentMethod.orders / totalOrders) * 100)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Payment Methods Distribution 
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distribution of orders by payment method</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Percentage breakdown by number of orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {formattedChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartTooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'Percentage']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    formatter={(value) => <span className="text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Detailed Payment Statistics
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Detailed breakdown of orders and revenue by payment method</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Orders and revenue by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chartData.map((item) => (
                  <TableRow key={item.name} className={item.name === topPaymentMethod.name ? "bg-muted/50" : ""}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                        {item.name === topPaymentMethod.name && (
                          <Badge variant="success" className="ml-1">Top</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.orders.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{(item.revenue / 100000).toFixed(2)}L</TableCell>
                    <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow className="border-t-2">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{totalOrders.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">₹{(totalRevenue / 100000).toFixed(2)}L</TableCell>
                <TableCell className="text-right font-bold">100%</TableCell>
              </TableRow>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethods;
