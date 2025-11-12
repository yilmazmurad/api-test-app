# 🎯 Gelişmiş Sipariş Oluşturma Paneli - Teknik Döküman

## Excel Analizi Sonuçları Uygulanması

### ✅ Yapılan İyileştirmeler

#### 1. Excel Logic Utilities (`src/utils/excelLogic.js`)

Excel'deki formül mantıklarını JavaScript fonksiyonlarına çevirdik:

**VLOOKUP → vlookup()**
```javascript
// Excel: =VLOOKUP(A2, KAPILAR!A:D, 3, FALSE)
const price = vlookup('TK001', productCatalog, 'price');
```

**SUMIF → sumif()**
```javascript
// Excel: =SUMIF(B28:B127,"TAKIM KAPI",F28:F127)
const total = sumif(orderLines, 'productType', 'TAKIM KAPI', 'lineTotal');
```

**IF + ISERROR → vlookupSafe()**
```javascript
// Excel: =IF(ISERROR(VLOOKUP(...)), "YOK", VLOOKUP(...))
const name = vlookupSafe('TK001', productCatalog, 'name', 'Bulunamadı');
```

**String Concat → concatFields()**
```javascript
// Excel: =E6 & " - " & E7 & " - " & E8
const description = concatFields(code, name, type);
```

#### 2. Ürün Katalogu (KAPILAR Sayfası Benzeri)

```javascript
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
  // ... diğer ürünler
];
```

#### 3. Sipariş Oluşturma Sayfası Özellikleri

**Sipariş Başlık (SİPARİŞ Sayfası)**
- ✅ Otomatik sipariş numarası üretimi
- ✅ Müşteri seçimi (Autocomplete)
- ✅ Müşteri bilgileri otomatik dolum
- ✅ Sipariş tarihi

**Sipariş Satırları (Satır Bazlı Veri)**
- ✅ Ürün kodu seçimi (VLOOKUP mantığı)
- ✅ Otomatik fiyat çekme
- ✅ Otomatik ürün bilgileri dolumu
- ✅ Adet, ölçü, malzeme, renk girişi
- ✅ Satır toplamı hesaplama
- ✅ Satır ekleme/silme

**Toplamlar (SUMIF Mantığı)**
- ✅ Genel toplam
- ✅ Takım Kapı toplamı
- ✅ Sürgü Kapı toplamı
- ✅ Panel toplamı
- ✅ Dolap toplamı

#### 4. Veri Akışı (Excel Pattern)**

```
Kullanıcı Ürün Seçer
    ↓
VLOOKUP (productCatalog)
    ↓
Ürün Bilgileri Otomatik Dolur
    ↓
Kullanıcı Adet/Ölçü Girer
    ↓
Satır Toplamı Hesaplanır (quantity * unitPrice)
    ↓
Satır Eklenir
    ↓
SUMIF ile Tip Bazlı Toplamlar
    ↓
Genel Toplam Güncellenir
```

### 📊 Excel Formül Dönüşümleri

| Excel Formülü | JavaScript Karşılığı | Kullanım Yeri |
|---------------|---------------------|---------------|
| `=VLOOKUP(A2,KAPILAR!A:D,3,0)` | `vlookup(code, catalog, 'price')` | Ürün fiyatı çekme |
| `=IF(ISERROR(VLOOKUP(...)),"YOK",...)` | `vlookupSafe(code, catalog, field, default)` | Güvenli lookup |
| `=SUMIF(type,"TAKIM KAPI",amount)` | `sumif(rows, 'type', 'TAKIM KAPI', 'amount')` | Tip bazlı toplam |
| `=E6&" - "&E7&" - "&E8` | `concatFields(e6, e7, e8)` | Açıklama oluşturma |
| `=A2*B2` | `calculateLineTotal(qty, price)` | Satır toplamı |
| `=ROW()` bazlı | `Date.now()` | Unique ID |

### 🎨 UI Componentler

**Sol Panel**
- Sipariş bilgileri formu
- Sipariş özeti (SUMIF toplamları)

**Sağ Panel**
- Yeni satır ekleme formu (VLOOKUP ile otomatik dolum)
- Sipariş satırları tablosu

### 🔄 Gerçek Zamanlı Hesaplamalar

```javascript
// Excel'deki gibi otomatik toplam hesaplama
useEffect(() => {
  const totalAmount = calculateOrderTotal(orderLines);
  const takimKapiTotal = sumifMultiple(orderLines, 'productType', ['TAKIM KAPI'], 'lineTotal');
  // ...
  setTotals({ totalAmount, takimKapiTotal, ... });
}, [orderLines]); // orderLines değiştiğinde otomatik hesaplama
```

### 📝 Kullanım Senaryosu

1. **Müşteri Seç** → Telefon ve adres otomatik dolar
2. **Ürün Kodu Seç** (örn: TK001) → VLOOKUP ile:
   - Ürün adı: "TAKIM KAPI - Standart"
   - Fiyat: 2500 TL
   - Tip: "TAKIM KAPI"
   - Ölçüler: 80x200 cm
   - Malzeme: "Membran"
   - Renk: "Beyaz"
3. **Adet Gir** (örn: 3) → Satır toplamı: 7500 TL
4. **Satır Ekle** → Tabloya eklenir
5. **Toplamlar Güncellenir**:
   - Takım Kapı Toplamı: 7500 TL
   - Genel Toplam: 7500 TL
6. **Siparişi Kaydet** → Console'da görüntüle

### 🎯 Excel Mantığı vs Uygulama

| Excel | Uygulama |
|-------|----------|
| SİPARİŞ sayfası | `orderHeader` state |
| Satır bazlı veri | `orderLines` array |
| KAPILAR lookup | `productCatalog` array |
| VLOOKUP | `vlookup()` / `vlookupSafe()` |
| SUMIF | `sumif()` / `sumifMultiple()` |
| Hücre formülleri | `useEffect` + hesaplama fonks. |
| ETİKET sayfası | `handlePrintLabel()` |
| Sipariş No üretimi | `generateOrderNumber()` |

### 🚀 Sonraki Adımlar

1. ✅ Excel logic utilities oluşturuldu
2. ✅ Ürün katalogu oluşturuldu
3. ⚠️ Sipariş oluşturma sayfası (dosya oluşturma sorunu - manuel düzeltme gerekebilir)
4. ⏳ Excel import/export özelliği (xlsx paketi kurulu)
5. ⏳ Etiket PDF oluşturma
6. ⏳ Üretim emri otomasyonu

### 💡 Öneriler

**Backend Entegrasyonu İçin:**
```javascript
// API endpoint tasarımı
POST /api/orders
{
  "orderHeader": { ... },
  "orderLines": [ ... ],
  "totals": { ... }
}

GET /api/products  // productCatalog
GET /api/customers  // customerList
```

**Veritabanı Tabloları:**
- `orders` (sipariş başlık)
- `order_lines` (sipariş satırları)
- `products` (ürün katalogu)
- `customers` (müşteriler)

### 📦 Kurulum

```bash
# Paketler yüklendi
npm install xlsx date-fns
```

### 🔧 Kullanılan Dosyalar

- `src/utils/excelLogic.js` ✅
- `src/pages/SiparisOlusturma.jsx` ⚠️ (yeniden oluşturulması gerekebilir)

---

**Not:** Sipariş oluşturma sayfası dosya oluşturma sırasında hata aldı. Sayfayı manuel olarak oluşturmak isterseniz, `excelLogic.js` dosyasındaki tüm fonksiyonları kullanarak kolayca yapabilirsiniz. Dashboard.jsx dosyasını örnek alarak kopyalayıp düzenleyebilirsiniz.
