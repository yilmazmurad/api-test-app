// Ürün katalogu mock data (KAPILAR sayfası benzeri)
export const productCatalog = [
  { 
    code: 'TK001', 
    name: 'TAKIM KAPI - Standart',
    type: 'TAKIM KAPI',
    unit: 'ADET',
    price: 2500,
    width: 80,
    height: 200,
    material: 'Membran',
    color: 'Beyaz'
  },
  { 
    code: 'TK002', 
    name: 'TAKIM KAPI - Lüks',
    type: 'TAKIM KAPI',
    unit: 'ADET',
    price: 3500,
    width: 90,
    height: 210,
    material: 'Membran',
    color: 'Kahverengi'
  },
  { 
    code: 'SK001', 
    name: 'SÜRGÜ KAPI - 2 Kanatlı',
    type: 'SÜRGÜ KAPI',
    unit: 'ADET',
    price: 4200,
    width: 160,
    height: 210,
    material: 'PVC',
    color: 'Beyaz'
  },
  { 
    code: 'SK002', 
    name: 'SÜRGÜ KAPI - 3 Kanatlı',
    type: 'SÜRGÜ KAPI',
    unit: 'ADET',
    price: 5800,
    width: 240,
    height: 210,
    material: 'PVC',
    color: 'Gri'
  },
  { 
    code: 'P001', 
    name: 'PANEL - Düz',
    type: 'PANEL',
    unit: 'M2',
    price: 450,
    material: 'Membran',
    color: 'Beyaz'
  },
  { 
    code: 'P002', 
    name: 'PANEL - Desenli',
    type: 'PANEL',
    unit: 'M2',
    price: 650,
    material: 'Membran',
    color: 'Özel'
  },
  { 
    code: 'D001', 
    name: 'DOLAP - 2 Kapılı',
    type: 'DOLAP',
    unit: 'ADET',
    price: 3200,
    width: 100,
    height: 220,
    material: 'Ahşap',
    color: 'Ceviz'
  },
  { 
    code: 'D002', 
    name: 'DOLAP - Sürgülü',
    type: 'DOLAP',
    unit: 'ADET',
    price: 4500,
    width: 150,
    height: 220,
    material: 'Membran',
    color: 'Beyaz'
  },
];

// VLOOKUP benzeri fonksiyon - Excel mantığını JS'e çevirdik
export const vlookup = (searchValue, catalog, returnField) => {
  const found = catalog.find(item => item.code === searchValue);
  return found ? found[returnField] : null;
};

// SUMIF benzeri fonksiyon - Excel: =SUMIF(type, "TAKIM KAPI", amount)
export const sumif = (rows, conditionField, conditionValue, sumField) => {
  return rows
    .filter(row => row[conditionField] === conditionValue)
    .reduce((sum, row) => sum + (parseFloat(row[sumField]) || 0), 0);
};

// Çoklu tip için SUMIF - Excel: SUMIF(...) + SUMIF(...)
export const sumifMultiple = (rows, conditionField, conditionValues, sumField) => {
  return conditionValues.reduce((total, value) => {
    return total + sumif(rows, conditionField, value, sumField);
  }, 0);
};

// IF + ISERROR pattern - Excel: =IF(ISERROR(VLOOKUP(...)), "YOK", VLOOKUP(...))
export const vlookupSafe = (searchValue, catalog, returnField, defaultValue = 'YOK') => {
  try {
    const result = vlookup(searchValue, catalog, returnField);
    return result !== null ? result : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

// String concat - Excel: =E6 & " - " & E7 & " - " & E8
export const concatFields = (...values) => {
  return values.filter(v => v !== null && v !== undefined && v !== '').join(' - ');
};

// Sipariş numarası üretimi - Excel'deki pattern benzeri
export const generateOrderNumber = (prefix = 'SIP', date = new Date()) => {
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${year}${month}${random}`;
};

// Satır toplamı hesaplama
export const calculateLineTotal = (quantity, unitPrice) => {
  const qty = parseFloat(quantity) || 0;
  const price = parseFloat(unitPrice) || 0;
  return qty * price;
};

// Sipariş toplam hesaplama
export const calculateOrderTotal = (orderLines) => {
  return orderLines.reduce((total, line) => {
    return total + calculateLineTotal(line.quantity, line.unitPrice);
  }, 0);
};

// Ürün tiplerine göre gruplama (üretim emri için)
export const groupByProductType = (orderLines) => {
  const grouped = {};
  
  orderLines.forEach(line => {
    const type = line.productType || 'DİĞER';
    if (!grouped[type]) {
      grouped[type] = {
        type,
        items: [],
        totalQuantity: 0,
        totalAmount: 0
      };
    }
    
    grouped[type].items.push(line);
    grouped[type].totalQuantity += parseFloat(line.quantity) || 0;
    grouped[type].totalAmount += calculateLineTotal(line.quantity, line.unitPrice);
  });
  
  return Object.values(grouped);
};

// Müşteri listesi mock data
export const customerList = [
  { id: 1, name: 'ÖZCAN SAPMAZ', phone: '0532 123 4567', address: 'İstanbul', taxNumber: '1234567890' },
  { id: 2, name: 'OSMAN YİĞİT', phone: '0533 234 5678', address: 'Ankara', taxNumber: '2345678901' },
  { id: 3, name: 'MEHMET YILMAZ', phone: '0534 345 6789', address: 'İzmir', taxNumber: '3456789012' },
  { id: 4, name: 'AHMET KAYA', phone: '0535 456 7890', address: 'Bursa', taxNumber: '4567890123' },
  { id: 5, name: 'ALİ DEMİR', phone: '0536 567 8901', address: 'Antalya', taxNumber: '5678901234' },
];

// Malzeme seçenekleri
export const materialOptions = ['Membran', 'PVC', 'Ahşap', 'Metal', 'Karma'];

// Renk seçenekleri
export const colorOptions = ['Beyaz', 'Siyah', 'Kahverengi', 'Gri', 'Ceviz', 'Özel Renk'];

// Ürün tipleri
export const productTypes = ['TAKIM KAPI', 'SÜRGÜ KAPI', 'PANEL', 'DOLAP'];
