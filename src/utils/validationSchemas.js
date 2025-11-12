import * as yup from 'yup';

// Sipariş validasyon şeması
export const siparisValidationSchema = yup.object().shape({
  siparisNo: yup
    .string()
    .required('Sipariş numarası zorunludur')
    .min(3, 'Sipariş numarası en az 3 karakter olmalıdır'),
  musteriAdi: yup
    .string()
    .required('Müşteri adı zorunludur')
    .min(2, 'Müşteri adı en az 2 karakter olmalıdır')
    .max(100, 'Müşteri adı en fazla 100 karakter olabilir'),
  urunTipi: yup.string().required('Ürün tipi seçilmelidir'),
  olculer: yup
    .string()
    .required('Ölçüler zorunludur')
    .matches(/^\d+x\d+$/, 'Ölçüler "100x200" formatında olmalıdır'),
  fiyat: yup
    .number()
    .required('Fiyat zorunludur')
    .positive('Fiyat pozitif olmalıdır')
    .min(1, 'Fiyat en az 1 TL olmalıdır'),
});

// Müşteri bilgileri validasyon şeması
export const musteriValidationSchema = yup.object().shape({
  musteriAdi: yup
    .string()
    .required('Müşteri adı zorunludur')
    .min(2, 'Müşteri adı en az 2 karakter olmalıdır')
    .max(100, 'Müşteri adı en fazla 100 karakter olabilir'),
  telefon: yup
    .string()
    .required('Telefon numarası zorunludur')
    .matches(/^[0-9]{10}$/, 'Telefon numarası 10 haneli olmalıdır'),
  email: yup
    .string()
    .email('Geçerli bir email adresi giriniz')
    .nullable(),
  adres: yup.string().max(500, 'Adres en fazla 500 karakter olabilir').nullable(),
});

// Ürün özellikleri validasyon şeması
export const urunValidationSchema = yup.object().shape({
  urunTipi: yup.string().required('Ürün tipi seçilmelidir'),
  genislik: yup
    .number()
    .required('Genişlik zorunludur')
    .positive('Genişlik pozitif olmalıdır')
    .min(10, 'Genişlik en az 10 cm olmalıdır')
    .max(1000, 'Genişlik en fazla 1000 cm olabilir'),
  yukseklik: yup
    .number()
    .required('Yükseklik zorunludur')
    .positive('Yükseklik pozitif olmalıdır')
    .min(10, 'Yükseklik en az 10 cm olmalıdır')
    .max(1000, 'Yükseklik en fazla 1000 cm olabilir'),
  adet: yup
    .number()
    .required('Adet zorunludur')
    .positive('Adet pozitif olmalıdır')
    .integer('Adet tam sayı olmalıdır')
    .min(1, 'Adet en az 1 olmalıdır'),
  malzeme: yup.string().required('Malzeme seçilmelidir'),
  renk: yup.string().required('Renk seçilmelidir'),
  notlar: yup.string().max(1000, 'Notlar en fazla 1000 karakter olabilir').nullable(),
});

// Login validasyon şeması
export const loginValidationSchema = yup.object().shape({
  username: yup.string().required('Kullanıcı adı zorunludur'),
  password: yup
    .string()
    .required('Şifre zorunludur')
    .min(6, 'Şifre en az 6 karakter olmalıdır'),
});

// Kural tanımlama validasyon şeması
export const kuralValidationSchema = yup.object().shape({
  kuralAdi: yup.string().required('Kural adı zorunludur'),
  kosul: yup.string().required('Koşul zorunludur'),
  deger: yup.number().required('Değer zorunludur').positive('Değer pozitif olmalıdır'),
  durum: yup.boolean(),
});
