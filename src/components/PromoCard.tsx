
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PromoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  color?: string;
}

const PromoCard = ({ title, description, imageSrc, color = "#F3F4F6" }: PromoCardProps) => {
  return (
    <Card className="overflow-hidden group h-full" style={{ backgroundColor: color }}>
      <div className="relative h-48">
        <img 
          src={imageSrc} 
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <Button variant="outline" className="border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10">
          Подробнее
          <Icon name="ArrowRight" className="ml-2" size={16} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromoCard;
