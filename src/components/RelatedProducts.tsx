import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopifyProduct } from "@/lib/shopify";
import { ChevronRight } from "lucide-react";
import { CANONICAL_HANDLES } from "@/lib/pdpContent";
import { StatusPill, getProductStatus } from "@/components/products/StatusPill";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  currentHandle: string;
  maxProducts?: number;
}

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const isAvailable = product.node.variants.edges.some((v) => v.node.availableForSale);

  return (
    <Link
      to={`/products/${product.node.handle}`}
      className={cn(
        "group block flex-shrink-0 w-[150px] sm:w-[200px] lg:w-[240px] transition-opacity",
        !isAvailable && "opacity-65 hover:opacity-100"
      )}
    >
      <div className="card-dark rounded-xl overflow-hidden h-full">
        <div className="product-image-container aspect-square relative">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || product.node.title}
              className={cn("w-full h-full object-cover", !isAvailable && "grayscale-[35%]")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-light-muted text-xs">
              No Image
            </div>
          )}
          <StatusPill
            status={getProductStatus(product.node.handle, isAvailable)}
            className="absolute top-2 left-2"
          />
        </div>
        <div className="p-3 sm:p-4">
          <h4 className="text-light-primary font-baskerville font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.node.title}
          </h4>
          <p className={cn("font-montserrat font-bold text-base sm:text-lg", isAvailable ? "text-primary" : "text-light-muted")}>
            ${parseFloat(price.amount).toFixed(0)}
          </p>
        </div>
      </div>
    </Link>
  );
};

const ProductSkeleton = () => (
  <div className="flex-shrink-0 w-[150px] sm:w-[200px] lg:w-[240px]">
    <div className="card-dark rounded-xl overflow-hidden">
      <Skeleton className="aspect-square bg-white/5" />
      <div className="p-3 sm:p-4 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-white/5" />
        <Skeleton className="h-5 w-1/3 bg-white/5" />
      </div>
    </div>
  </div>
);

export const RelatedProducts = ({ currentHandle, maxProducts = 8 }: RelatedProductsProps) => {
  const { data: allProducts, isLoading } = useShopifyProducts(20);

  // Only surface canonical Vellvii products (filters out drafts / legacy items)
  const relatedProducts = allProducts
    ?.filter((p) => CANONICAL_HANDLES.includes(p.node.handle as any))
    .filter((p) => p.node.handle !== currentHandle)
    // In-stock first so cross-links don't dead-end
    .sort((a, b) => {
      const aAvail = a.node.variants.edges.some((v) => v.node.availableForSale) ? 0 : 1;
      const bAvail = b.node.variants.edges.some((v) => v.node.availableForSale) ? 0 : 1;
      return aAvail - bAvail;
    })
    .slice(0, maxProducts);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                Complete Your Collection
              </p>
              <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary">
                You May Also <span className="gradient-text">Like</span>
              </h2>
            </div>
          </div>
          <div className="flex max-w-full gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain pb-4 scrollbar-luxury">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
              Complete Your Collection
            </p>
            <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary">
              You May Also <span className="gradient-text">Like</span>
            </h2>
          </div>
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-1 text-light-secondary hover:text-primary transition-colors font-montserrat text-sm"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex max-w-full gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain pb-4 scrollbar-luxury">
          {relatedProducts.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Link */}
        <Link 
          to="/shop" 
          className="sm:hidden flex items-center justify-center gap-1 mt-4 text-light-secondary hover:text-primary transition-colors font-montserrat text-sm"
        >
          View All Products
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;
