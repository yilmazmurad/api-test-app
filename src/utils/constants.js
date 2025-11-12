// Application Constants

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Sipariş Yönetim Sistemi';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

// User Roles
export const ROLES = {
  PATRON: 'patron',
  BEYAZ_YAKA: 'beyaz-yaka',
  MAVI_YAKA: 'mavi-yaka',
};

export const ROLE_LABELS = {
  [ROLES.PATRON]: 'Patron',
  [ROLES.BEYAZ_YAKA]: 'Beyaz Yaka',
  [ROLES.MAVI_YAKA]: 'Mavi Yaka',
};

// Order Status
export const ORDER_STATUS = {
  TEKLIF: 'teklif',
  ONAYLANDI: 'onaylandi',
  URETIMDE: 'uretimde',
  TAMAMLANDI: 'tamamlandi',
  IPTAL: 'iptal',
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.TEKLIF]: 'Teklif',
  [ORDER_STATUS.ONAYLANDI]: 'Onaylandı',
  [ORDER_STATUS.URETIMDE]: 'Üretimde',
  [ORDER_STATUS.TAMAMLANDI]: 'Tamamlandı',
  [ORDER_STATUS.IPTAL]: 'İptal',
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.TEKLIF]: 'warning',
  [ORDER_STATUS.ONAYLANDI]: 'info',
  [ORDER_STATUS.URETIMDE]: 'primary',
  [ORDER_STATUS.TAMAMLANDI]: 'success',
  [ORDER_STATUS.IPTAL]: 'error',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_TEXT_LENGTH: 500,
  MAX_NOTES_LENGTH: 1000,
  PHONE_LENGTH: 10,
  MIN_PRODUCT_WIDTH: 10,
  MAX_PRODUCT_WIDTH: 1000,
  MIN_PRODUCT_HEIGHT: 10,
  MAX_PRODUCT_HEIGHT: 1000,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 9999,
  MIN_PRICE: 1,
  MAX_PRICE: 999999,
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Table Configuration
export const TABLE_CONFIG = {
  defaultPageSize: 10,
  stickyHeader: true,
  maxHeight: 600,
};

// File Upload
export const ALLOWED_FILE_TYPES = {
  EXCEL: ['.xlsx', '.xls', '.xlsm'],
  PDF: ['.pdf'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif'],
  DOCUMENT: ['.doc', '.docx', '.txt'],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Routes
export const ROUTES = {
  HOME: '/',
  LISTELEME: '/listeleme',
  TANIMLAMA: '/tanimlama',
  SIPARIS_ONAYLAMA: '/siparis-onaylama',
  KURAL_TANIMLAMA: '/kural-tanimlama',
  SIPARIS_OLUSTURMA: '/siparis-olusturma',
  URETIM_PLANLAMA: '/uretim-planlama',
  SIPARIS_PDF: '/siparis-pdf',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_ROLE: 'userRole',
  USER_DATA: 'user',
  AUTH_TOKEN: 'token',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#4caf50',
  WARNING: '#ff9800',
  ERROR: '#f44336',
  INFO: '#2196f3',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.',
  UNAUTHORIZED: 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
  FORBIDDEN: 'Bu işlem için yetkiniz bulunmamaktadır.',
  NOT_FOUND: 'İstenen kaynak bulunamadı.',
  SERVER_ERROR: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
  VALIDATION_ERROR: 'Gönderilen veriler geçersiz.',
  UNKNOWN_ERROR: 'Beklenmeyen bir hata oluştu.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Kayıt başarıyla oluşturuldu.',
  UPDATED: 'Kayıt başarıyla güncellendi.',
  DELETED: 'Kayıt başarıyla silindi.',
  SAVED: 'Kayıt başarıyla kaydedildi.',
};

// Product Types (Excel KAPILAR sayfasından)
export const PRODUCT_TYPES = {
  TAKIM_KAPI: 'TAKIM KAPI',
  SURGU_KAPI: 'SÜRGÜ KAPI',
  PANEL: 'PANEL',
  DOLAP: 'DOLAP',
};

// Materials
export const MATERIALS = ['Membran', 'PVC', 'Ahşap', 'Metal', 'Karma'];

// Colors
export const COLORS = ['Beyaz', 'Siyah', 'Kahverengi', 'Gri', 'Ceviz', 'Özel Renk'];

// Units
export const UNITS = {
  ADET: 'ADET',
  M2: 'M2',
  METRE: 'METRE',
  KG: 'KG',
};

// Production Status
export const PRODUCTION_STATUS = {
  BEKLEMEDE: 'beklemede',
  HAZIRLANIYOR: 'hazirlaniyor',
  URETIMDE: 'uretimde',
  KALITE_KONTROL: 'kalite-kontrol',
  TAMAMLANDI: 'tamamlandi',
};

export const PRODUCTION_STATUS_LABELS = {
  [PRODUCTION_STATUS.BEKLEMEDE]: 'Beklemede',
  [PRODUCTION_STATUS.HAZIRLANIYOR]: 'Hazırlanıyor',
  [PRODUCTION_STATUS.URETIMDE]: 'Üretimde',
  [PRODUCTION_STATUS.KALITE_KONTROL]: 'Kalite Kontrol',
  [PRODUCTION_STATUS.TAMAMLANDI]: 'Tamamlandı',
};
