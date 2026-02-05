import { Link } from "react-router-dom";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? "fill-brand-gold text-brand-gold" 
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <div 
      className="group bg-card rounded-2xl border border-border overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discount}%
            </Badge>
          )}
          {product.thirdPartyTested && (
            <Badge className="bg-secondary text-secondary-foreground">
              Lab Tested
            </Badge>
          )}
        </div>

        {/* Quick add overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            className="btn-secondary gap-2"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {product.category.replace('-', ' ')}
        </p>

        {/* Title */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <Button className="flex-1 btn-primary gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.organic && (
            <span className="text-xs px-2 py-0.5 bg-brand-mint rounded-full text-secondary">
              Organic
            </span>
          )}
          {product.madeInUSA && (
            <span className="text-xs px-2 py-0.5 bg-brand-light-blue rounded-full text-primary">
              USA Made
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
