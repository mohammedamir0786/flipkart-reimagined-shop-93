
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-gray-100 py-12">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-6 text-flipkart-blue">404</h1>
          <img 
            src="/placeholder.svg" 
            alt="Page not found" 
            className="w-64 h-64 mx-auto mb-6"
          />
          <p className="text-2xl font-medium mb-3">Oops! Page not found</p>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name 
            changed, or is temporarily unavailable.
          </p>
          <Button asChild className="bg-flipkart-blue hover:bg-flipkart-blue/90">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
