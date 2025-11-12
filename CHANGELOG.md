# Changelog

Projedeki tüm önemli değişiklikler bu dosyada belgelenmiştir.

## [1.1.0] - 2025-11-12

### ✨ Yeni Özellikler

#### 🎯 Form Validation Sistemi
- React Hook Form entegrasyonu
- Yup schema-based validation
- Otomatik hata mesajları
- Form state yönetimi

#### 🔔 Notification Sistemi
- react-toastify entegrasyonu
- Başarı, hata, uyarı, bilgi bildirimleri
- Merkezi notification helpers
- API hatalarında otomatik bildirim

#### 🛡️ Error Boundary
- Hata yakalama komponenti
- Kullanıcı dostu hata sayfası
- Development modunda detaylı hata bilgisi
- Production'da güvenli gösterim

#### 🔐 Authentication Context
- AuthContext ile merkezi state yönetimi
- Rol bazlı yetkilendirme (patron, beyaz-yaka, mavi-yaka)
- `useAuth` custom hook
- Login/logout fonksiyonları

#### 💎 Loading States
- Skeleton screen components
- TableSkeleton, CardSkeleton, DashboardSkeleton
- FormSkeleton
- Daha iyi UX

#### 🔍 Advanced DataTable
- Anlık arama (tüm kolonlarda)
- Sıralama (her kolon için)
- Pagination (5/10/25/50)
- Türkçe lokalizasyon

#### 📊 Excel Logic Integration
- VLOOKUP → vlookup() fonksiyonu
- SUMIF → sumif() fonksiyonu
- IF+ISERROR → vlookupSafe()
- String concatenation helpers
- Ürün katalogu
- Müşteri listesi
- Sipariş hesaplama fonksiyonları

#### 🛠️ Utility Functions
- Currency formatters
- Date formatters
- Phone formatters
- Text helpers (truncate, capitalize)
- Array helpers (groupBy, sortBy)
- File helpers (size, extension)
- Clipboard helpers

#### 📝 Constants & Configuration
- Centralized constants
- Role definitions
- Order status definitions
- Product types
- Validation rules
- Route constants
- Storage keys

### 🔧 İyileştirmeler

#### API Service
- Gelişmiş error handling
- Otomatik 401 handling
- PATCH method desteği
- Query params desteği
- Environment variable kullanımı
- Response interceptor iyileştirmesi

#### FormDialog Component
- React Hook Form entegrasyonu
- Schema validation desteği
- Select field desteği
- Disabled state
- Loading state
- Error display

#### DataTable Component
- Search functionality
- Sort functionality
- Pagination
- Configurable props
- Better performance

### 📚 Dokümantasyon

- ✅ README.md güncellemesi (kapsamlı)
- ✅ IMPROVEMENTS.md (detaylı iyileştirme raporu)
- ✅ QUICKSTART.md (hızlı başlangıç kılavuzu)
- ✅ EXCEL_IMPROVEMENTS.md (Excel analizi ve entegrasyon)
- ✅ .env.example (environment variables)

### 🔧 Geliştirici Deneyimi

- ESLint configuration güncellendi
- Prettier configuration eklendi
- .prettierignore eklendi
- npm scripts eklendi (lint, format)
- Better error messages

### 📦 Yeni Bağımlılıklar

```json
{
  "react-hook-form": "^7.66.0",
  "yup": "^1.7.1",
  "@hookform/resolvers": "^5.2.2",
  "react-toastify": "^11.0.5",
  "xlsx": "^0.18.5",
  "date-fns": "^4.1.0"
}
```

### 🗂️ Yeni Dosyalar

#### Context
- `src/context/AuthContext.jsx`

#### Utils
- `src/utils/validationSchemas.js`
- `src/utils/notifications.js`
- `src/utils/excelLogic.js`
- `src/utils/helpers.js`
- `src/utils/constants.js`

#### Components
- `src/components/common/ErrorBoundary.jsx`
- `src/components/common/LoadingSkeleton.jsx`

#### Config
- `.env.example`
- `.prettierrc`
- `.prettierignore`
- `CHANGELOG.md`

### 🔄 Güncellenen Dosyalar

- `src/App.jsx` - ErrorBoundary, AuthProvider, ToastContainer
- `src/services/api.js` - Error handling, notifications
- `src/components/common/DataTable.jsx` - Search, sort, pagination
- `src/components/common/FormDialog.jsx` - React Hook Form
- `src/pages/Listeleme.jsx` - Validation, notifications, skeleton
- `eslint.config.js` - Better rules
- `package.json` - Scripts, dependencies
- `README.md` - Comprehensive documentation

---

## [1.0.0] - 2025-11-01

### İlk Sürüm

#### Temel Özellikler
- React 18 + Vite setup
- Material UI entegrasyonu
- React Router v6
- Axios HTTP client
- Rol bazlı dashboard
- Sipariş listeleme
- Sipariş oluşturma (temel)
- PDF generation (jsPDF)
- Barkod generator

#### Sayfalar
- Dashboard
- Listeleme
- Tanımlama
- Sipariş Onaylama
- Kural Tanımlama
- Sipariş Oluşturma
- Üretim Planlama
- Sipariş PDF

#### Components
- Layout & Navbar
- DataTable (basic)
- FormDialog (basic)
- ConfirmDialog
- StatusChip
- BarcodeGenerator
- RoleSelector

---

## Versiyon Notları

### Semantic Versioning
Bu proje [Semantic Versioning](https://semver.org/) kullanmaktadır.

- **MAJOR** version: Geriye uyumsuz değişiklikler
- **MINOR** version: Yeni özellikler (geriye uyumlu)
- **PATCH** version: Bug fix'ler (geriye uyumlu)

### Changelog Kategorileri

- ✨ **Yeni Özellikler** - Yeni fonksiyonaliteler
- 🔧 **İyileştirmeler** - Mevcut özelliklerin iyileştirilmesi
- 🐛 **Bug Fix** - Hata düzeltmeleri
- 📚 **Dokümantasyon** - Dökümantasyon değişiklikleri
- 🔒 **Güvenlik** - Güvenlik yamalar
- ⚡ **Performans** - Performans iyileştirmeleri
- 🎨 **UI/UX** - Arayüz değişiklikleri
- ♻️ **Refactor** - Kod yeniden yapılandırma
- 🗑️ **Deprecated** - Yakında kaldırılacak özellikler
- 🚮 **Removed** - Kaldırılan özellikler
