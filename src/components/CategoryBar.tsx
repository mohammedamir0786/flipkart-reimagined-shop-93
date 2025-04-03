
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Electronics", icon: "/placeholder.svg", path: "/category/electronics" },
  { name: "TVs & Appliances", icon: "/placeholder.svg", path: "/category/tvs-appliances" },
  { name: "Men", icon: "/placeholder.svg", path: "/category/men" },
  { name: "Women", icon: "/placeholder.svg", path: "/category/women" },
  { name: "Baby & Kids", icon: "/placeholder.svg", path: "/category/baby-kids" },
  { name: "Home & Furniture", icon: "/placeholder.svg", path: "/category/home-furniture" },
  { name: "Sports & Books", icon: "/placeholder.svg", path: "/category/sports-books" },
  { name: "Flights", icon: "/placeholder.svg", path: "/flights" },
  { name: "Grocery", icon: "/placeholder.svg", path: "/grocery" },
];

const CategoryBar = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between overflow-x-auto hide-scrollbar py-2 px-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="flex flex-col items-center min-w-[80px] px-2 py-1 text-sm hover:text-flipkart-blue"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="max-w-full max-h-full"
                />
              </div>
              <span className="text-center mt-1">{category.name}</span>
              <ChevronDown className="h-3 w-3 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
