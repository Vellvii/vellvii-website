import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { cn } from "@/lib/utils";
import { ImageSlider } from "./ImageSlider";

interface ProductCardProps {
  name: string;
  link: string;
  images: string[];
}

export const ProductCard = ({ name, link, images }: ProductCardProps) => {
  return (
    <Card className="glass-luxury apple-hover p-4 sm:p-6 text-center group">
      <ImageSlider images={images} name={name} className="w-full h-40 mb-4" />
      <h3 className="text-lg font-playfair font-semibold text-white mb-2">{name}</h3>
      <Link to={link}>
        <MagneticButton
          as="div"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}
        >
          Explore
        </MagneticButton>
      </Link>
    </Card>
  );
};
