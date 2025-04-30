
import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ProductCard from '@/components/ProductCard';
import PromoCard from '@/components/PromoCard';
import { products } from '@/data/products';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const filteredProducts = activeCategory === "all" 
    ? products.slice(0, 8) 
    : products.filter(p => p.category === activeCategory).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative">
          <div className="bg-[#FF0000]/10 py-12 md:py-24">
            <div className="container px-4 mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Выгодные цены <br />
                    <span className="text-[#FF0000]">каждый день</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Свежие продукты, низкие цены и удобная доставка на дом
                  </p>
                  <Button className="bg-[#FF0000] hover:bg-[#D10000] text-white">
                    Перейти в каталог
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=2274&auto=format&fit=crop"
                    alt="Пятёрочка - выгодные покупки" 
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Популярные товары */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Популярные товары</h2>
              <Button variant="ghost" className="text-[#FF0000]">
                Смотреть все
                <Icon name="ChevronRight" className="ml-1" size={16} />
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger 
                  value="all"
                  onClick={() => setActiveCategory("all")}
                >
                  Все товары
                </TabsTrigger>
                <TabsTrigger 
                  value="grocery"
                  onClick={() => setActiveCategory("grocery")}
                >
                  Продукты
                </TabsTrigger>
                <TabsTrigger 
                  value="household"
                  onClick={() => setActiveCategory("household")}
                >
                  Бытовая химия
                </TabsTrigger>
                <TabsTrigger 
                  value="beverages"
                  onClick={() => setActiveCategory("beverages")}
                >
                  Напитки
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="grocery" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="household" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="beverages" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Акции и специальные предложения */}
        <section className="py-12 bg-gray-100">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Акции и специальные предложения</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PromoCard 
                title="Скидка 20% на фрукты" 
                description="Действует до 10 мая" 
                imageSrc="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" 
                color="#FFF2CC"
              />
              <PromoCard 
                title="2+1 на все соки" 
                description="При покупке двух соков третий в подарок" 
                imageSrc="https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1287&auto=format&fit=crop" 
                color="#FFE8E8"
              />
              <PromoCard 
                title="Кэшбэк 10%" 
                description="На все товары по карте Пятёрочка" 
                imageSrc="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1287&auto=format&fit=crop" 
                color="#E8F4FF"
              />
            </div>
          </div>
        </section>
        
        {/* Приложение */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="bg-[#FF0000]/10 rounded-xl p-8 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Скачайте наше приложение</h2>
                <p className="text-gray-600 mb-6">Получайте персональные скидки, отслеживайте заказы и копите баллы на будущие покупки</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    <Icon name="Apple" className="mr-2" size={20} />
                    App Store
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    <Icon name="Play" className="mr-2" size={20} />
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1181&auto=format&fit=crop" 
                  alt="Мобильное приложение Пятёрочка" 
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
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

export default Index;
