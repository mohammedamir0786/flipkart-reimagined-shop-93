
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-8 pb-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-gray-600 font-medium mb-4 uppercase text-sm">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Contact Us</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">About Us</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Careers</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Press</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-gray-600 font-medium mb-4 uppercase text-sm">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Payments</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Shipping</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Cancellation & Returns</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">FAQ</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Report Infringement</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-gray-600 font-medium mb-4 uppercase text-sm">Policy</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Return Policy</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Terms Of Use</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Security</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Privacy</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-flipkart-blue">Sitemap</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-600 font-medium mb-4 uppercase text-sm">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-flipkart-blue mt-0.5 mr-2" />
                <span className="text-gray-500">123 E-commerce St, Shopping District, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-flipkart-blue mr-2" />
                <span className="text-gray-500">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-flipkart-blue mr-2" />
                <span className="text-gray-500">support@flipkart-clone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src="/placeholder.svg" alt="Payment Method" className="h-8" />
              <img src="/placeholder.svg" alt="Payment Method" className="h-8" />
              <img src="/placeholder.svg" alt="Payment Method" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
