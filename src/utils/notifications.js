import { toast } from 'react-toastify';

/**
 * Başarılı işlem bildirimi göster
 * @param {string} message - Gösterilecek mesaj
 */
export const showSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Hata bildirimi göster
 * @param {string} message - Gösterilecek hata mesajı
 */
export const showError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Bilgi bildirimi göster
 * @param {string} message - Gösterilecek bilgi mesajı
 */
export const showInfo = (message) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * Uyarı bildirimi göster
 * @param {string} message - Gösterilecek uyarı mesajı
 */
export const showWarning = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

/**
 * API hatalarını kullanıcı dostu mesajlara çevir
 * @param {Error} error - API hatası
 * @returns {string} Kullanıcı dostu hata mesajı
 */
export const getErrorMessage = (error) => {
  if (error.response) {
    // Sunucu yanıt verdi ama hata kodu döndü
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;

    if (message) return message;

    switch (status) {
      case 400:
        return 'Geçersiz istek. Lütfen bilgilerinizi kontrol edin.';
      case 401:
        return 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
      case 403:
        return 'Bu işlem için yetkiniz bulunmamaktadır.';
      case 404:
        return 'İstenen kaynak bulunamadı.';
      case 409:
        return 'Bu kayıt zaten mevcut.';
      case 422:
        return 'Gönderilen veriler geçersiz.';
      case 500:
        return 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.';
      case 503:
        return 'Servis şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.';
      default:
        return `Bir hata oluştu (${status}). Lütfen tekrar deneyin.`;
    }
  } else if (error.request) {
    // İstek yapıldı ama yanıt alınamadı
    return 'Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.';
  } else {
    // İstek oluşturulurken hata oluştu
    return error.message || 'Beklenmeyen bir hata oluştu.';
  }
};
