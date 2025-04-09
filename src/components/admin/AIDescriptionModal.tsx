
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LoaderCircle, Sparkles } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (description: string) => void;
  productTitle: string;
  productCategory: string;
}

// Mock AI service - in a real app, this would be a fetch to your API/OpenAI
const mockGenerateAIDescription = async (
  title: string, 
  category: string, 
  keywords: string,
  includeSpecifications: boolean
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  let description = `Introducing the ${title}, a premium ${category} designed to exceed your expectations.`;
  
  // Add keywords if provided
  if (keywords) {
    const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    if (keywordArray.length) {
      description += " Featuring " + keywordArray
        .map(k => `${k}`)
        .join(", ") + ".";
    }
  }

  // Add more details based on category
  switch (category.toLowerCase()) {
    case "electronics":
    case "mobile phones":
    case "laptops":
      description += ` This cutting-edge device combines sleek design with powerful performance. Whether you're a professional seeking productivity tools or a tech enthusiast looking for the latest innovation, the ${title} delivers exceptional value.`;
      break;
    case "fashion":
      description += ` Crafted with premium materials and attention to detail, this stylish item enhances your wardrobe with both comfort and elegance. Perfect for everyday wear or special occasions.`;
      break;
    case "home & kitchen":
      description += ` Transform your living space with this essential home item. Designed for both functionality and aesthetic appeal, it seamlessly blends into any home decor while making your daily routines more efficient.`;
      break;
    default:
      description += ` This high-quality product offers exceptional performance and durability, ensuring you get the best value for your investment. It's the perfect addition to enhance your lifestyle.`;
  }

  // Add specifications section if requested
  if (includeSpecifications) {
    description += `\n\nKey Specifications:\n• Premium Build Quality\n• Enhanced Performance\n• User-Friendly Design\n• Long-Lasting Durability`;
    
    // Add category-specific specs
    if (category.toLowerCase().includes("electronics") || category.toLowerCase().includes("laptop") || category.toLowerCase().includes("mobile")) {
      description += `\n• High-Resolution Display\n• Extended Battery Life\n• Advanced Connectivity Options`;
    }
  }
  
  return description;
};

const AIDescriptionModal = ({ 
  isOpen, 
  onClose, 
  onApply, 
  productTitle, 
  productCategory 
}: AIDescriptionModalProps) => {
  const [formData, setFormData] = useState({
    title: productTitle,
    category: productCategory,
    keywords: "",
    includeSpecifications: true,
  });
  
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Reset form data when modal opens with new product
  useState(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        title: productTitle,
        category: productCategory,
      }));
      setGeneratedDescription("");
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, includeSpecifications: checked });
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      const description = await mockGenerateAIDescription(
        formData.title,
        formData.category,
        formData.keywords,
        formData.includeSpecifications
      );
      
      setGeneratedDescription(description);
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleApply = () => {
    onApply(generatedDescription);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Generate Description with AI
          </DialogTitle>
          <DialogDescription>
            Enter product details to generate a compelling description using AI.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="keywords">Keywords or Highlights</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs text-gray-500 cursor-help">(?)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">Enter comma-separated keywords or product highlights to include in the description.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input 
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="e.g., waterproof, lightweight, durable"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="includeSpecs"
                checked={formData.includeSpecifications}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="includeSpecs">Include Specifications Section</Label>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !formData.title || !formData.category}
              className="bg-flipkart-blue hover:bg-flipkart-blue/90"
            >
              {isGenerating ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Description
                </>
              )}
            </Button>
          </div>
          
          {generatedDescription && (
            <div className="space-y-2">
              <Label>Generated Description</Label>
              <Textarea
                value={generatedDescription}
                onChange={(e) => setGeneratedDescription(e.target.value)}
                className="min-h-[150px] border-green-300 focus:border-green-500 focus-visible:ring-green-500/30"
                placeholder="Your AI-generated description will appear here"
              />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleApply}
            disabled={!generatedDescription}
            className="bg-flipkart-blue hover:bg-flipkart-blue/90"
          >
            Apply Description
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIDescriptionModal;
