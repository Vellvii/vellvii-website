import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ImageSlider } from "./ImageSlider";

interface SimilarProductsProps {
  currentProduct: string;
}

const SimilarProducts = ({ currentProduct }: SimilarProductsProps) => {
  const products = [
    {
      id: "pulse",
      name: "Pulse",
      description: "Rhythmic Excellence",
      images: ["/uploads/Pulse1.jpg", "/uploads/Pulse2.jpg"],
      path: "/pulse",
    },
    {
      id: "vibe",
      name: "Vibe",
      description: "Versatile Luxury",
      images: ["/uploads/Vibe1.jpg", "/uploads/Vibe2.jpg"],
      path: "/vibe",
    },
    {
      id: "g-vibe",
      name: "G-Vibe",
      description: "Precision Design",
      images: ["/uploads/G-Vibe1.jpg", "/uploads/G-Vibe2.jpg", "/uploads/G-Vibe3.jpg"],
      path: "/g-vibe",
    },
    {
      id: "dox",
      name: "DOX",
      description: "Luxury Storage",
      images: ["/uploads/Dox1.jpg", "/uploads/Dox2.jpg", "/uploads/Dox3.jpg", "/uploads/Dox4.jpg", "/uploads/Dox5.jpg"],
      path: "/dox",
    },
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
          {filteredProducts.map((product) => (
            <Link key={product.id} to={product.path}>
              <Card className="glass-luxury hover:scale-105 transition-all duration-500 hover-glow p-6 text-center group">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <ImageSlider images={product.images} name={product.name} className="w-full h-full" />
                </div>
                <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                  Vellvii {product.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {product.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;