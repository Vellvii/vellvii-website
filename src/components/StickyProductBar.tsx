import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2 } from "lucide-react";

interface StickyProductBarProps {
  productName: string;
  price: string;
  onAddToCart: () => void;
  isLoading?: boolean;
  isAvailable?: boolean;
}

export const StickyProductBar = ({
  productName,
  price,
  onAddToCart,
  isLoading = false,
  isAvailable = true,
}: StickyProductBarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky-product-bar ${isVisible ? "visible" : ""}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-light-primary font-baskerville font-semibold truncate">
            {productName}
          </h3>
          <p className="text-primary font-montserrat font-bold">${price}</p>
        </div>
        <Button
          size="lg"
          className="btn-premium px-6 h-11 flex-shrink-0"
          onClick={onAddToCart}
          disabled={isLoading || !isAvailable}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : !isAvailable ? (
            "Sold Out"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StickyProductBar;
