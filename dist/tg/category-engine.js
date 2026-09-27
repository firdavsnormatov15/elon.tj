/* ==========================================================================
   CATEGORY ENGINE — системаи динамикии категорияҳо (БИСЁРЗАБОНӢ)
   ==========================================================================
   Дар ин файл ҲЕҶ матни кушод нест: ҳар ном/лейбл танҳо КАЛИД аст
   (nameKey / labelKey), матни аслӣ дар /locales/{tg,ru,en}.json.

   Сохт:
   - категория: { slug, nameKey, icon, types: [...] }
   - навъ (type): { slug, nameKey, brands?, attributes? }
   - атрибут: { key, labelKey, type, options? }  — options = КОДҲО,
     матни онҳо: opt.<attrKey>.<code>  (рақамҳо ва брендҳо тарҷума намешаванд)

   Барои илова кардани категория/бренд/модел — ҳамин массивро тағйир диҳед
   ва калидҳои навро ба ҳар се файли locales илова кунед.
   ========================================================================== */

/* Брендҳо ва моделҳо номҳои хос (proper nouns) — тарҷума намешаванд. */
const CAR_BRANDS = [
  { name: 'Toyota', models: ['Camry','Corolla','Prius','RAV4','Land Cruiser','Land Cruiser Prado','Highlander','Yaris','C-HR','Harrier','Hilux'] },
  { name: 'Mercedes-Benz', models: ['A-Class','C-Class','E-Class','S-Class','GLA','GLC','GLE','GLS','G-Class','Sprinter'] },
  { name: 'BMW', models: ['1 Series','3 Series','5 Series','7 Series','X1','X3','X5','X6','X7'] },
  { name: 'Audi', models: ['A3','A4','A6','A8','Q3','Q5','Q7','Q8'] },
  { name: 'Volkswagen', models: ['Golf','Passat','Polo','Jetta','Tiguan','Touareg'] },
  { name: 'Hyundai', models: ['Sonata','Elantra','Accent','Tucson','Santa Fe','Creta','i10','i20'] },
  { name: 'Kia', models: ['Rio','Cerato','K5','Sportage','Sorento','Seltos','Carnival'] },
  { name: 'Lexus', models: ['IS','ES','NX','RX','GX','LX'] },
  { name: 'Honda', models: ['Civic','Accord','CR-V','HR-V','Pilot'] },
  { name: 'Nissan', models: ['Almera','Altima','X-Trail','Qashqai','Murano','Patrol'] },
  { name: 'Mazda', models: ['Mazda 3','Mazda 6','CX-5','CX-9'] },
  { name: 'Mitsubishi', models: ['Lancer','Outlander','Pajero','Pajero Sport'] },
  { name: 'Chevrolet', models: ['Cobalt','Nexia','Malibu','Cruze','Spark','Aveo','Captiva','Tahoe'] },
  { name: 'Daewoo', models: ['Nexia','Matiz','Gentra','Lacetti'] },
  { name: 'Lada', models: ['Priora','Kalina','Granta','Vesta','Niva','Largus'] },
  { name: 'Geely', models: ['Emgrand','Coolray','Atlas','Monjaro'] },
  { name: 'Changan', models: ['CS35','CS55','CS75','UNI-T','UNI-K'] },
  { name: 'BYD', models: ['Dolphin','Atto 3','Seal','Han','Song'] },
  { name: 'Haval', models: ['H6','Jolion','Dargo','F7'] },
  { name: 'Chery', models: ['Tiggo 4','Tiggo 7','Tiggo 8'] },
  { name: 'MG', models: ['MG5','ZS','HS'] },
  { name: 'Opel', models: ['Astra','Corsa','Vectra','Insignia'] },
  { name: 'Ford', models: ['Focus','Fusion','Explorer','Mustang'] },
  { name: 'Land Rover', models: ['Range Rover','Discovery','Defender'] },
  { name: 'Porsche', models: ['Cayenne','Macan','Panamera'] },
  { name: 'Volvo', models: ['XC40','XC60','XC90','S60'] },
  { name: 'Suzuki', models: ['Vitara','Swift','Jimny'] },
];

const LAPTOP_BRANDS = [
  { name: 'Lenovo', models: ['ThinkPad','IdeaPad','Legion','Yoga','V15','LOQ'] },
  { name: 'HP', models: ['Pavilion','Victus','OmniBook','EliteBook','Envy','Omen'] },
  { name: 'Dell', models: ['XPS','Inspiron','Latitude','Vostro','G-series'] },
  { name: 'Asus', models: ['ROG','TUF','VivoBook','ZenBook','ExpertBook'] },
  { name: 'Apple', models: ['MacBook Air','MacBook Pro'] },
  { name: 'MSI', models: ['Katana','Modern','Stealth','Cyborg'] },
  { name: 'Acer', models: ['Predator','Aspire','Nitro','Swift'] },
];

const PHONE_BRANDS = [
  { name: 'Apple', models: ['iPhone 12','iPhone 13','iPhone 14','iPhone 15','iPhone 15 Pro','iPhone 16'] },
  { name: 'Samsung', models: ['Galaxy S23','Galaxy S24','Galaxy A54','Galaxy A34','Galaxy Note 20'] },
  { name: 'Xiaomi', models: ['Redmi Note 13','Redmi 13C','Mi 11','Poco X6'] },
  { name: 'Huawei', models: ['P60','Nova 11','Mate 60'] },
  { name: 'Infinix', models: ['Hot 40','Note 30','Zero 30'] },
  { name: 'Tecno', models: ['Spark 10','Camon 20'] },
  { name: 'Honor', models: ['X9','Magic 6','90'] },
];

/* Брендҳои умумӣ, ки калид доранд (ғайри ном) */
const B = n => ({ name: n });
const BK = key => ({ nameKey: key });   // бренди тарҷумашаванда, мисли «Дигар»
const BRAND_OTHER = BK('brand.other');
const BRAND_FACTORY = BK('brand.factory');
const BRAND_CUSTOM = BK('brand.custom');
const BRAND_HANDMADE_CARPET = BK('brand.handmadeCarpet');

const YEARS = (() => { const arr = []; for (let y = 2026; y >= 1990; y--) arr.push(String(y)); return arr; })();

const CATEGORY_TREE = [
  {
    slug: 'transport', nameKey: 'cat.transport', icon: 'car',
    types: [
      { slug: 'passenger-cars', nameKey: 'type.transport.passenger-cars', brands: CAR_BRANDS,
        attributes: [
          { key:'year', labelKey:'attr.year', type:'select', options:YEARS },
          { key:'mileage', labelKey:'attr.mileage', type:'number' },
          { key:'engine', labelKey:'attr.engineL', type:'select', options:['0.6','0.8','1.0','1.2','1.3','1.4','1.5','1.6','1.8','2.0','2.2','2.4','2.5','2.7','3.0','3.3','3.5','4.0','4.4','4.6','5.0','5.5','6.0','6.0+','electric'] },
          { key:'fuel', labelKey:'attr.fuel', type:'select', options:['petrol','diesel','gas','petrol-gas','hybrid','electric'] },
          { key:'customs', labelKey:'attr.customs', type:'select', options:['cleared','not-cleared'] },
          { key:'rt', labelKey:'attr.rt', type:'select', options:['has','none'] },
          { key:'utilization', labelKey:'attr.utilization', type:'select', options:['paid','not-paid'] },
          { key:'transmission', labelKey:'attr.transmission', type:'select', options:['manual','automatic','cvt','robot'] },
          { key:'drive', labelKey:'attr.drive', type:'select', options:['fwd','rwd','awd'] },
          { key:'bodyType', labelKey:'attr.bodyType', type:'select', options:['sedan','hatchback','universal','suv','coupe','minivan','pickup'] },
          { key:'color', labelKey:'attr.color', type:'select', options:['white','black','gray','silver','blue','red','green','yellow','orange','brown','purple','gold','other'] },
        ] },
      { slug: 'motorcycles', nameKey: 'type.transport.motorcycles',
        attributes: [
          { key:'moType', labelKey:'attr.kind', type:'select', options:['motorcycle','scooter','moped','atv','dirt-bike'] },
          { key:'year', labelKey:'attr.year', type:'select', options:YEARS },
          { key:'engine', labelKey:'attr.engineCc', type:'number' },
        ] },
      { slug: 'commercial', nameKey: 'type.transport.commercial',
        attributes: [
          { key:'cType', labelKey:'attr.kind', type:'select', options:['truck','dump-truck','bus','minibus','crane','tractor-unit'] },
          { key:'capacity', labelKey:'attr.capacityTon', type:'number' },
          { key:'year', labelKey:'attr.year', type:'select', options:YEARS },
        ] },
      { slug: 'trailers', nameKey: 'type.transport.trailers',
        attributes: [ { key:'tType', labelKey:'attr.kind', type:'select', options:['trailer','semi-trailer','container','mobile-home'] } ] },
      { slug: 'parts', nameKey: 'type.transport.parts',
        attributes: [
          { key:'partType', labelKey:'attr.partType', type:'select', options:['tire','rim','battery','engine','headlight','bumper','audio'] },
          { key:'forBrand', labelKey:'attr.forBrand', type:'select', options: CAR_BRANDS.map(b => b.name) },
        ] },
      { slug: 'auto-services', nameKey: 'type.transport.auto-services',
        attributes: [ { key:'svcType', labelKey:'attr.svcType', type:'select', options:['engine-repair','diagnostics','painting','tire-service','car-wash','tow-truck'] } ] },
    ],
  },
  {
    slug: 'kompyuterho', nameKey: 'cat.kompyuterho', icon: 'laptop',
    types: [
      { slug: 'laptop', nameKey: 'type.kompyuterho.laptop', brands: LAPTOP_BRANDS,
        attributes: [
          { key:'cpu', labelKey:'attr.cpu', type:'text' },
          { key:'ram', labelKey:'attr.ram', type:'select', options:['4','8','16','32','64'] },
          { key:'storage', labelKey:'attr.storage', type:'text' },
          { key:'gpu', labelKey:'attr.gpu', type:'text' },
          { key:'screen', labelKey:'attr.screenInch', type:'text' },
        ] },
      { slug: 'desktop', nameKey: 'type.kompyuterho.desktop', brands:[B('HP'),B('Dell'),B('Lenovo'),B('Acer'),B('Asus'),BRAND_CUSTOM],
        attributes: [ { key:'cpu', labelKey:'attr.cpu', type:'text' }, { key:'ram', labelKey:'attr.ram', type:'select', options:['4','8','16','32','64'] }, { key:'gpu', labelKey:'attr.gpu', type:'text' } ] },
      { slug: 'monitor', nameKey: 'type.kompyuterho.monitor', brands:[B('Samsung'),B('LG'),B('AOC'),B('BenQ'),B('Dell'),B('Xiaomi')], attributes: [ { key:'screen', labelKey:'attr.sizeInch', type:'text' } ] },
      { slug: 'printer', nameKey: 'type.kompyuterho.printer', brands:[B('HP'),B('Canon'),B('Epson'),B('Brother'),B('Xerox')], attributes: [ { key:'pType', labelKey:'attr.kind', type:'select', options:['laser','inkjet','mfp'] } ] },
      { slug: 'tablet', nameKey: 'type.kompyuterho.tablet', brands: [{name:'Apple',models:['iPad','iPad Air','iPad Pro']},{name:'Samsung',models:['Galaxy Tab S9','Galaxy Tab A9']}], attributes:[ { key:'storage', labelKey:'attr.storageGb', type:'select', options:['32','64','128','256','512'] } ] },
      { slug: 'network', nameKey: 'type.kompyuterho.network', brands:[B('TP-Link'),B('Mercusys'),B('Huawei'),B('D-Link'),B('Xiaomi')], attributes: [ { key:'nType', labelKey:'attr.kind', type:'select', options:['modem','router','switch','cable'] } ] },
      { slug: 'game-console', nameKey: 'type.kompyuterho.game-console', brands: [{name:'Sony',models:['PlayStation 4','PlayStation 5']},{name:'Microsoft',models:['Xbox Series S','Xbox Series X']},{name:'Nintendo',models:['Switch','Switch OLED']}] },
    ],
  },
  {
    slug: 'telefony', nameKey: 'cat.telefony', icon: 'smartphone',
    types: [
      { slug: 'smartphone', nameKey: 'type.telefony.smartphone', brands: PHONE_BRANDS,
        attributes: [
          { key:'storage', labelKey:'attr.storageGb', type:'select', options:['32','64','128','256','512','1TB'] },
          { key:'ram', labelKey:'attr.ram', type:'select', options:['2','3','4','6','8','12','16'] },
          { key:'color', labelKey:'attr.color', type:'select', options:['white','black','gray','silver','blue','red','green','yellow','orange','purple','gold','other'] },
          { key:'battery', labelKey:'attr.battery', type:'number' },
        ] },
      { slug: 'smartwatch', nameKey: 'type.telefony.smartwatch', brands: [{name:'Apple',models:['Watch SE','Watch Series 9','Watch Ultra']},{name:'Samsung',models:['Galaxy Watch 6']},{name:'Xiaomi',models:['Mi Band','Watch S1']}] },
      { slug: 'accessories', nameKey: 'type.telefony.accessories', brands:[B('Baseus'),B('Anker'),B('Hoco'),B('JBL'),B('Xiaomi'),B('Belkin')], attributes: [ { key:'accType', labelKey:'attr.kind', type:'select', options:['case','screen-glass','charger','cable','headphones','powerbank'] } ] },
      { slug: 'sim', nameKey: 'type.telefony.sim', attributes: [ { key:'operator', labelKey:'attr.operator', type:'select', options:['beeline','megafon','tcell','babilon','zet-mobile'] } ] },
    ],
  },
  {
    slug: 'khona', nameKey: 'cat.khona', icon: 'house',
    types: [
      { slug: 'apartment-sale', nameKey: 'type.khona.apartment-sale',
        attributes: [
          { key:'rooms', labelKey:'attr.rooms', type:'select', options:['1','2','3','4','5+'] },
          { key:'area', labelKey:'attr.areaM2', type:'number' },
          { key:'floor', labelKey:'attr.floor', type:'number' },
          { key:'totalFloors', labelKey:'attr.totalFloors', type:'number' },
          { key:'material', labelKey:'attr.material', type:'select', options:['brick','panel','monolith'] },
          { key:'renovation', labelKey:'attr.renovation', type:'select', options:['none','cosmetic','euro','designer'] },
        ] },
      { slug: 'apartment-rent', nameKey: 'type.khona.apartment-rent', attributes: [ { key:'rooms', labelKey:'attr.rooms', type:'select', options:['1','2','3','4','5+'] }, { key:'area', labelKey:'attr.areaM2', type:'number' }, { key:'period', labelKey:'attr.period', type:'select', options:['daily','monthly','long-term'] } ] },
      { slug: 'house-sale', nameKey: 'type.khona.house-sale', attributes: [ { key:'area', labelKey:'attr.areaM2', type:'number' }, { key:'landArea', labelKey:'attr.landAreaSotix', type:'number' } ] },
      { slug: 'land', nameKey: 'type.khona.land', attributes: [ { key:'landArea', labelKey:'attr.areaSotix', type:'number' }, { key:'purpose', labelKey:'attr.purpose', type:'select', options:['construction','farming','commercial'] } ] },
      { slug: 'commercial-property', nameKey: 'type.khona.commercial-property', attributes: [ { key:'area', labelKey:'attr.areaM2', type:'number' } ] },
      { slug: 'garage', nameKey: 'type.khona.garage', attributes: [ { key:'area', labelKey:'attr.areaM2', type:'number' } ] },
    ],
  },
  {
    slug: 'kor', nameKey: 'cat.kor', icon: 'briefcase',
    types: [
      { slug: 'it', nameKey: 'type.kor.it' },
      { slug: 'sales', nameKey: 'type.kor.sales' },
      { slug: 'construction-job', nameKey: 'type.kor.construction-job' },
      { slug: 'education', nameKey: 'type.kor.education' },
      { slug: 'medicine', nameKey: 'type.kor.medicine' },
      { slug: 'driver', nameKey: 'type.kor.driver' },
      { slug: 'other-job', nameKey: 'type.kor.other-job' },
    ].map(t => ({ ...t, attributes: [
      { key:'employment', labelKey:'attr.employment', type:'select', options:['full-time','part-time','remote','temporary'] },
      { key:'salary', labelKey:'attr.salary', type:'text' },
      { key:'experience', labelKey:'attr.experience', type:'select', options:['none','1-3','3-5','5+'] },
    ] })),
  },
  {
    slug: 'elektronika', nameKey: 'cat.elektronika', icon: 'tv',
    types: [
      { slug: 'tv', nameKey: 'type.elektronika.tv', brands:[B('Samsung'),B('LG'),B('Xiaomi'),B('Sony'),B('TCL')], attributes:[{key:'screen',labelKey:'attr.sizeInch',type:'text'}] },
      { slug: 'fridge', nameKey: 'type.elektronika.fridge', brands:[B('Samsung'),B('LG'),B('Bosch'),B('Indesit'),B('Beko'),B('Artel'),B('Daewoo')], attributes:[{key:'capacity',labelKey:'attr.volumeL',type:'number'}] },
      { slug: 'washer', nameKey: 'type.elektronika.washer', brands:[B('Samsung'),B('LG'),B('Bosch'),B('Indesit'),B('Beko'),B('Artel')], attributes:[{key:'capacity',labelKey:'attr.volumeKg',type:'number'}] },
      { slug: 'ac', nameKey: 'type.elektronika.ac', brands:[B('Gree'),B('Midea'),B('Haier'),B('LG'),B('Samsung'),B('Artel')], attributes:[{key:'power',labelKey:'attr.powerBtu',type:'text'}] },
      { slug: 'audio', nameKey: 'type.elektronika.audio', brands:[B('JBL'),B('Sony'),B('Xiaomi'),B('Marshall'),B('Bose')] },
      { slug: 'small-appliance', nameKey: 'type.elektronika.small-appliance', brands:[B('Philips'),B('Tefal'),B('Bosch'),B('Xiaomi'),B('Redmond')] },
    ],
  },
  {
    slug: 'mebel', nameKey: 'cat.mebel', icon: 'sofa',
    types: [
      { slug: 'sofa', nameKey: 'type.mebel.sofa', brands:[B('IKEA'),B('Ashley'),BRAND_FACTORY,BRAND_OTHER] },
      { slug: 'table-chair', nameKey: 'type.mebel.table-chair', brands:[B('IKEA'),BRAND_FACTORY,BRAND_OTHER] },
      { slug: 'wardrobe', nameKey: 'type.mebel.wardrobe', brands:[B('IKEA'),BRAND_FACTORY,BRAND_OTHER] },
      { slug: 'kitchenware', nameKey: 'type.mebel.kitchenware', brands:[B('Tefal'),B('Zepter'),B('IKEA'),BRAND_OTHER] },
      { slug: 'lighting', nameKey: 'type.mebel.lighting', brands:[B('Philips'),B('IKEA'),B('Xiaomi'),BRAND_OTHER] },
      { slug: 'carpet', nameKey: 'type.mebel.carpet', brands:[B('IKEA'),BRAND_HANDMADE_CARPET,BRAND_OTHER] },
    ],
  },
  {
    slug: 'stroitelstvo', nameKey: 'cat.stroitelstvo', icon: 'brick-wall',
    types: [
      { slug: 'materials', nameKey: 'type.stroitelstvo.materials', brands:[B('Knauf'),B('Ceresit'),BRAND_OTHER] },
      { slug: 'hand-tools', nameKey: 'type.stroitelstvo.hand-tools', brands:[B('Bosch'),B('Makita'),B('DeWalt'),B('Metabo'),B('Sturm'),B('Interskol')] },
      { slug: 'plumbing', nameKey: 'type.stroitelstvo.plumbing', brands:[B('Grohe'),B('Kaiser'),B('Sanita'),BRAND_OTHER] },
      { slug: 'electrical', nameKey: 'type.stroitelstvo.electrical', brands:[B('Schneider Electric'),B('ABB'),B('IEK'),BRAND_OTHER] },
      { slug: 'paint', nameKey: 'type.stroitelstvo.paint', brands:[B('Tikkurila'),B('Dulux'),B('Ceresit'),BRAND_OTHER] },
      { slug: 'doors-windows', nameKey: 'type.stroitelstvo.doors-windows', brands:[B('Rehau'),B('Doorhan'),BRAND_OTHER] },
    ],
  },
  {
    slug: 'hobbi', nameKey: 'cat.hobbi', icon: 'guitar',
    types: [
      { slug: 'bicycle', nameKey: 'type.hobbi.bicycle', brands:[B('Trek'),B('Giant'),B('Merida'),B('Stels')] },
      { slug: 'fitness', nameKey: 'type.hobbi.fitness', brands:[B('Nike'),B('Adidas'),B('Reebok'),B('Torneo'),BRAND_OTHER] },
      { slug: 'music-instrument', nameKey: 'type.hobbi.music-instrument', brands:[B('Yamaha'),B('Fender'),B('Cort'),B('Casio'),BRAND_OTHER] },
      { slug: 'books', nameKey: 'type.hobbi.books' },
      { slug: 'fishing-hunting', nameKey: 'type.hobbi.fishing-hunting', brands:[B('Shimano'),B('Daiwa'),B('Salmo'),BRAND_OTHER] },
      { slug: 'collectibles', nameKey: 'type.hobbi.collectibles' },
    ],
  },
  {
    slug: 'libos', nameKey: 'cat.libos', icon: 'shirt',
    types: [
      { slug: 'women-clothing', nameKey: 'type.libos.women-clothing', brands:[B('Zara'),B('H&M'),B('LC Waikiki'),B('Bershka'),BRAND_OTHER] },
      { slug: 'men-clothing', nameKey: 'type.libos.men-clothing', brands:[B('Zara'),B('H&M'),B('LC Waikiki'),B('Nike'),B('Adidas'),BRAND_OTHER] },
      { slug: 'shoes', nameKey: 'type.libos.shoes', brands:[B('Nike'),B('Adidas'),B('Puma'),B('Reebok'),B('Ecco'),BRAND_OTHER] },
      { slug: 'watches-jewelry', nameKey: 'type.libos.watches-jewelry', brands:[B('Casio'),B('Fossil'),B('Orient'),B('Rolex'),BRAND_OTHER] },
      { slug: 'bags', nameKey: 'type.libos.bags', brands:[B('Louis Vuitton'),B('Gucci'),B('Michael Kors'),BRAND_OTHER] },
      { slug: 'cosmetics', nameKey: 'type.libos.cosmetics', brands:[B("L'Oreal"),B('Maybelline'),B('Nivea'),B('MAC'),BRAND_OTHER] },
    ],
  },
  {
    slug: 'detskiy', nameKey: 'cat.detskiy', icon: 'blocks',
    types: [
      { slug: 'kids-clothing', nameKey: 'type.detskiy.kids-clothing', brands:[B('H&M Kids'),B('LC Waikiki Kids'),BRAND_OTHER] },
      { slug: 'toys', nameKey: 'type.detskiy.toys', brands:[B('LEGO'),B('Hasbro'),B('Mattel'),B('Fisher-Price'),BRAND_OTHER] },
      { slug: 'kids-furniture', nameKey: 'type.detskiy.kids-furniture', brands:[B('IKEA'),BRAND_OTHER] },
      { slug: 'stroller', nameKey: 'type.detskiy.stroller', brands:[B('Chicco'),B('Cybex'),B('Bebetto'),B('Peg-Perego'),BRAND_OTHER] },
      { slug: 'car-seat', nameKey: 'type.detskiy.car-seat', brands:[B('Chicco'),B('Cybex'),B('Britax'),BRAND_OTHER] },
      { slug: 'school', nameKey: 'type.detskiy.school' },
    ],
  },
  {
    slug: 'khizmat', nameKey: 'cat.khizmat', icon: 'wrench',
    types: [
      { slug: 'repair', nameKey: 'type.khizmat.repair' },
      { slug: 'cleaning', nameKey: 'type.khizmat.cleaning' },
      { slug: 'delivery', nameKey: 'type.khizmat.delivery' },
      { slug: 'it-services', nameKey: 'type.khizmat.it-services' },
      { slug: 'design-services', nameKey: 'type.khizmat.design-services' },
      { slug: 'education-services', nameKey: 'type.khizmat.education-services' },
      { slug: 'beauty', nameKey: 'type.khizmat.beauty' },
      { slug: 'legal', nameKey: 'type.khizmat.legal' },
    ],
  },
  {
    slug: 'biznes', nameKey: 'cat.biznes', icon: 'building-2',
    types: [
      { slug: 'shop-equipment', nameKey: 'type.biznes.shop-equipment', brands:[BRAND_OTHER] },
      { slug: 'restaurant-equipment', nameKey: 'type.biznes.restaurant-equipment', brands:[B('Bosch'),B('Electrolux'),BRAND_OTHER] },
      { slug: 'industrial', nameKey: 'type.biznes.industrial', brands:[BRAND_OTHER] },
      { slug: 'office-furniture', nameKey: 'type.biznes.office-furniture', brands:[B('IKEA'),BRAND_OTHER] },
      { slug: 'agriculture', nameKey: 'type.biznes.agriculture', brands:[B('John Deere'),BK('brand.mtz'),BK('brand.kirovets'),BRAND_OTHER] },
    ],
  },
  {
    slug: 'hayvonot', nameKey: 'cat.hayvonot', icon: 'paw-print',
    types: [
      { slug: 'dogs', nameKey: 'type.hayvonot.dogs' },
      { slug: 'cats', nameKey: 'type.hayvonot.cats' },
      { slug: 'birds', nameKey: 'type.hayvonot.birds' },
      { slug: 'farm-animals', nameKey: 'type.hayvonot.farm-animals' },
      { slug: 'plants', nameKey: 'type.hayvonot.plants' },
      { slug: 'pet-food', nameKey: 'type.hayvonot.pet-food', brands:[B('Royal Canin'),B('Purina'),B('Pedigree'),B('Whiskas'),BRAND_OTHER] },
    ],
  },
  {
    slug: 'darom', nameKey: 'cat.darom', icon: 'gift',
    types: [
      { slug: 'darom-clothing', nameKey: 'type.darom.darom-clothing' },
      { slug: 'darom-furniture', nameKey: 'type.darom.darom-furniture' },
      { slug: 'darom-books', nameKey: 'type.darom.darom-books' },
      { slug: 'darom-other', nameKey: 'type.darom.darom-other' },
    ],
  },
  {
    slug: 'other', nameKey: 'cat.other', icon: 'package',
    types: [ { slug: 'other-item', nameKey: 'type.other.other-item' } ],
  },
];

/* ---------------- Функсияҳои ёрирасон ---------------- */
function getCategoryTree() { return CATEGORY_TREE; }
function getCatEngine(slug) { return CATEGORY_TREE.find(c => c.slug === slug); }
function getTypeEngine(catSlug, typeSlug) {
  const c = getCatEngine(catSlug);
  return c ? c.types.find(t => t.slug === typeSlug) : null;
}

/* Номи бренд: агар nameKey дошта бошад — тарҷума, вагарна номи хос */
function brandName(brand) {
  if (!brand) return '';
  return brand.nameKey ? t(brand.nameKey) : brand.name;
}
/* Идентификатори бренд (барои value-и select ва захира) */
function brandId(brand) { return brand.nameKey || brand.name; }

function getAllBrandsForType(catSlug, typeSlug) {
  const ty = getTypeEngine(catSlug, typeSlug);
  return (ty && ty.brands) ? ty.brands : [];
}
function getModelsForBrand(catSlug, typeSlug, brandIdent) {
  const brands = getAllBrandsForType(catSlug, typeSlug);
  const b = brands.find(x => brandId(x) === brandIdent);
  return (b && b.models) ? b.models : [];
}
/* Матни намоишии бренд аз рӯи id (барои эълонҳо) */
function brandLabel(brandIdent) {
  if (!brandIdent) return '';
  return String(brandIdent).indexOf('brand.') === 0 ? t(brandIdent) : brandIdent;
}

/* Лейбли атрибут ва матни option (рақамҳо/брендҳо ҳамон тавр мемонанд) */
function attrLabel(attr) { return t(attr.labelKey); }
function optLabel(attrKey, code) {
  const key = 'opt.' + attrKey + '.' + code;
  if (window.I18N && window.I18N.has(key)) return t(key);
  return String(code);
}
