# React + Vite

# API Test App

Modern ve kullanıcı dostu bir API test ortamı. React, Vite ve Material UI kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- ✅ CRUD işlemleri (Create, Read, Update, Delete)
- ✅ Modern ve responsive tasarım
- ✅ Material UI bileşenleri
- ✅ React Router ile sayfa yönlendirme
- ✅ Axios ile API entegrasyonu
- ✅ Form validasyonu
- ✅ Silme onay diyalogları
- ✅ Loading durumları

## 🛠️ Teknolojiler

- React 18
- Vite
- Material UI (MUI)
- React Router v6
- Axios

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

## 🔧 Yapılandırma

`.env` dosyasında API endpoint'inizi ayarlayın:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── layout/          # Layout bileşenleri
│   └── common/          # Ortak bileşenler
├── pages/               # Sayfa bileşenleri
├── services/            # API servisleri
└── utils/               # Yardımcı fonksiyonlar
```

## 🎯 Kullanım

1. **Kullanıcılar**: Kullanıcı CRUD işlemleri
2. **Gönderiler**: İçerik yönetimi
3. **Ürünler**: Ürün yönetimi

Her modülde listeleme, ekleme, düzenleme ve silme işlemleri yapabilirsiniz.

## 📄 Lisans

MIT

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
