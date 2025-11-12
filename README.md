# Sipariş Yönetim Sistemi

Modern ve kullanıcı dostu bir sipariş yönetim uygulaması. React, Vite ve Material UI kullanılarak geliştirilmiş, rol tabanlı erişim kontrolü ile çalışan profesyonel bir işletme yönetim sistemidir.

## 🚀 Özellikler

### ✅ Temel Özellikler
- **Rol Tabanlı Erişim Kontrol**: Patron, Beyaz Yaka, Mavi Yaka rolleri
- **CRUD İşlemleri**: Create, Read, Update, Delete operasyonları
- **Form Validasyon**: React Hook Form + Yup ile güçlü validasyon
- **Bildirim Sistemi**: Toast notifications ile kullanıcı geri bildirimi
- **Arama & Filtreleme**: Tablo içinde anlık arama ve filtreleme
- **Sıralama**: Tüm kolonlarda alfabetik/sayısal sıralama
- **Pagination**: Sayfalama ile performanslı veri gösterimi
- **PDF Oluşturma**: jsPDF ile sipariş PDF'leri
- **Barkod Üretimi**: Sipariş takibi için barkod oluşturma
- **Error Boundary**: Hata yakalama ve kullanıcı dostu hata mesajları
- **Loading States**: Skeleton screens ile gelişmiş loading deneyimi

### 🎨 UI/UX Özellikleri
- Modern ve responsive tasarım
- Material UI bileşenleri
- Dinamik durum chip'leri (Status badges)
- Onay dialogları
- Form validasyon hataları

### 🔐 Güvenlik
- Token-based authentication (localStorage)
- API interceptors ile merkezi hata yönetimi
- Form validasyonu ile veri güvenliği
- Protected routes (rol bazlı)

## 🛠️ Teknolojiler

### Core
- **React 18** - UI framework
- **Vite** - Build tool ve dev server
- **Material UI (MUI)** - Component library
- **React Router v6** - Routing

### Form & Validation
- **React Hook Form** - Form state yönetimi
- **Yup** - Schema validation
- **@hookform/resolvers** - Yup resolver

### API & State
- **Axios** - HTTP client
- **Context API** - Global state management

### Utilities
- **react-toastify** - Toast notifications
- **jsPDF** - PDF generation
- **jsPDF-autotable** - PDF tables

### Development
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Kurulum

### Gereksinimler
- Node.js 16+ 
- npm veya yarn

### Adımlar

```bash
# Repository'yi klonlayın
git clone <repository-url>
cd api-test-app

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin
# VITE_API_BASE_URL=https://your-api-url.com

# Geliştirme sunucusunu başlatın
npm run dev

# Production build
npm run build

# Production build'i preview edin
npm run preview
```

## 🔧 Yapılandırma

### Environment Variables

`.env` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
# API Configuration
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=10000

# Application Settings
VITE_APP_NAME=Sipariş Yönetim Sistemi
VITE_APP_VERSION=1.0.0

# Development Settings
VITE_DEV_PORT=3000
VITE_ENABLE_DEBUG=true

# Feature Flags
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=false
```

### ESLint & Prettier

Kod kalitesi için ESLint ve Prettier yapılandırılmıştır:

```bash
# Lint kontrol
npm run lint

# Prettier ile formatla (manuel)
npx prettier --write "src/**/*.{js,jsx}"
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── layout/              # Layout bileşenleri
│   │   ├── Layout.jsx       # Ana layout wrapper
│   │   └── Navbar.jsx       # Navigation bar
│   └── common/              # Ortak/reusable bileşenler
│       ├── BarcodeGenerator.jsx   # Barkod oluşturucu
│       ├── ConfirmDialog.jsx      # Onay dialogu
│       ├── DataTable.jsx          # Gelişmiş data table
│       ├── ErrorBoundary.jsx      # Hata yakalayıcı
│       ├── FormDialog.jsx         # Form dialogu
│       ├── LoadingSkeleton.jsx    # Loading skeletons
│       ├── RoleSelector.jsx       # Rol seçici
│       └── StatusChip.jsx         # Durum chip'i
├── pages/                   # Sayfa bileşenleri
│   ├── Dashboard.jsx        # Ana sayfa
│   ├── Listeleme.jsx        # Sipariş listeleme
│   ├── Tanimlama.jsx        # Tanımlama sayfası
│   ├── SiparisOnaylama.jsx  # Sipariş onaylama
│   ├── SiparisOlusturma.jsx # Sipariş oluşturma
│   ├── KuralTanimlama.jsx   # Kural tanımlama
│   ├── UretimPlanlama.jsx   # Üretim planlama
│   └── SiparisPdf.jsx       # PDF görüntüleme
├── services/                # API servisleri
│   └── api.js              # Axios instance ve API fonksiyonları
├── context/                 # Context providers
│   └── AuthContext.jsx     # Authentication context
├── utils/                   # Yardımcı fonksiyonlar
│   ├── validationSchemas.js # Yup validation schemas
│   └── notifications.js     # Toast notification helpers
└── assets/                  # Statik dosyalar
```

## 🎯 Kullanım

### Rol Seçimi

İlk girişte kullanıcı rolü seçilir:
- **Patron**: Dashboard, istatistikler ve tüm sayfalara erişim
- **Beyaz Yaka**: Sipariş yönetimi, tanımlama, onaylama işlemleri
- **Mavi Yaka**: Sadece üretim planlama sayfası

### Sipariş Yönetimi

1. **Listeleme**: Tüm siparişleri görüntüleme, arama, filtreleme
2. **Ekleme**: Yeni sipariş oluşturma (validasyon ile)
3. **Düzenleme**: Mevcut siparişi güncelleme
4. **Silme**: Onay dialogu ile güvenli silme

### API Kullanımı

```javascript
import { apiService } from './services/api';

// Tüm kayıtları getir
const data = await apiService.getAll('/siparisler');

// Tek kayıt getir
const order = await apiService.getById('/siparisler', 123);

// Yeni kayıt oluştur
const newOrder = await apiService.create('/siparisler', orderData);

// Kayıt güncelle
const updated = await apiService.update('/siparisler', 123, orderData);

// Kayıt sil
await apiService.delete('/siparisler', 123);
```

### Form Validation

```javascript
import { siparisValidationSchema } from './utils/validationSchemas';

<FormDialog
  validationSchema={siparisValidationSchema}
  defaultValues={formValues}
  onSubmit={handleSubmit}
/>
```

### Notifications

```javascript
import { showSuccess, showError, showWarning, showInfo } from './utils/notifications';

showSuccess('İşlem başarılı!');
showError('Bir hata oluştu!');
showWarning('Dikkat!');
showInfo('Bilgi mesajı');
```

## 🔑 Önemli Notlar

### Güvenlik
- Token localStorage'da saklanıyor (Production için HttpOnly cookie önerilir)
- Rol kontrolü sadece frontend'de (Backend'de de kontrol şart)
- API endpoint'leri environment variable'dan alınıyor

### Performance
- Skeleton screens ile hızlı loading deneyimi
- Pagination ile büyük veri setleri optimize edildi
- Memo kullanımı için gelecek iyileştirmeler planlanmış

### Geliştirme İpuçları
- Form field'ları için `validationSchemas.js` kullanın
- Notification'lar için `notifications.js` helpers'ları kullanın
- Yeni sayfa eklerken `App.jsx` ve `Navbar.jsx` güncelleyin
- Rol bazlı erişim için `AuthContext` kullanın

## 🚧 Gelecek İyileştirmeler

- [ ] TypeScript migration
- [ ] Unit & Integration testler (Vitest)
- [ ] Dark mode
- [ ] i18n (Çoklu dil desteği)
- [ ] Real-time updates (WebSocket)
- [ ] Advanced analytics
- [ ] PWA özellikleri
- [ ] Excel export/import
- [ ] Advanced filtering
- [ ] Drag & drop file upload

## 📄 Lisans

MIT

## 👥 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Proje sahibi: [GitHub](https://github.com/yilmazmurad)

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
