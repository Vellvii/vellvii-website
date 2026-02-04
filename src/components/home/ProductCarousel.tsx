import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCarousel = () => {
  const { data: products, isLoading } = useShopifyProducts(10);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-primary/90 font-montserrat text-sm tracking-[0.3em] mb-4 block font-medium">
                THE COLLECTION
              </span>
              <h2 className="font-baskerville text-3xl md:text-5xl text-white">
                Designed to Work Together
              </h2>
            </div>
            <Link to="/shop" className="mt-6 md:mt-0">
              <Button variant="ghost" className="text-primary hover:text-primary/80 font-montserrat group">
                Shop All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Product Carousel */}
        <ScrollReveal delay={0.2}>
          <div className="relative -mx-4 px-4">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                  >
                    <div className="bg-surface-dark rounded-xl p-4">
                      <Skeleton className="aspect-square rounded-lg mb-4" />
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))
              ) : (
                products?.map((product, index) => (
                  <motion.div
                    key={product.node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                  >
                    <Link to={`/products/${product.node.handle}`} className="block group">
                      <div className="bg-surface-dark rounded-xl p-4 transition-all duration-300 hover:bg-surface-dark/80 hover:shadow-lg hover:shadow-primary/5">
                        <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-black/20">
                          {product.node.images.edges[0] && (
                            <img
                              src={product.node.images.edges[0].node.url}
                              alt={product.node.images.edges[0].node.altText || product.node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <h3 className="font-montserrat font-medium text-white mb-1 group-hover:text-primary transition-colors">
                          {product.node.title}
                        </h3>
                        <p className="font-montserrat text-primary text-lg">
                          ${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile Shop All CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/shop">
            <Button className="bg-primary text-black hover:bg-primary/90 font-montserrat font-semibold">
              Shop All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
