
import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 700]);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
  // Получаем уникальные категории
  const categories = [...new Set(products.map(product => product.category))];
  
  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Поиск по названию
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Фильтр по категории
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    
    // Фильтр по цене
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Фильтр по скидкам
    if (showDiscount && !product.discount) {
      return false;
    }
    
    // Фильтр по новинкам
    if (showNew && !product.isNew) {
      return false;
    }
    
    return true;
  });

  // Перевод категорий на русский
  const categoryNames: Record<string, string> = {
    'grocery': 'Продукты',
    'household': 'Бытовая химия',
    'beverages': 'Напитки'
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Фильтры (Сайдбар) */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Фильтры</h2>
            
            <div className="mb-6">
              <Input
                type="search"
                placeholder="Поиск товаров..."
                className="mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Категории</h3>
              <div className="space-y-2">
                <div 
                  className={`cursor-pointer p-2 rounded ${selectedCategory === null ? 'bg-[#FF0000]/10 text-[#FF0000]' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Все категории
                </div>
                {categories.map(category => (
                  <div 
                    key={category}
                    className={`cursor-pointer p-2 rounded ${selectedCategory === category ? 'bg-[#FF0000]/10 text-[#FF0000]' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryNames[category] || category}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Цена, ₽</h3>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 700]} 
                  max={700} 
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0]} ₽</span>
                  <span>{priceRange[1]} ₽</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Специальные предложения</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="discount" 
                    checked={showDiscount}
                    onCheckedChange={(checked) => setShowDiscount(checked as boolean)}
                  />
                  <label
                    htmlFor="discount"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Со скидкой
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="new" 
                    checked={showNew}
                    onCheckedChange={(checked) => setShowNew(checked as boolean)}
                  />
                  <label
                    htmlFor="new"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Новинки
                  </label>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setPriceRange([0, 700]);
                setShowDiscount(false);
                setShowNew(false);
              }}
              className="w-full border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000]/10"
            >
              Сбросить фильтры
            </Button>
          </div>
          
          {/* Список товаров */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Найдено товаров: {filteredProducts.length}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Сортировать:</span>
                <select className="border rounded p-2 text-sm">
                  <option>По популярности</option>
                  <option>По возрастанию цены</option>
                  <option>По убыванию цены</option>
                  <option>По скидке</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">Товары не найдены</h3>
                <p className="text-gray-500">Попробуйте изменить параметры поиска или фильтры</p>
              </div>
            )}
            
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    <Icon name="ChevronLeft" size={18} />
                  </Button>
                  <Button size="sm" className="bg-[#FF0000] hover:bg-[#D10000]">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span>...</span>
                  <Button variant="outline" size="sm">10</Button>
                  <Button variant="outline" size="icon">
                    <Icon name="ChevronRight" size={18} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О компании</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FF0000]">О нас</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Новости</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Вакансии</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Покупателям</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FF0000]">Доставка</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Оплата</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Возврат</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Бонусная программа</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Партнерам</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FF0000]">Поставщикам</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Арендодателям</a></li>
                <li><a href="#" className="hover:text-[#FF0000]">Рекламодателям</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <p className="mb-2">8-800-555-55-55</p>
              <p className="mb-4">info@5ka.ru</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#FF0000]"><Icon name="Facebook" size={20} /></a>
                <a href="#" className="hover:text-[#FF0000]"><Icon name="Instagram" size={20} /></a>
                <a href="#" className="hover:text-[#FF0000]"><Icon name="Twitter" size={20} /></a>
                <a href="#" className="hover:text-[#FF0000]"><Icon name="Youtube" size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
            <p>© 2025 Пятёрочка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Catalog;
