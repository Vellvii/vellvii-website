import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart, Star, Shield, Package } from "lucide-react";

interface SimilarProductsProps {
  currentProduct: string;
}

const SimilarProducts = ({ currentProduct }: SimilarProductsProps) => {
  const products = [
    {
      id: "pulse",
      name: "Pulse",
      description: "Rhythmic Excellence",
      icon: Heart,
      path: "/product-one",
      gradient: "bg-gradient-primary"
    },
    {
      id: "vibe", 
      name: "Vibe",
      description: "Versatile Luxury",
      icon: Star,
      path: "/product-two",
      gradient: "bg-gradient-secondary"
    },
    {
      id: "g-vibe",
      name: "G-Vibe", 
      description: "Precision Design",
      icon: Shield,
      path: "/product-three",
      gradient: "bg-gradient-primary"
    },
    {
      id: "dox",
      name: "DOX",
      description: "Luxury Storage",
      icon: Package,
      path: "/storage",
      gradient: "bg-gradient-secondary"
    }
  ];

  const filteredProducts = products.filter(product => product.id !== currentProduct);

  return (
    <section className="px-6 py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Similar Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore other pieces in our luxury collection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Link key={product.id} to={product.path}>
                <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                  <div className={`w-16 h-16 mx-auto ${product.gradient} rounded-full flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Vellvii {product.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {product.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;