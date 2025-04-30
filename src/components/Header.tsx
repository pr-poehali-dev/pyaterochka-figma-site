
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000]">
              <span className="font-bold text-white">5</span>
            </div>
            <span className="text-xl font-bold text-[#FF0000]">Пятёрочка</span>
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-gray-700 hover:text-[#FF0000]">Главная</Link></li>
            <li><Link to="/catalog" className="text-gray-700 hover:text-[#FF0000]">Каталог</Link></li>
            <li><Link to="/promotions" className="text-gray-700 hover:text-[#FF0000]">Акции</Link></li>
            <li><Link to="/shops" className="text-gray-700 hover:text-[#FF0000]">Магазины</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Поиск товаров..."
              className="w-64 rounded-full pr-10"
            />
            <Icon 
              name="Search" 
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Icon name="User" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Icon name="ShoppingCart" size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden text-gray-700">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
