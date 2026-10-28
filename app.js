/* =========================================================
   API SOZLAMALARI
   ========================================================= */
const API_URL = '/api';

/* =========================================================
   MAHSULOTLAR (ASOSIY ZAXIRA RO'YXATI)
   ========================================================= */
let DEFAULT_PRODUCTS = [
  { "id": "philadelphia", "name": "Ролл Филадельфия", "desc": "Рис, Сыр творожный, Огурец, Лосось", "price": 75000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/1.png" },
  { "id": "phil-eel", "name": "Ролл Филадельфия с угрем", "desc": "Рис, Сыр творожный, Огурец, Авокадо, Угорь унаги, Кунжут", "price": 76000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/2.png" },
  { "id": "avocado-roll", "name": "Ролл с Авокадо", "desc": "Рис, Сыр творожный, Лосось, Авокадо", "price": 65000, "pieces": 0, "cat": ["klassik"], "img": "images/3.png" },
  { "id": "phil-eel-salmon", "name": "Ролл Филадельфия Угорь и Лосось", "desc": "Рис, Сыр творожный, Авокадо, Масага икра, Лосось, Угорь, С/с унаги, Кунжут", "price": 75000, "pieces": 0, "cat": ["klassik"], "img": "images/4.png" },
  { "id": "caesar", "name": "Ролл Цезарь", "desc": "Рис, Салат айсберг, Помидор, Сыр творожный, Курица, Соус Цезарь, Сыр пармезан", "price": 68000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/5.png" },
  { "id": "veggie", "name": "Вегетарианский ролл", "desc": "Рис, Паприка, Огурец, Авокадо, Салат Айсберг, Сладкий чили соус", "price": 60000, "pieces": 0, "cat": ["klassik", "vegetarian"], "img": "images/6.png" },
  { "id": "phil-shrimp", "name": "Филадельфия с креветками", "desc": "Рис, Нори, Сыр творожный, Авокадо, Лосось, креветки, Соус Унаги, Соус фирменный, Лук зеленый", "price": 78000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/7.png" },
  { "id": "cal-sesame", "name": "Ролл калифорния с кунжутом", "desc": "Рис, Нори, Майонез, Краб, Огурец, Авокадо, Кунжут белый", "price": 65000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/8.png" },
  { "id": "cal-roe", "name": "Ролл калифорния с икрой", "desc": "Рис, Нори, Майонез, Краб, Огурец, Авокадо, Масаго оранжевый", "price": 68000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/9.png" },
  { "id": "ebi-lux", "name": "Ролл Эби люкс", "desc": "Рис, Нори, Икра масаго, Авокадо, Креветка, Соус унаги, Сыр творожный", "price": 68000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/10.png" },
  { "id": "chukka-salmon", "name": "Ролл с чучкой и лососем", "desc": "Рис, Нори, Лосось, Огурец, Салат чучка, Ореховый соус, Сыр творожный, Икра масаго", "price": 73000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/11.png" },
  { "id": "phil-light", "name": "Ролл Филадельфия лайт", "desc": "Рис, Сыр творожный, Огурец, Лосось", "price": 65000, "pieces": 0, "cat": ["klassik"], "img": "images/12.png" },
  { "id": "maki-cucumber", "name": "Маки с огурцом", "desc": "Рис, Огурец", "price": 35000, "pieces": 0, "cat": ["maki", "vegetarian"], "img": "images/13.png" },
  { "id": "maki-eel", "name": "Маки с угрем", "desc": "Рис, Унаги угорь", "price": 50000, "pieces": 0, "cat": ["maki"], "img": "images/14.png" },
  { "id": "maki-salmon", "name": "Маки с лососем", "desc": "Рис, Лосось", "price": 50000, "pieces": 0, "cat": ["maki"], "img": "images/15.png" },
  { "id": "maki-avocado", "name": "Маки с авокадо", "desc": "Рис, Авокадо", "price": 35000, "pieces": 0, "cat": ["maki", "vegetarian"], "img": "images/16.png" },
  { "id": "sushi-salmon", "name": "Суши с лососем", "desc": "3 шт", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/17.png" },
  { "id": "sushi-baked", "name": "Суши запеченный", "desc": "3 шт. с угрём, с лососем, с курицей, с креветкой", "price": 36000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/18.png" },
  { "id": "sushi-eel", "name": "Суши с угрем", "desc": "3 шт", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/19.png" },
  { "id": "sushi-shrimp", "name": "Суши с креветками", "desc": "3 шт", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/20.png" },
  { "id": "sweet-roll", "name": "Сладкий ролл с фруктами", "desc": "Спринг тесто, Сладкий сыр, Киви, Персик, Ананас, Сироп малиновый", "price": 56000, "pieces": 0, "cat": ["maki", "yangi", "vegetarian"], "badge": "new", "img": "images/21.png" },
  { "id": "burnt-salmon", "name": "Опаленный ролл с лососем", "desc": "Рис, Сыр творожный, Огурец, Авокадо, Лосось, С/с унаги", "price": 76000, "pieces": 0, "cat": ["opalyon"], "img": "images/22.png" },
  { "id": "sake-avocado", "name": "Ролл Саке-Авокадо", "desc": "Рис, Нори, Сыр творожный, Авокадо, Лосось, Соус фирменный, Лук зеленый", "price": 68000, "pieces": 0, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/23.png" },
  { "id": "ebi-avocado", "name": "Ролл Эби-Авокадо", "desc": "Рис, Нори, Сыр творожный, Авокадо, Эби креветка, Икра масаго, Соус Унаги, Соус фирменный, Лук зеленый", "price": 70000, "pieces": 0, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/24.png" },
  { "id": "burnt-sushi", "name": "Опаленный суши с лососем", "desc": "3 шт", "price": 69000, "pieces": 3, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/25.png" },
  { "id": "spicy-eel", "name": "Ролл спайси угорь", "desc": "Рис, Нори, Огурец, Сыр творожный, Соус ширачи, Угорь, Соус спайси, Соус унаги, Кунжут", "price": 73000, "pieces": 0, "cat": ["opalyon", "yangi", "achchiq"], "badge": "new", "img": "images/26.png" },
  { "id": "fried-crab", "name": "Жареный ролл с крабом", "desc": "Рис, Сыр творожный, Огурец, Лосось жареный, Замес краб, Икра масаго, Соус Ширачи айоли", "price": 74000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/27.png" },
  { "id": "sand-chicken", "name": "Жареный сендвич с курицей", "desc": "Рис, Нори, Огурец, Сыр Чеддер, Помидор, Курица, Соус фирменный, Айсберг, Кляр, Сухарик, Соус Унаги, Кунжут микс", "price": 69000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/28.png" },
  { "id": "fried-shrimp", "name": "Жареный ролл с креветками", "desc": "Рис, Сыр творожный, Огурец, Тигровые креветки, С/с ореховый, Арахис", "price": 73000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/29.png" },
  { "id": "fried-chicken", "name": "Жареный ролл с курицей", "desc": "Рис, Сыр творожный, Салат айсберг, Курица, Помидор, Соус Цезарь, Сыр пармезан", "price": 70000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/30.png" },
  { "id": "sand-shrimp", "name": "Жареный сендвич с креветками", "desc": "Рис, Нори, Огурец, Сыр Чеддер, Помидор, Креветки, Соус фирменный, Айсберг, Кляр, Сухарик, Соус Унаги, Кунжут микс", "price": 73000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/31.png" },
  { "id": "sand-crab", "name": "Жареный сендвич с крабом", "desc": "Рис, Нори, Огурец, Сыр Чеддер, Помидор, Краб, Соус фирменный, Айсберг, Кляр, Сухарик, Соус Унаги, Кунжут микс", "price": 68000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/32.png" },
  { "id": "sand-salmon", "name": "Жареный сендвич с лососем", "desc": "Рис, Нори, Огурец, Сыр Чеддер, Помидор, Лосось, Соус фирменный, Айсберг, Кляр, Сухарик, Соус Унаги, Кунжут микс", "price": 70000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/33.png" },
  { "id": "fried-veg", "name": "Жареный овощной ролл", "desc": "Рис, Нори, Айсберг, Огурец, Болгарский, Салат чучка, Авокадо, Унаги соус", "price": 65000, "pieces": 0, "cat": ["qovurilgan", "yangi", "vegetarian"], "badge": "new", "img": "images/34.png" },
  { "id": "shrimp-tempura", "name": "Креветки в темпуре", "desc": "Тигровые креветки, Соль, Перец, Сухарик, Кляр, Унаги соус, Кунжут, Фирменный соус", "price": 72000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/35.png" },
  { "id": "wok-chicken", "name": "Вок с курицей", "desc": "Лапша удон, Курица, Кабачки, Морковь, Перец болгарский, Соус на выбор, (теряки | удон), Лук зелёный, Кунжут", "price": 66000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/36.png" },
  { "id": "wok-shrimp", "name": "Вок с креветками", "desc": "Лапша удон, Креветки, Кабачки, Морковь, Перец болгарский, Соус на выбор, (теряки | удон), Лук зелёный, Кунжут", "price": 72000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/37.png" },
  { "id": "wok-veg", "name": "Вок с овощами", "desc": "Лапша удон, Кабачки, Морковь, Перец болгарский, Баклажан, Соус на выбор, (теряки | удон), Лук зелёный, Кунжут", "price": 60000, "pieces": 0, "cat": ["wok", "yangi", "vegetarian"], "badge": "new", "img": "images/38.png" },
  { "id": "poke-shrimp", "name": "Поке с креветками", "desc": "Рис, Авокадо, Огурец, Помидор, Креветки, Снек нори, Соус фирменный, Салат чучка, Микс кунжут", "price": 79000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/39.png" },
  { "id": "poke-salmon", "name": "Поке с лососем", "desc": "Рис, Авокадо, Огурец, Помидор, Лосось, Снек нори, Соус фирменный, Салат чучка, Микс кунжут", "price": 72000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/40.png" },
  { "id": "poke-chicken", "name": "Поке с курицей", "desc": "Рис, Авокадо, Огурец, Помидор, Курица, Снек нори, Соус фирменный, Салат чучка, Микс кунжут", "price": 65000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/41.png" },
  { "id": "bk-chicken", "name": "Запечённый ролл с курицей", "desc": "Рис, Сыр творожный, Огурец, Айсберг, Курица, Соус сырный, Унаги соус, Кунжут", "price": 66000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/42.png" },
  { "id": "bk-chicken-spicy", "name": "Запечённый ролл с курицей (острый)", "desc": "Рис, Сыр творожный, Огурец, Курица, Спайси соус, Унаги соус, Кунжут", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/43.png" },
  { "id": "bk-double", "name": "Запечённый ролл «Дабл Чикен»", "desc": "Рис, Сыр творожный, Огурец, Курица 2х, Соус сырный, Соус унаги, Кунжут, Лук зеленый", "price": 77000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/44.png" },
  { "id": "bk-shrimp", "name": "Запечённый ролл с креветками", "desc": "Рис, Сыр творожный, Авокадо, креветки тигровые, Спайси соус, Васаби айоли, Лук зеленый", "price": 75000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/45.png" },
  { "id": "bk-eel-spicy", "name": "Запечённый ролл с угрем в соусе спайси", "desc": "Рис, Сыр творожный, Огурец, Соус ширачи Соус спайси, Угорь, Кунжут, Унаги соус", "price": 72000, "pieces": 0, "cat": ["pishirilgan", "yangi", "achchiq"], "badge": "new", "img": "images/47.png" },
  { "id": "bk-salmon", "name": "Запечённый ролл с лососем", "desc": "Рис, Огурец, Лосось, Сыр творожный, Соус ширачи, Соус спайси, Соус унаги, Кунжут", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/48.png" },
  { "id": "bk-crab", "name": "Запечённый ролл с крабом", "desc": "Рис, Сыр творожный, Огурец, Краб, Соус ширачи, Соус спайси, Кунжут, Соус унаги", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/49.png" },
  { "id": "bk-yamato", "name": "Запечённый ролл Yamato", "desc": "Рис, Сыр творожный, Огурец, Курица, Соус сырный, Соус унаги, Кунжут", "price": 66000, "pieces": 0, "cat": ["pishirilgan"], "badge": "hit", "img": "images/50.png" },
  { "id": "bk-premium", "name": "Премиум, запечённый ролл с креветками", "desc": "Рис, Нори, Сыр творожный, Огурец, Соус ширачи, Лосось, Соус спайси, Лук зеленый, Унаги соус", "price": 85000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/51.png" },
  { "id": "bk-chicken-lux", "name": "Запеченный ролл чикен люкс", "desc": "Рис, Нори, Сыр творожный, Огурец, Курица, Масаго икра, Соус спайси, Лук зеленый, Микс кунжут", "price": 72000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/52.png" },
  { "id": "bk-salmon-roe", "name": "Запеченный ролл с лососем и икрой", "desc": "Рис, Нори, Сыр творожный, Огурец, Лосось, Соус спайси, Соус унаги, Масаго икра", "price": 74000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/53.png" },
  { "id": "bk-double-sesame", "name": "Запечённый ролл (Дабл Чикен) с кунжутом", "desc": "Рис, Нори, Сыр творожный, Огурец, Курица, Соус фирменный, Лук зеленый, Соус Унаги, Микс кунжут", "price": 75000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/54.png" },
  { "id": "bk-mini-chicken", "name": "Мини запечённый ролл с курицей", "desc": "Рис, Нори, Курица, Сыр творожный, Спайси соус, Унаги соус", "price": 50000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/55.png" },
  { "id": "bk-mini-salmon", "name": "Мини запечённый ролл с лососем", "desc": "Рис, Нори, Лосось, Сыр творожный, Спайси соус, Унаги соус", "price": 55000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/56.png" },
  { "id": "set-trio", "name": "Chicken Trio", "desc": "Запеченный ролл с курицей, Запеченный ролл чикен люкс, Жареный сендвич с курицей", "price": 175000, "pieces": 20, "cat": ["setlar"], "badge": "hit", "img": "images/57.png" },
  { "id": "set-deluxe", "name": "Set Deluxe", "desc": "Запеченный ролл (Дабл Чикен) с кунжутом, Жареный ролл с курицей, Филадельфия с креветками", "price": 179000, "pieces": 24, "cat": ["setlar"], "badge": "hit", "img": "images/58.png" },
  { "id": "set-yamato", "name": "Сет “Yamato”", "desc": "Жареный ролл с лососем, Ролл Филадельфия угорь лосось, Запеченный дабл чикен ролл", "price": 205000, "pieces": 30, "cat": ["setlar"], "badge": "hit", "img": "images/59.png" },
  { "id": "set-sushi-mix", "name": "Суши Микс", "desc": "Ролл Филадельфия лайт, Запеченный ролл «Дабл Чикен», Жареный ролл с креветками, Суши запеченный 6шт", "price": 222000, "pieces": 30, "cat": ["setlar"], "img": "images/60.png" },
  { "id": "set-royal", "name": "Royal miks", "desc": "Ролл Филадельфия Угорь и Лосось, Суши с лососем, Запеченный ролл с курицей, Маки с авокадо, Запеченный ролл с лососем", "price": 233000, "pieces": 0, "cat": ["setlar"], "img": "images/61.png" },
  { "id": "set-guest", "name": "Сет “Гостевой”", "desc": "Ролл Филадельфия, Ролл саки маки, Жареный ролл с курицей, Запеченный ролл с курицей", "price": 241000, "pieces": 0, "cat": ["setlar"], "badge": "hit", "img": "images/62.png" },
  { "id": "set-grand", "name": "Grand Set", "desc": "Ролл Филадельфия, Ролл Филадельфия с угрем, Запеченный ролл с угрем в соусе спайси, Ролл калифорния с икрой", "price": 249000, "pieces": 0, "cat": ["setlar", "yangi"], "badge": "new", "img": "images/63.png" },
  { "id": "set-mega", "name": "Мега празник", "desc": "Мини запеченный с курицей, Мини запеченный с лосось, Жареный сендвич с лососем, Сладкий ролл с фруктами, Жареный овощной ролл, Ролл Филадельфия лайт, Вок с курицей, Вок с креветками, кола 1л", "price": 444000, "pieces": 0, "cat": ["setlar", "yangi"], "badge": "new", "img": "images/64.png" },
  { "id": "fanta-glass", "name": "Фанта 0,25 (стекло)", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/65.png" },
  { "id": "cola-glass", "name": "Кола 0,25 (стекло)", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/66.png" },
  { "id": "cola-05", "name": "Кола 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/67.png" },
  { "id": "fanta-05", "name": "Фанта 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/68.png" },
  { "id": "sprite-05", "name": "Спрайт 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/69.png" },
  { "id": "mojito", "name": "Мохито 0,45", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/70.png" },
  { "id": "sochnaya", "name": "Сочная долина (яблоко) 0,45", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/71.png" },
  { "id": "fusetea", "name": "Фьюзти 0,5", "desc": "", "price": 8000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/72.png" },
  { "id": "sprite-can", "name": "Спрайт 0,25 (банка)", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/75.png" },
  { "id": "energy18", "name": "18+ 0,45", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/76.png" },
  { "id": "adrenaline-025", "name": "Адреналин 0,25", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/77.png" },
  { "id": "adrenaline-045", "name": "Адреналин 0,45", "desc": "", "price": 18000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/78.png" },
  { "id": "hydrolife", "name": "Гидролайф 0,5", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/79.png" },
  { "id": "cola-1", "name": "Кола 1л", "desc": "", "price": 15000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/80.png" },
  { "id": "cola-15", "name": "Кола 1,5л", "desc": "", "price": 20000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/81.png" },
  { "id": "tarxun-choy-065", "name": "Тархун чой", "desc": "0.65 л", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "tarxun-choy-08", "name": "Тархун чой", "desc": "0.8 л", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "gul-choy-065", "name": "Гул чой", "desc": "0.65 л", "price": 20000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "gul-choy-08", "name": "Гул чой", "desc": "0.8 л", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "dragon-choy-065", "name": "Драгон чой", "desc": "0.65 л", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "dragon-choy-08", "name": "Драгон чой", "desc": "0.8 л", "price": 40000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "flecha-choy-065", "name": "Флеча кардамон", "desc": "0.65 л", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "flecha-choy-08", "name": "Флеча кардамон", "desc": "0.8 л", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "imperator-choy-065", "name": "Император малина", "desc": "0.65 л", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "imperator-choy-08", "name": "Император малина", "desc": "0.8 л", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "molochniy-choy-065", "name": "Молочный улун", "desc": "0.65 л", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "molochniy-choy-08", "name": "Молочный улун", "desc": "0.8 л", "price": 40000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "yaprok-choy-065", "name": "Япрок чой", "desc": "0.65 л", "price": 20000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "yaprok-choy-08", "name": "Япрок чой", "desc": "0.8 л", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "alpen-gold-1", "name": "Alpen Gold Фундук и Изюм", "desc": "Молочный шоколад с фундуком и изюмом", "price": 15000, "pieces": 0, "cat": ["shirinliklar", "yangi"], "badge": "new", "img": "images/alpengold1.png" },
  { "id": "alpen-gold-2", "name": "Alpen Gold Фундук", "desc": "Молочный шоколад с цельным фундуком", "price": 15000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/alpengold2.png" },
  { "id": "alpen-gold-3", "name": "Alpen Gold Молочный", "desc": "Классический молочный шоколад", "price": 15000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/alpengold3.png" },
  { "id": "alpen-gold-4567", "name": "Alpen Gold Соленый арахис", "desc": "Молочный шоколад с соленым арахисом и крекером", "price": 15000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/alpengold4567.png" },
  { "id": "alpen-gold-max", "name": "Alpen Gold Max Fun", "desc": "Взрывная карамель, мармелад, печенье", "price": 30000, "pieces": 0, "cat": ["shirinliklar", "yangi"], "badge": "new", "img": "images/alpengoldmax.png" },
  { "id": "alpen-gold-oq", "name": "Alpen Gold Миндаль и Кокос", "desc": "Белый шоколад с миндалем и кокосом", "price": 15000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/alpengoldoq.png" },
  { "id": "bounty-1", "name": "Bounty Trio", "desc": "Кокосовая начинка в молочном шоколаде", "price": 16000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/bountiy1.png" },
  { "id": "bounty-2", "name": "Bounty", "desc": "Кокосовая начинка в молочном шоколаде", "price": 10000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/bounty2.png" },
  { "id": "karak-tea", "name": "GOAL Karak Tea", "desc": "Инстант чай с молоком (1 шт)", "price": 5000, "pieces": 0, "cat": ["choy"], "img": "images/karaktea.png" },
  { "id": "maccoffee", "name": "MacCoffee 3 in 1", "desc": "Кофейный напиток (1 шт)", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/maccoffe.png" },
  { "id": "milka-1", "name": "Milka Alpine Milk", "desc": "Молочный шоколад", "price": 20000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/milka1.png" },
  { "id": "nestle-1", "name": "Nestle Almond & Raisin", "desc": "Молочный шоколад с миндалем и изюмом", "price": 16000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/nestle1.png" },
    { "id": "nestle-1", "name": "Nestle Almond & Raisin", "desc": "«Шоколадные пузырьки» молочный и белый шоколад", "price": 16000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/nestle3.png" },
        { "id": "nestle-1", "name": "Nestle Almond & Raisin", "desc": "Nestle Молочный", "price": 16000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/nestle2.png" },
  { "id": "snickers-1", "name": "Snickers", "desc": "Нуга, карамель, арахис", "price": 10000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/snickers1.png" },
  { "id": "snickers-2", "name": "Snickers Super", "desc": "Большой батончик с арахисом", "price": 15000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/snickers2.png" },
  { "id": "twix-1", "name": "Twix Xtra", "desc": "Печенье, карамель, шоколад", "price": 16000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/twix1.png" },
  { "id": "twix-2", "name": "Twix", "desc": "Печенье, карамель, шоколад", "price": 10000, "pieces": 0, "cat": ["shirinliklar"], "img": "images/twix2.png" }
];

/* =========================================================
   YORDAMCHI
   ========================================================= */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const fmt = n => new Intl.NumberFormat('uz-UZ').format(Math.round(n)) + ' UZS';
const getP = id => PRODUCTS.find(p => p.id === id);

/* =========================================================
   HOLAT
   ========================================================= */
let CART = JSON.parse(localStorage.getItem('ym_cart') || '{}');
let ACTIVE_FILTER = 'all';
let PRODUCTS = []; 

const saveCart = () => localStorage.setItem('ym_cart', JSON.stringify(CART));
const cartCount = () => Object.values(CART).reduce((a, b) => a + b, 0);
const cartSubtotal = () => Object.entries(CART).reduce((s, [id, q]) => {
  const p = getP(id);
  return s + (p ? p.price * q : 0);
}, 0);
const cartDelivery = () => 0; // Yetkazib berish bepul yoki umuman yo'q

/* =========================================================
   KARTALAR
   ========================================================= */
function cardHTML(p) {
  const badge = p.badge === 'hit' ? '<span class="badge hit">Xit</span>' :
    p.badge === 'new' ? '<span class="badge new">Yangi</span>' :
      p.badge === 'top' ? '<span class="badge top">Top</span>' : '';
  const pieces = p.pieces ? `${p.pieces} dona` : '';
  
  const pDesc = p.desc || p.description || p.tavsif;
  const safeDesc = (pDesc && pDesc !== 'undefined') ? pDesc : '';

  return `
    <div class="p-card" data-id="${p.id}">
      <div class="p-media" onclick="openProduct('${p.id}')">
        <div class="p-badges">${badge}</div>
        <button class="fav" onclick="toggleFav(event,'${p.id}')" aria-label="Sevimli">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.9Z"/></svg>
        </button>
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/placeholder.webp'">
      </div>
      <div class="p-body">
        <div class="p-name" onclick="openProduct('${p.id}')">${p.name}</div>
        <div class="p-desc">${safeDesc}</div>
        ${pieces ? `<div class="p-meta">${pieces}</div>` : ''}
        <div class="p-foot">
          <div class="p-price">${fmt(p.price)}</div>
          <button class="p-add" onclick="addToCart('${p.id}',1,event)" aria-label="Qo'shish">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </div>`;
}

function renderBest() {
  const el = $('#bestCarousel');
  if (!el) return;
  el.innerHTML = PRODUCTS.filter(p => p.badge === 'hit' || p.badge === 'new')
    .slice(0, 10).map(cardHTML).join('');
}

function renderSets() {
  const el = $('#setsGrid');
  if (!el) return;
  el.innerHTML = PRODUCTS.filter(p => p.cat.includes('setlar')).map(p => `
    <div class="set-card" onclick="openProduct('${p.id}')">
      <div class="set-bg"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='images/placeholder.webp'"></div>
      <div class="set-info">
        <h3>${p.name}</h3>
        <div class="p-meta">${p.pieces ? p.pieces + ' dona' : ''}</div>
        <div class="row"><span class="price">${fmt(p.price)}</span><span class="plus">+</span></div>
      </div>
    </div>`).join('');
}

function renderMenu() {
  const el = $('#menuGrid');
  if (!el) return;
  const list = ACTIVE_FILTER === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat.includes(ACTIVE_FILTER));
  el.innerHTML = list.map(cardHTML).join('');
}

const REVIEWS = [
  { name: 'Dilnoza R.', text: 'Urganchdagi eng mazali sushi! Filadelfiya juda yangi va mazali. Yetkazib berish ham tez.', stars: 5 },
  { name: 'Aziz K.', text: "To'yimizga buyurtma qildik. Mehmonlar juda mamnun bo'ldi. Xizmat a'lo darajada!", stars: 5 },
  { name: 'Kamola M.', text: 'Har hafta buyurtma qilamiz. Sifat doim bir xil yuqori. Setlar juda foydali.', stars: 5 },
  { name: 'Jasur T.', text: 'Wok va Poke juda yoqdi. Achchiq rollar ajoyib. Narxlar ham munosib.', stars: 4 },
  { name: 'Nilufar S.', text: 'Qadoqlash juda chiroyli, suratga olishga arziydi. Taomlar issiq yetib keladi.', stars: 5 },
  { name: 'Otabek N.', text: 'Telegram bot orqali buyurtma qildim, juda qulay. 30 daqiqada yetkazib berishdi.', stars: 5 }
];

function renderReviews() {
  const el = $('#reviewsGrid');
  if (!el) return;
  el.innerHTML = REVIEWS.map(r => `
    <div class="review">
      <div class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p>${r.text}</p>
      <div class="who">
        <div class="av">${r.name[0]}</div>
        <div><b>${r.name}</b><small>Urganch</small></div>
      </div>
    </div>`).join('');
}

/* =========================================================
   SAVAT
   ========================================================= */
function addToCart(id, qty = 1, event) {
  if (event) event.stopPropagation();
  CART[id] = (CART[id] || 0) + qty;
  saveCart();
  updateCartUI();
  toast(`${getP(id).name} savatga qo'shildi`);
  if (event) {
    const card = event.target.closest('.p-card');
    if (card) {
      card.classList.add('added');
      setTimeout(() => card.classList.remove('added'), 600);
    }
  }
}

function setQty(id, qty) {
  if (qty <= 0) delete CART[id];
  else CART[id] = qty;
  saveCart();
  updateCartUI();
  renderCart();
}

function updateCartUI() {
  const n = cartCount();
  const cc = $('#cartCount'), mc = $('#mCartCount');
  if (cc) { cc.textContent = n; cc.classList.toggle('show', n > 0); }
  if (mc) { mc.textContent = n; mc.classList.toggle('show', n > 0); }

  const sticky = $('#stickyCart');
  if (sticky) {
    const total = cartSubtotal() + cartDelivery();
    sticky.classList.toggle('show', n > 0);
    const st = $('#stickyTotal');
    if (st) st.textContent = fmt(total);
  }

  const ckT = $('#ckTotal');
  const total = cartSubtotal() + cartDelivery();
  if (ckT) ckT.textContent = fmt(total);
}

function renderCart() {
  const body = $('#cartBody');
  const foot = $('#cartFoot');
  if (!body || !foot) return;

  const items = Object.entries(CART).filter(([id]) => getP(id));
  if (!items.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Savat bo'sh</p>
        <button class="btn btn-red" onclick="closeCart();scrollToId('menu')">Menyuga o'tish →</button>
      </div>`;
    foot.style.display = 'none';
    return;
  }

  body.innerHTML = items.map(([id, q]) => {
    const p = getP(id);
    return `
      <div class="cart-item">
        <div class="ci-img"><img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.webp'"></div>
        <div class="info">
          <div class="name">${p.name}</div>
          <div class="piece">${p.pieces ? p.pieces + ' dona · ' : ''}${fmt(p.price)}</div>
          <div class="bottom">
            <div class="qty">
              <button onclick="setQty('${id}',${q - 1})">−</button>
              <span>${q}</span>
              <button onclick="setQty('${id}',${q + 1})">+</button>
            </div>
            <div class="price">${fmt(p.price * q)}</div>
          </div>
          <span class="remove" onclick="setQty('${id}',0)">O'chirish</span>
        </div>
      </div>`;
  }).join('');

  const sub = cartSubtotal(), del = cartDelivery();
  $('#sumItems').textContent = fmt(sub);
  $('#sumDelivery').textContent = del === 0 ? 'Bepul' : fmt(del);
  $('#sumTotal').textContent = fmt(sub + del);
  foot.style.display = 'block';
}

/* =========================================================
   DRAWER & OVERLAY
   ========================================================= */
function openCart() {
  renderCart();
  $('#cartDrawer').classList.add('show');
  $('#overlay').classList.add('show');
  document.body.classList.add('locked');
}
function closeCart() {
  $('#cartDrawer').classList.remove('show');
  $('#overlay').classList.remove('show');
  document.body.classList.remove('locked');
}
function closeAll() {
  closeCart();
  $$('.modal').forEach(m => m.classList.remove('show'));
  document.body.classList.remove('locked');
}

/* =========================================================
   MAHSULOT MODAL
   ========================================================= */
function openProduct(id) {
  const p = getP(id);
  if (!p) return;

  const pDesc = p.desc || p.description || p.tavsif;
  const safeDesc = (pDesc && pDesc !== 'undefined') ? pDesc : 'Yangi tayyorlangan, mazali taom.';

  const body = $('#productModalBody');
  body.innerHTML = `
    <div class="pd">
      <div class="pd-media"><img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.webp'"></div>
      <div class="pd-info">
        <div class="rating">
          <span class="stars">★★★★★</span>
          <b>4.9</b><span>· 120+ sharh</span>
        </div>
        <h2>${p.name}</h2>
        <p class="desc">${safeDesc}</p>
        <div class="pd-specs">
          ${p.pieces ? `<div><small>Miqdor</small><b>${p.pieces} dona</b></div>` : ''}
          <div><small>Kategoriya</small><b>${p.cat.map(c => c[0].toUpperCase() + c.slice(1)).join(', ')}</b></div>
          <div><small>Tayyorlash</small><b>10–15 daqiqa</b></div>
        </div>
        <div class="pd-foot">
          <div class="qty">
            <button onclick="pdQty(-1)">−</button>
            <span id="pdQtyVal">1</span>
            <button onclick="pdQty(1)">+</button>
          </div>
          <button class="btn btn-red btn-lg" onclick="pdAdd('${p.id}')">Savatga qo'shish · ${fmt(p.price)}</button>
        </div>
      </div>
    </div>`;
  window._pdQty = 1;
  openModal('productModal');
}

function pdQty(d) {
  window._pdQty = Math.max(1, window._pdQty + d);
  const v = $('#pdQtyVal');
  if (v) v.textContent = window._pdQty;
}
function pdAdd(id) {
  addToCart(id, window._pdQty);
  closeModal('productModal');
}

/* =========================================================
   MODAL BOSHQARUV
   ========================================================= */
function openModal(id) {
  const m = $('#' + id);
  if (!m) return;
  m.classList.add('show');
  $('#overlay').classList.add('show');
  document.body.classList.add('locked');
}
function closeModal(id) {
  const m = $('#' + id);
  if (!m) return;
  m.classList.remove('show');
  if (!$('.drawer.show') && !$('.modal.show')) {
    $('#overlay').classList.remove('show');
    document.body.classList.remove('locked');
  }
}

/* =========================================================
   QIDIRISH
   ========================================================= */
function openSearch() {
  openModal('searchModal');
  setTimeout(() => $('#searchInput')?.focus(), 200);
}
function runSearch(q) {
  const body = $('#searchBody');
  if (!body) return;
  q = q.trim().toLowerCase();
  if (!q) {
    body.innerHTML = `
      <h5>Mashhur qidiruvlar</h5>
      <div class="search-tags">
        ${['Filadelfiya', 'Set', 'Wok', 'Poke', 'Maki', 'Choy', 'Shokolad'].map(t => `<div class="search-tag" onclick="runSearch('${t}')">${t}</div>`).join('')}
      </div>`;
    return;
  }
  const res = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || (p.desc || '').toLowerCase().includes(q));
  if (!res.length) {
    body.innerHTML = '<p style="text-align:center;padding:40px 0;color:var(--muted)">Hech narsa topilmadi</p>';
    return;
  }
  body.innerHTML = res.map(p => `
    <div class="search-result" onclick="closeModal('searchModal');openProduct('${p.id}')">
      <div class="sr-img"><img src="${p.img}" alt="${p.name}" onerror="this.src='images/placeholder.webp'"></div>
      <div class="sr-info"><b>${p.name}</b><small>${(p.desc && p.desc !== 'undefined') ? p.desc : ''}</small></div>
      <div class="sr-price">${fmt(p.price)}</div>
    </div>`).join('');
}

/* =========================================================
   CHECKOUT
   ========================================================= */
let CHECKOUT = { time: 'now', pay: 'cash' };

function openCheckout() {
  if (!cartCount()) { toast('Savat bo\'sh'); return; }
  closeCart();
  updateCartUI();
  openModal('checkoutModal');
}

function selectTime(el, type) {
  $$('.time-opt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  CHECKOUT.time = type;
  
  const picker = document.getElementById('timePickerField');
  if (type === 'later') {
    picker.style.display = 'block';
  } else {
    picker.style.display = 'none';
  }
}

function selectPay(el, type) {
  $$('.pay-opt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  CHECKOUT.pay = el.dataset.pay;

  const receiptField = document.getElementById('receiptField');
  if (type === 'online') {
    receiptField.style.display = 'block'; 
  } else {
    receiptField.style.display = 'none';  
  }
}

function maskPhone(inp) {
  let v = inp.value.replace(/\D/g, '');
  if (v.startsWith('998')) v = v.slice(3);
  if (v.length > 9) v = v.slice(0, 9);
  let out = '+998';
  if (v.length) out += ' ' + v.slice(0, 2);
  if (v.length > 2) out += ' ' + v.slice(2, 5);
  if (v.length > 5) out += '-' + v.slice(5, 7);
  if (v.length > 7) out += '-' + v.slice(7, 9);
  inp.value = out;
}

async function placeOrder() {
  const name = $('#ckName').value.trim();
  const phone = $('#ckPhone').value.trim();
  const city = $('#ckCity').value; 
  const house = $('#ckHouse').value.trim();
  const addr = $('#ckAddr').value.trim();
  const landmark = $('#ckLandmark').value.trim();
  const receiptInput = document.getElementById('ckReceipt');
  const timeVal = document.getElementById('ckTime') ? document.getElementById('ckTime').value : '';

  if (!name || phone.replace(/\D/g, '').length < 12) {
    toast('Ism va telefon raqamini to\'ldiring');
    return;
  }
  if (!addr) { toast('Ko\'cha nomini kiriting'); return; }
  
  if (!landmark) { 
    toast('Iltimos, mo\'ljalni to\'liq kiriting (majburiy)'); 
    return; 
  }

  if (CHECKOUT.time === 'later' && !timeVal) {
    toast('Iltimos, yetkazib berish vaqtini tanlang!');
    return;
  }

  let receiptBase64 = '';
  if (CHECKOUT.pay !== 'cash') {
    if (!receiptInput.files[0]) {
      toast('Iltimos, to\'lov chekini (skrinshotni) yuklang!');
      return;
    }
    const file = receiptInput.files[0];
    receiptBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  const items = Object.entries(CART).map(([id, q]) => {
    const p = getP(id);
    return { id, name: p.name, price: p.price, qty: q, sum: p.price * q };
  });
  const subtotal = cartSubtotal();
  const delivery = cartDelivery();
  const total = subtotal + delivery;

  const payload = {
    name, phone, 
    district: city, 
    addr, house, landmark,
    time: CHECKOUT.time,
    time_value: timeVal, // Tanlangan soat
    pay: CHECKOUT.pay,
    receipt: receiptBase64, 
    items, subtotal, delivery, total
  };

   let orderNum = '#YM-' + Date.now().toString().slice(-6);

  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    
    if (data.success && data.orderNum) {
      orderNum = data.orderNum; // Backenddan kelgan haqiqiy order raqamni olamiz
    } else {
      toast('Buyurtma yuborilmadi: ' + (data.error || ''));
      return;
    }
  } catch (e) {
    console.warn('Buyurtma yuborishda xatolik:', e);
    toast('Server bilan aloqa yo\'q');
    return;
  }

  // Savatni tozalash
  CART = {};
  localStorage.removeItem('ym_cart');
  updateCartUI();
  renderCart();
  closeModal('checkoutModal');

  // Tracking oynasini ochish (orderNum orqali)
  openTracking(orderNum, CHECKOUT.pay);

}

/* =========================================================
   TRACKING
   ========================================================= */
function openTracking(orderNum, payType) {
  const head = document.getElementById('trackHead');
  const body = document.getElementById('trackBody');
  if (!head || !body) return;

  const isCash = payType === 'cash';

  if (isCash) {
    head.innerHTML = '';
    head.style.display = 'none';
    body.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:48px 24px 56px;">' +
        '<div style="width:120px;height:120px;border-radius:50%;background:#2FBF71;display:grid;place-items:center;box-shadow:0 12px 32px rgba(47,191,113,.35);margin-bottom:28px;animation:popIn .5s cubic-bezier(.34,1.56,.64,1);">' +
          '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="m5 12 5 5L20 7"/>' +
          '</svg>' +
        '</div>' +
        '<div style="font-size:1.4rem;font-weight:800;color:#0E0E10;margin-bottom:8px;">Buyurtma qabul qilindi</div>' +
        '<div style="font-size:.92rem;color:#8a8a92;">Tez orada siz bilan bog\'lanamiz</div>' +
      '</div>' +
      '<style>@keyframes popIn{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}</style>';
  } else {
    head.style.display = '';
    head.innerHTML =
      '<h3>BUYURTMA QABUL QILINDI</h3>' +
      '<div class="eta">To\'lov cheki tekshirilmoqda</div>' +
      '<div class="order-num">' + orderNum + '</div>';
    body.innerHTML =
      '<div style="text-align:center;padding:8px 4px 20px">' +
        '<div style="font-size:1.15rem;font-weight:800;line-height:1.4;margin-bottom:10px">To\'lov qabul qilindi</div>' +
        '<p style="color:var(--muted);font-size:.9rem;line-height:1.6;margin-bottom:22px">' +
          "Buyurtmangiz tayyorlanmoqda. Operatorimiz chekni tasdiqlash uchun siz bilan bog'lanadi." +
        '</p>' +
      '</div>';
  }

  openModal('trackModal');
}

/* =========================================================
   TOAST
   ========================================================= */
function toast(msg) {
  const wrap = $('#toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="t-ico"><svg viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg></div>${msg}`;
  wrap.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2600);
}

/* =========================================================
   SCROLL & REVEAL
   ========================================================= */
function scrollTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToId(id) {
  const el = $('#' + id);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
}

function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));
}

function initHeader() {
  const h = $('#header');
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* =========================================================
   FILTRLAR
   ========================================================= */
function initFilters() {
  $$('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      ACTIVE_FILTER = chip.dataset.cat;
      scrollToId('menu');
      $$('.filter-chip').forEach(f => f.classList.toggle('active', f.dataset.filter === ACTIVE_FILTER));
      renderMenu();
    });
  });
  $$('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      ACTIVE_FILTER = chip.dataset.filter;
      renderMenu();
    });
  });
}

/* =========================================================
   TOGGLE FAV (placeholder)
   ========================================================= */
function toggleFav(e, id) {
  if (e) e.stopPropagation();
  e.target.closest('.fav')?.classList.toggle('active');
}

/* =========================================================
   ISHGA TUSHIRISH
   ========================================================= */
document.addEventListener('DOMContentLoaded', async () => {
  PRODUCTS = [...DEFAULT_PRODUCTS]; 

  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    
    if (data.success && data.products && data.products.length > 0) {
      data.products.forEach(newP => {
        const idx = PRODUCTS.findIndex(p => p.id === newP.id);
        if (idx !== -1) {
          PRODUCTS[idx] = { ...PRODUCTS[idx], ...newP }; 
        } else {
          PRODUCTS.push(newP); 
        }
      });
    }
  } catch (e) {
    console.log("Bazadan yuklashda xato, zaxira ro'yxat ishlatilmoqda:", e);
  }

  renderBest();
  renderSets();
  renderMenu();
  renderReviews();
  renderCart();
  updateCartUI();
  initReveal();
  initHeader();
  initFilters();

  const si = $('#searchInput');
  if (si) si.addEventListener('input', e => runSearch(e.target.value));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
});


