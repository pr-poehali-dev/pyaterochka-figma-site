
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  discount?: number;
  isNew?: boolean;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const discount = product.discount || (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : undefined);

  return (
    <Card 
      className="overflow-hidden transition-all duration-200 h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {discount && (
            <Badge className="bg-[#FF0000]">-{discount}%</Badge>
          )}
          
          {product.isNew && (
            <Badge className="bg-green-500">Новинка</Badge>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Icon name="Heart" size={18} className="text-gray-500" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">{product.price} ₽</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">{product.oldPrice} ₽</span>
            )}
          </div>
        </div>
        
        <h3 className="text-gray-800 font-medium mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <Button 
          className="w-full bg-[#FF0000] hover:bg-[#D10000] text-white"
          size="sm"
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
