import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";
import { useState } from "react";
import { PrelaunchFooter } from "@/components/prelaunch/PrelaunchFooter";
import { TrustBadges } from "@/components/TrustBadges";
import { StickyProductBar } from "@/components/StickyProductBar";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || "");
  const addItem = useCartStore((state) => state.addItem);
  const cartLoading = useCartStore((state) => state.isLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen surface-dark-rich pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl bg-white/5" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4 bg-white/5" />
              <Skeleton className="h-10 w-1/4 bg-white/5" />
              <Skeleton className="h-32 w-full bg-white/5" />
              <Skeleton className="h-14 w-full bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen surface-dark-rich pt-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-baskerville text-light-primary mb-6">
            Product Not Found
          </h1>
          <Link to="/shop">
            <Button className="btn-premium px-8 py-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.node.variants.edges[0]?.node;
  const images = product.node.images.edges;
  const selectedImage = images[selectedImageIndex]?.node;
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);

  const handleAddToCart = async () => {
    if (!variant) return;

    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success(`${product.node.title} added to cart`, {
      position: "top-center",
    });
  };

  return (
    <>
      <SEO
        title={`${product.node.title} | Vellvii`}
        description={product.node.description.slice(0, 160)}
      />
      <div className="min-h-screen surface-dark-rich">
        {/* Back Navigation */}
        <div className="pt-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/shop"
              className="inline-flex items-center text-light-secondary hover:text-primary transition-colors font-montserrat text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Link>
          </div>
        </div>

        {/* Product Hero */}
        <section className="py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="product-image-container aspect-square">
                  {selectedImage ? (
                    <img
                      src={selectedImage.url}
                      alt={selectedImage.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-light-muted">
                      No Image
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === selectedImageIndex
                            ? "border-primary shadow-glow"
                            : "border-white/10 hover:border-primary/50"
                        }`}
                      >
                        <img
                          src={img.node.url}
                          alt={
                            img.node.altText ||
                            `${product.node.title} ${index + 1}`
                          }
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:sticky lg:top-24 space-y-8">
                <div>
                  <p className="text-primary font-montserrat text-sm uppercase tracking-[0.2em] mb-3">
                    Vellvii
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-baskerville font-bold text-light-primary mb-4">
                    {product.node.title}
                  </h1>
                  <p className="text-4xl font-bold gradient-text font-montserrat">
                    ${price.toFixed(0)}
                  </p>
                </div>

                <div className="prose max-w-none">
                  <p className="text-light-secondary leading-relaxed whitespace-pre-line font-montserrat text-base lg:text-lg">
                    {product.node.description}
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg btn-premium"
                  onClick={handleAddToCart}
                  disabled={cartLoading || !variant?.availableForSale}
                >
                  {cartLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : !variant?.availableForSale ? (
                    "Sold Out"
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                {/* Trust Badges */}
                <TrustBadges />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Product Bar */}
        <StickyProductBar
          productName={product.node.title}
          price={price.toFixed(0)}
          onAddToCart={handleAddToCart}
          isLoading={cartLoading}
          isAvailable={variant?.availableForSale}
        />

        <PrelaunchFooter />
      </div>
    </>
  );
};

export default ProductDetail;
