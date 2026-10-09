/* =========================================================
   API SOZLAMALARI
   ========================================================= */
const API_URL = '/api';

/* =========================================================
   MAHSULOTLAR
   ========================================================= */
const PRODUCTS = [
  { "id": "philadelphia", "name": "Filadelfiya roll", "desc": "Guruch, krem-pishloq, bodring, losos", "price": 75000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/1.png" },
  { "id": "phil-eel", "name": "Filadelfiya roll ugor bilan", "desc": "Guruch, krem-pishloq, bodring, avokado, ugor, kunjut", "price": 76000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/2.png" },
  { "id": "avocado-roll", "name": "Avokadoli roll", "desc": "Guruch, krem-pishloq, losos, avokado", "price": 65000, "pieces": 0, "cat": ["klassik"], "img": "images/3.png" },
  { "id": "phil-eel-salmon", "name": "Filadelfiya ugor va losos", "desc": "Guruch, krem-pishloq, avokado, masago ikra, losos, ugor, unagi sousi, kunjut", "price": 75000, "pieces": 0, "cat": ["klassik"], "img": "images/4.png" },
  { "id": "caesar", "name": "Sezar roll", "desc": "Guruch, aysberg salat, pomidor, krem-pishloq, tovuq, Sezar sousi, parmezan pishlog'i", "price": 68000, "pieces": 0, "cat": ["klassik"], "badge": "hit", "img": "images/5.png" },
  { "id": "veggie", "name": "Vegetarian roll", "desc": "Guruch, bolgar qalampiri, bodring, avokado, aysberg salat, shirin chili sous", "price": 60000, "pieces": 0, "cat": ["klassik", "vegetarian"], "img": "images/6.png" },
  { "id": "phil-shrimp", "name": "Filadelfiya krevetkali", "desc": "Guruch, nori, krem-pishloq, avokado, losos, krevetka, unagi sousi, firmenniy sous, ko'k piyoz", "price": 78000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/7.png" },
  { "id": "cal-sesame", "name": "Kaliforniya roll kunjutli", "desc": "Guruch, nori, mayonez, krab, bodring, avokado, oq kunjut", "price": 65000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/8.png" },
  { "id": "cal-roe", "name": "Kaliforniya roll ikrali", "desc": "Guruch, nori, mayonez, krab, bodring, avokado, masago ikra", "price": 68000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/9.png" },
  { "id": "ebi-lux", "name": "Ebi lyuks roll", "desc": "Guruch, nori, masago ikra, avokado, krevetka, unagi sousi, krem-pishloq", "price": 68000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/10.png" },
  { "id": "chukka-salmon", "name": "Chukka va losos rolli", "desc": "Guruch, nori, losos, bodring, chukka salat, yong'oqli sous, krem-pishloq, masago ikra", "price": 73000, "pieces": 0, "cat": ["klassik", "yangi"], "badge": "new", "img": "images/11.png" },
  { "id": "phil-light", "name": "Filadelfiya layt", "desc": "Guruch, krem-pishloq, bodring, losos", "price": 65000, "pieces": 0, "cat": ["klassik"], "img": "images/12.png" },
  { "id": "maki-cucumber", "name": "Maki bodringli", "desc": "Guruch, bodring", "price": 35000, "pieces": 0, "cat": ["maki", "vegetarian"], "img": "images/13.png" },
  { "id": "maki-eel", "name": "Maki ugorli", "desc": "Guruch, ugor", "price": 50000, "pieces": 0, "cat": ["maki"], "img": "images/14.png" },
  { "id": "maki-salmon", "name": "Maki losos bilan", "desc": "Guruch, losos", "price": 50000, "pieces": 0, "cat": ["maki"], "img": "images/15.png" },
  { "id": "maki-avocado", "name": "Maki avokadoli", "desc": "Guruch, avokado", "price": 35000, "pieces": 0, "cat": ["maki", "vegetarian"], "img": "images/16.png" },
  { "id": "sushi-salmon", "name": "Sushi losos bilan", "desc": "Guruch, losos", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/17.png" },
  { "id": "sushi-baked", "name": "Sushi pishirilgan", "desc": "Ugor, losos, tovuq yoki krevetka bilan", "price": 36000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/18.png" },
  { "id": "sushi-eel", "name": "Sushi ugor bilan", "desc": "Guruch, ugor", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/19.png" },
  { "id": "sushi-shrimp", "name": "Sushi krevetkali", "desc": "Guruch, krevetka", "price": 69000, "pieces": 3, "cat": ["maki", "yangi"], "badge": "new", "img": "images/20.png" },
  { "id": "sweet-roll", "name": "Shirin roll mevalar bilan", "desc": "Spring xamir, shirin pishloq, kivi, shaftoli, ananas, malina siropi", "price": 56000, "pieces": 0, "cat": ["maki", "yangi", "vegetarian"], "badge": "new", "img": "images/21.png" },
  { "id": "burnt-salmon", "name": "Kuydirilgan roll losos bilan", "desc": "Guruch, krem-pishloq, bodring, avokado, losos, unagi sousi", "price": 76000, "pieces": 0, "cat": ["opalyon"], "img": "images/22.png" },
  { "id": "sake-avocado", "name": "Sake-Avokado roll", "desc": "Guruch, nori, krem-pishloq, avokado, losos, firmenniy sous, ko'k piyoz", "price": 68000, "pieces": 0, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/23.png" },
  { "id": "ebi-avocado", "name": "Ebi-Avokado roll", "desc": "Guruch, nori, krem-pishloq, avokado, ebi krevetka, masago ikra, unagi sousi, firmenniy sous, ko'k piyoz", "price": 70000, "pieces": 0, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/24.png" },
  { "id": "burnt-sushi", "name": "Kuydirilgan sushi losos bilan", "desc": "Guruch, losos", "price": 69000, "pieces": 3, "cat": ["opalyon", "yangi"], "badge": "new", "img": "images/25.png" },
  { "id": "spicy-eel", "name": "Spaysi ugor roll", "desc": "Guruch, nori, bodring, krem-pishloq, shirachi sous, ugor, spaysi sous, unagi sousi, kunjut", "price": 73000, "pieces": 0, "cat": ["opalyon", "yangi", "achchiq"], "badge": "new", "img": "images/26.png" },
  { "id": "fried-crab", "name": "Qovurilgan roll krab bilan", "desc": "Guruch, krem-pishloq, bodring, qovurilgan losos, krab aralashmasi, masago ikra, shirachi sous", "price": 74000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/27.png" },
  { "id": "sand-chicken", "name": "Qovurilgan sendvich tovuq bilan", "desc": "Guruch, nori, bodring, Cheddar pishlog'i, pomidor, tovuq, firmenniy sous, aysberg, klyar, suxarik, unagi sousi, kunjut miks", "price": 69000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/28.png" },
  { "id": "fried-shrimp", "name": "Qovurilgan roll krevetkali", "desc": "Guruch, krem-pishloq, bodring, yo'lbars krevetka, yong'oqli sous, araxis", "price": 73000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/29.png" },
  { "id": "fried-chicken", "name": "Qovurilgan roll tovuq bilan", "desc": "Guruch, krem-pishloq, aysberg salat, tovuq, pomidor, Sezar sousi, parmezan pishlog'i", "price": 70000, "pieces": 0, "cat": ["qovurilgan"], "img": "images/30.png" },
  { "id": "sand-shrimp", "name": "Qovurilgan sendvich krevetkali", "desc": "Guruch, nori, bodring, Cheddar pishlog'i, pomidor, krevetka, firmenniy sous, aysberg, klyar, suxarik, unagi sousi, kunjut miks", "price": 73000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/31.png" },
  { "id": "sand-crab", "name": "Qovurilgan sendvich krab bilan", "desc": "Guruch, nori, bodring, Cheddar pishlog'i, pomidor, krab, firmenniy sous, aysberg, klyar, suxarik, unagi sousi, kunjut miks", "price": 68000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/32.png" },
  { "id": "sand-salmon", "name": "Qovurilgan sendvich losos bilan", "desc": "Guruch, nori, bodring, Cheddar pishlog'i, pomidor, losos, firmenniy sous, aysberg, klyar, suxarik, unagi sousi, kunjut miks", "price": 70000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/33.png" },
  { "id": "fried-veg", "name": "Qovurilgan sabzavotli roll", "desc": "Guruch, nori, aysberg, bodring, bolgar qalampiri, chukka salat, avokado, unagi sousi", "price": 65000, "pieces": 0, "cat": ["qovurilgan", "yangi", "vegetarian"], "badge": "new", "img": "images/34.png" },
  { "id": "shrimp-tempura", "name": "Tempura krevetkalar", "desc": "Yo'lbars krevetka, tuz, murch, suxarik, klyar, unagi sousi, kunjut, firmenniy sous", "price": 72000, "pieces": 0, "cat": ["qovurilgan", "yangi"], "badge": "new", "img": "images/35.png" },
  { "id": "wok-chicken", "name": "Wok tovuq bilan", "desc": "Udon lapsha, tovuq, qovoqcha, sabzi, bolgar qalampiri, teriyaki sous, ko'k piyoz, kunjut", "price": 66000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/36.png" },
  { "id": "wok-shrimp", "name": "Wok krevetkali", "desc": "Udon lapsha, krevetka, qovoqcha, sabzi, bolgar qalampiri, teriyaki sous, ko'k piyoz, kunjut", "price": 72000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/37.png" },
  { "id": "wok-veg", "name": "Wok sabzavotli", "desc": "Udon lapsha, qovoqcha, sabzi, bolgar qalampiri, baqlajon, teriyaki sous, ko'k piyoz, kunjut", "price": 60000, "pieces": 0, "cat": ["wok", "yangi", "vegetarian"], "badge": "new", "img": "images/38.png" },
  { "id": "poke-shrimp", "name": "Poke krevetkali", "desc": "Guruch, avokado, bodring, pomidor, krevetka, nori snek, firmenniy sous, chukka salat, kunjut miks", "price": 79000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/39.png" },
  { "id": "poke-salmon", "name": "Poke losos bilan", "desc": "Guruch, avokado, bodring, pomidor, losos, nori snek, firmenniy sous, chukka salat, kunjut miks", "price": 72000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/40.png" },
  { "id": "poke-chicken", "name": "Poke tovuq bilan", "desc": "Guruch, avokado, bodring, pomidor, tovuq, nori snek, firmenniy sous, chukka salat, kunjut miks", "price": 65000, "pieces": 0, "cat": ["wok", "yangi"], "badge": "new", "img": "images/41.png" },
  { "id": "bk-chicken", "name": "Pishirilgan roll tovuq bilan", "desc": "Guruch, krem-pishloq, bodring, aysberg, tovuq, pishloqli sous, unagi sousi, kunjut", "price": 66000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/42.png" },
  { "id": "bk-chicken-spicy", "name": "Pishirilgan roll tovuq bilan (achchiq)", "desc": "Guruch, krem-pishloq, bodring, tovuq, spaysi sous, unagi sousi, kunjut", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/43.png" },
  { "id": "bk-double", "name": "Pishirilgan roll \"Dabl Chiken\"", "desc": "Guruch, krem-pishloq, bodring, tovuq 2x, pishloqli sous, unagi sousi, kunjut, ko'k piyoz", "price": 77000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/44.png" },
  { "id": "bk-shrimp", "name": "Pishirilgan roll krevetkali", "desc": "Guruch, krem-pishloq, avokado, yo'lbars krevetka, spaysi sous, ko'k piyoz", "price": 75000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/45.png" },
  { "id": "bk-eel-spicy", "name": "Pishirilgan roll ugor spaysi sousida", "desc": "Guruch, krem-pishloq, bodring, shirachi sous, spaysi sous, ugor, kunjut, unagi sousi", "price": 72000, "pieces": 0, "cat": ["pishirilgan", "yangi", "achchiq"], "badge": "new", "img": "images/47.png" },
  { "id": "bk-salmon", "name": "Pishirilgan roll losos bilan", "desc": "Guruch, bodring, losos, krem-pishloq, shirachi sous, spaysi sous, unagi sousi, kunjut", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/48.png" },
  { "id": "bk-crab", "name": "Pishirilgan roll krab bilan", "desc": "Guruch, krem-pishloq, bodring, krab, shirachi sous, spaysi sous, kunjut, unagi sousi", "price": 70000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/49.png" },
  { "id": "bk-yamato", "name": "Pishirilgan roll Yamato", "desc": "Guruch, krem-pishloq, bodring, tovuq, pishloqli sous, unagi sousi, kunjut", "price": 66000, "pieces": 0, "cat": ["pishirilgan"], "badge": "hit", "img": "images/50.png" },
  { "id": "bk-premium", "name": "Premium pishirilgan roll krevetkali", "desc": "Guruch, nori, krem-pishloq, bodring, shirachi sous, losos, spaysi sous, ko'k piyoz, unagi sousi", "price": 85000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/51.png" },
  { "id": "bk-chicken-lux", "name": "Pishirilgan roll chiken lyuks", "desc": "Guruch, nori, krem-pishloq, bodring, tovuq, masago ikra, spaysi sous, ko'k piyoz, kunjut miks", "price": 72000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/52.png" },
  { "id": "bk-salmon-roe", "name": "Pishirilgan roll losos va ikrali", "desc": "Guruch, nori, krem-pishloq, bodring, losos, spaysi sous, unagi sousi, masago ikra", "price": 74000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/53.png" },
  { "id": "bk-double-sesame", "name": "Pishirilgan roll (Dabl Chiken) kunjutli", "desc": "Guruch, nori, krem-pishloq, bodring, tovuq, firmenniy sous, ko'k piyoz, unagi sousi, kunjut miks", "price": 75000, "pieces": 0, "cat": ["pishirilgan"], "img": "images/54.png" },
  { "id": "bk-mini-chicken", "name": "Mini pishirilgan roll tovuq bilan", "desc": "Guruch, nori, tovuq, krem-pishloq, spaysi sous, unagi sousi", "price": 50000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/55.png" },
  { "id": "bk-mini-salmon", "name": "Mini pishirilgan roll losos bilan", "desc": "Guruch, nori, losos, krem-pishloq, spaysi sous, unagi sousi", "price": 55000, "pieces": 0, "cat": ["pishirilgan", "achchiq"], "img": "images/56.png" },
  { "id": "set-trio", "name": "Chicken Trio", "desc": "Pishirilgan roll tovuq, Pishirilgan roll chiken lyuks, Qovurilgan sendvich tovuq", "price": 175000, "pieces": 20, "cat": ["setlar"], "badge": "hit", "img": "images/57.png" },
  { "id": "set-deluxe", "name": "Set Deluxe", "desc": "Pishirilgan roll (Dabl Chiken), Qovurilgan roll tovuq, Filadelfiya krevetka", "price": 179000, "pieces": 24, "cat": ["setlar"], "badge": "hit", "img": "images/58.png" },
  { "id": "set-yamato", "name": "Set \"Yamato\"", "desc": "Qovurilgan roll losos, Filadelfiya ugor va losos, Pishirilgan dabl chiken roll", "price": 205000, "pieces": 30, "cat": ["setlar"], "badge": "hit", "img": "images/59.png" },
  { "id": "set-sushi-mix", "name": "Sushi Miks", "desc": "Filadelfiya layt, Pishirilgan roll Dabl Chiken, Qovurilgan roll krevetka, Pishirilgan sushi 6 dona", "price": 222000, "pieces": 30, "cat": ["setlar"], "img": "images/60.png" },
  { "id": "set-royal", "name": "Royal miks", "desc": "Filadelfiya Ugor va Losos, Sushi losos, Pishirilgan roll tovuq, Maki avokado, Pishirilgan roll losos", "price": 233000, "pieces": 0, "cat": ["setlar"], "img": "images/61.png" },
  { "id": "set-guest", "name": "Set \"Gostevoy\"", "desc": "Filadelfiya, Sake maki roll, Qovurilgan roll tovuq, Pishirilgan roll tovuq", "price": 241000, "pieces": 0, "cat": ["setlar"], "badge": "hit", "img": "images/62.png" },
  { "id": "set-grand", "name": "Grand Set", "desc": "Filadelfiya, Filadelfiya ugor, Pishirilgan roll ugor spaysi, Kaliforniya ikra", "price": 249000, "pieces": 0, "cat": ["setlar", "yangi"], "badge": "new", "img": "images/63.png" },
  { "id": "set-mega", "name": "Mega praznik", "desc": "Mini pishirilgan tovuq, Mini pishirilgan losos, Qovurilgan sendvich losos, Shirin roll, Qovurilgan sabzavotli roll, Filadelfiya layt, Wok tovuq, Wok krevetka, Cola 1 l", "price": 444000, "pieces": 0, "cat": ["setlar", "yangi"], "badge": "new", "img": "images/64.png" },
  { "id": "fanta-glass", "name": "Fanta 0,25 (shisha)", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/65.png" },
  { "id": "cola-glass", "name": "Coca-Cola 0,25 (shisha)", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/66.png" },
  { "id": "cola-05", "name": "Coca-Cola 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/67.png" },
  { "id": "fanta-05", "name": "Fanta 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/68.png" },
  { "id": "sprite-05", "name": "Sprite 0,5", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/69.png" },
  { "id": "mojito", "name": "Mohito 0,45", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/70.png" },
  { "id": "sochnaya", "name": "Sochnaya dolina (olma) 0,45", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/71.png" },
  { "id": "fusetea", "name": "Fuse Tea 0,5", "desc": "", "price": 8000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/72.png" },
  { "id": "cola-can", "name": "Coca-Cola 0,25 (banka)", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/73.png" },
  { "id": "fanta-can", "name": "Fanta 0,25 (banka)", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/74.png" },
  { "id": "sprite-can", "name": "Sprite 0,25 (banka)", "desc": "", "price": 10000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/75.png" },
  { "id": "energy18", "name": "18+ energetik 0,45", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/76.png" },
  { "id": "adrenaline-025", "name": "Adrenalin 0,25", "desc": "", "price": 14000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/77.png" },
  { "id": "adrenaline-045", "name": "Adrenalin 0,45", "desc": "", "price": 18000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/78.png" },
  { "id": "hydrolife", "name": "Gidrolayf suv 0,5", "desc": "", "price": 5000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/79.png" },
  { "id": "cola-1", "name": "Coca-Cola 1 l", "desc": "", "price": 15000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/80.png" },
  { "id": "cola-15", "name": "Coca-Cola 1,5 l", "desc": "", "price": 20000, "pieces": 0, "cat": ["ichimliklar"], "img": "images/81.png" },
  { "id": "tarxun-choy-065", "name": "Tarxun choy 0,65 l", "desc": "Choynak, 0,65 litr", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "tarxun-choy-08", "name": "Tarxun choy 0,8 l", "desc": "Choynak, 0,8 litr", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "gul-choy-065", "name": "Gul choy 0,65 l", "desc": "Choynak, 0,65 litr", "price": 20000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "gul-choy-08", "name": "Gul choy 0,8 l", "desc": "Choynak, 0,8 litr", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "dragon-choy-065", "name": "Dragon choy 0,65 l", "desc": "Choynak, 0,65 litr", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "dragon-choy-08", "name": "Dragon choy 0,8 l", "desc": "Choynak, 0,8 litr", "price": 40000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "flecha-choy-065", "name": "Flecha kardamon 0,65 l", "desc": "Choynak, 0,65 litr", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "flecha-choy-08", "name": "Flecha kardamon 0,8 l", "desc": "Choynak, 0,8 litr", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "imperator-choy-065", "name": "Imperator malina 0,65 l", "desc": "Choynak, 0,65 litr", "price": 30000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "imperator-choy-08", "name": "Imperator malina 0,8 l", "desc": "Choynak, 0,8 litr", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "molochniy-choy-065", "name": "Molochniy ulun 0,65 l", "desc": "Choynak, 0,65 litr", "price": 35000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "molochniy-choy-08", "name": "Molochniy ulun 0,8 l", "desc": "Choynak, 0,8 litr", "price": 40000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "yaprok-choy-065", "name": "Yaprok choy 0,65 l", "desc": "Choynak, 0,65 litr", "price": 20000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" },
  { "id": "yaprok-choy-08", "name": "Yaprok choy 0,8 l", "desc": "Choynak, 0,8 litr", "price": 25000, "pieces": 0, "cat": ["choy"], "img": "images/82.png" }
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

const saveCart = () => localStorage.setItem('ym_cart', JSON.stringify(CART));
const cartCount = () => Object.values(CART).reduce((a, b) => a + b, 0);
const cartSubtotal = () => Object.entries(CART).reduce((s, [id, q]) => s + getP(id).price * q, 0);
const cartDelivery = () => cartSubtotal() > 0 ? 15000 : 0;

/* =========================================================
   KARTALAR
   ========================================================= */
function cardHTML(p) {
  const badge = p.badge === 'hit' ? '<span class="badge hit">Xit</span>' :
    p.badge === 'new' ? '<span class="badge new">Yangi</span>' :
      p.badge === 'top' ? '<span class="badge top">Top</span>' : '';
  const pieces = p.pieces ? `${p.pieces} dona` : '';
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
        <div class="p-desc">${p.desc}</div>
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
        <p class="desc">${p.desc || 'Yangi tayyorlangan, mazali taom.'}</p>
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
        ${['Filadelfiya', 'Set', 'Wok', 'Poke', 'Maki', 'Choy'].map(t => `<div class="search-tag" onclick="runSearch('${t}')">${t}</div>`).join('')}
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
      <div class="sr-info"><b>${p.name}</b><small>${p.desc || ''}</small></div>
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
function selectTime(el) {
  $$('.time-opt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  CHECKOUT.time = el.textContent.includes('Keyinroq') ? 'later' : 'now';
}
function selectPay(el) {
  $$('.pay-opt').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  CHECKOUT.pay = el.dataset.pay;
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
  const district = $('#ckDistrict').value;
  const house = $('#ckHouse').value.trim();
  const addr = $('#ckAddr').value.trim();
  const landmark = $('#ckLandmark').value.trim();

  if (!name || phone.replace(/\D/g, '').length < 12) {
    toast('Ism va telefon raqamini to\'ldiring');
    return;
  }
  if (!addr) { toast('Manzilni kiriting'); return; }

  const items = Object.entries(CART).map(([id, q]) => {
    const p = getP(id);
    return { id, name: p.name, price: p.price, qty: q, sum: p.price * q };
  });
  const subtotal = cartSubtotal();
  const delivery = cartDelivery();
  const total = subtotal + delivery;

  const payload = {
    name, phone, district, addr, house, landmark,
    time: CHECKOUT.time,
    pay: CHECKOUT.pay,
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
      orderNum = data.orderNum;
    } else {
      toast('Buyurtma yuborilmadi: ' + (data.error || ''));
      return;
    }
  } catch (e) {
    console.warn('Buyurtma yuborishda xatolik:', e);
    toast('Server bilan aloqa yo\'q');
    return;
  }

  CART = {};
  localStorage.removeItem('ym_cart');
  updateCartUI();
  renderCart();
  closeModal('checkoutModal');

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
      '<div class="eta">To\'lovni tasdiqlash kerak</div>' +
      '<div class="order-num">' + orderNum + '</div>';
    body.innerHTML =
      '<div style="text-align:center;padding:8px 4px 20px">' +
        '<div style="font-size:1.15rem;font-weight:800;line-height:1.4;margin-bottom:10px">To\'lov qabul qilindi</div>' +
        '<p style="color:var(--muted);font-size:.9rem;line-height:1.6;margin-bottom:22px">' +
          "Buyurtmangiz tayyorlanmoqda. To'lovni tasdiqlash uchun operator siz bilan bog'lanadi." +
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
document.addEventListener('DOMContentLoaded', () => {
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