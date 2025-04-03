
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Bell, 
  ChevronDown, 
  Heart, 
  LogIn, 
  Search, 
  ShoppingCart, 
  User 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-flipkart-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold italic">Flipkart</span>
              <div className="flex items-center text-xs text-flipkart-yellow italic">
                <span>Explore Plus</span>
                <span className="ml-1">
                  <img 
                    src="/placeholder.svg" 
                    alt="Plus" 
                    className="h-3 w-3" 
                  />
                </span>
              </div>
            </div>
          </Link>

          {/* Search */}
          <div className={`relative flex-grow max-w-2xl transition-all duration-200 ${isMobile && isSearchFocused ? 'flex-grow' : ''}`}>
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                className="bg-white text-black w-full py-1 px-3 rounded-md"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute right-2 text-flipkart-blue" size={20} />
            </div>
          </div>

          {/* Nav Items - hidden on mobile when search is focused */}
          {!(isMobile && isSearchFocused) && (
            <div className="flex items-center gap-4">
              {/* Login Button */}
              <div className="relative hidden md:block">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <LogIn className="mr-1 h-4 w-4" />
                  Login
                </Button>
              </div>

              {/* Become a Seller */}
              <Link to="#" className="hidden md:block text-sm whitespace-nowrap">
                Become a Seller
              </Link>

              {/* More */}
              <div className="hidden md:flex items-center text-sm">
                <span>More</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="hidden md:inline">Cart</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
