import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passport: ''
  });
  const { toast } = useToast();

  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const pricePerNight = 5500;
  const totalPrice = nights * pricePerNight;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите даты проживания",
        variant: "destructive"
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.passport) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля формы",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Бронирование оформлено! 🎉",
      description: `${formData.firstName}, ваше бронирование с ${format(checkIn, 'dd MMMM', { locale: ru })} по ${format(checkOut, 'dd MMMM', { locale: ru })} подтверждено`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Гранд Отель
          </h1>
          <p className="text-lg md:text-xl text-gray-600">Забронируйте свой идеальный отдых</p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
          <Card className="shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-all duration-300 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={28} className="text-white" />
                <div>
                  <CardTitle className="text-2xl">Выберите даты</CardTitle>
                  <CardDescription className="text-purple-100">Когда планируете остановиться?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Дата заезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-12 border-2 hover:border-purple-400 transition-colors"
                      >
                        <Icon name="CalendarDays" size={20} className="mr-2" />
                        {checkIn ? format(checkIn, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                        locale={ru}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-base font-semibold text-gray-700">Дата выезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-12 border-2 hover:border-purple-400 transition-colors"
                      >
                        <Icon name="CalendarDays" size={20} className="mr-2" />
                        {checkOut ? format(checkOut, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                        locale={ru}
                        disabled={(date) => !checkIn || date <= checkIn}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {nights > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Количество ночей:</span>
                    <span className="text-2xl font-bold text-purple-700">{nights}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-purple-100 hover:shadow-2xl transition-all duration-300 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-t-xl">
              <div className="flex items-center gap-3">
                <Icon name="User" size={28} className="text-white" />
                <div>
                  <CardTitle className="text-2xl">Данные постояльца</CardTitle>
                  <CardDescription className="text-pink-100">Укажите информацию о госте</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Имя
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Иван"
                    className="h-12 border-2 focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Icon name="User" size={16} />
                    Фамилия
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Иванов"
                    className="h-12 border-2 focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ivan@example.com"
                    className="h-12 border-2 focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (999) 123-45-67"
                    className="h-12 border-2 focus:border-purple-400 transition-colors"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="passport" className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Icon name="CreditCard" size={16} />
                    Паспортные данные
                  </Label>
                  <Input
                    id="passport"
                    name="passport"
                    value={formData.passport}
                    onChange={handleInputChange}
                    placeholder="1234 567890"
                    className="h-12 border-2 focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 animate-scale-in">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-700">Цена за ночь:</span>
                  <span className="font-semibold text-purple-700">{pricePerNight.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex items-center justify-between text-lg">
                  <span className="text-gray-700">Количество ночей:</span>
                  <span className="font-semibold text-purple-700">{nights}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                <div className="flex items-center justify-between text-2xl">
                  <span className="font-bold text-gray-800">Итого:</span>
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 h-14 text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon name="Check" size={24} className="mr-2" />
                Забронировать номер
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Index;
