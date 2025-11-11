import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import BarcodeGenerator from '../components/common/BarcodeGenerator';

const SiparisOlusturma = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    musteriAdi: '',
    telefon: '',
    urunTipi: '',
    genislik: '',
    yukseklik: '',
    adet: '1',
    malzeme: '',
    renk: '',
    notlar: '',
  });
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const steps = ['Müşteri Bilgileri', 'Ürün Özellikleri', 'Fiyat ve Onay'];

  const productTypes = ['Kapı', 'Pencere', 'Dolap', 'Panel', 'Diğer'];
  const materials = ['Membran', 'PVC', 'Ahşap', 'Metal', 'Karma'];
  const colors = ['Beyaz', 'Siyah', 'Kahverengi', 'Gri', 'Özel Renk'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Fiyat hesapla
      const genislik = parseFloat(orderData.genislik) || 0;
      const yukseklik = parseFloat(orderData.yukseklik) || 0;
      const adet = parseFloat(orderData.adet) || 1;
      const alan = (genislik * yukseklik) / 10000; // m²
      const basePrice = alan * 500 * adet; // ₺500/m²
      setCalculatedPrice(Math.round(basePrice));
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const siparisNo = `SIP-${Date.now()}`;
    alert(`Sipariş oluşturuldu!\nSipariş No: ${siparisNo}\nFiyat: ₺${calculatedPrice}`);
    // Reset form
    setOrderData({
      musteriAdi: '',
      telefon: '',
      urunTipi: '',
      genislik: '',
      yukseklik: '',
      adet: '1',
      malzeme: '',
      renk: '',
      notlar: '',
    });
    setActiveStep(0);
    setCalculatedPrice(0);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Sipariş Oluşturma
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 4 }}>
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Müşteri Bilgileri
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Müşteri Adı"
                name="musteriAdi"
                value={orderData.musteriAdi}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefon"
                name="telefon"
                value={orderData.telefon}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notlar"
                name="notlar"
                value={orderData.notlar}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ürün Özellikleri
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Ürün Tipi"
                name="urunTipi"
                value={orderData.urunTipi}
                onChange={handleInputChange}
                required
              >
                {productTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Malzeme"
                name="malzeme"
                value={orderData.malzeme}
                onChange={handleInputChange}
                required
              >
                {materials.map((mat) => (
                  <MenuItem key={mat} value={mat}>
                    {mat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Genişlik (cm)"
                name="genislik"
                type="number"
                value={orderData.genislik}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Yükseklik (cm)"
                name="yukseklik"
                type="number"
                value={orderData.yukseklik}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Adet"
                name="adet"
                type="number"
                value={orderData.adet}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Renk"
                name="renk"
                value={orderData.renk}
                onChange={handleInputChange}
              >
                {colors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Sipariş Özeti ve Fiyat
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>Tahmini Fiyat:</strong> ₺{calculatedPrice.toLocaleString('tr-TR')}
                </Typography>
              </Alert>

              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Müşteri:</strong> {orderData.musteriAdi}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Telefon:</strong> {orderData.telefon}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Ürün:</strong> {orderData.urunTipi}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Ölçüler:</strong> {orderData.genislik}x{orderData.yukseklik} cm
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Adet:</strong> {orderData.adet}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Malzeme:</strong> {orderData.malzeme}
                </Typography>
                <Typography variant="body2">
                  <strong>Renk:</strong> {orderData.renk || '-'}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <BarcodeGenerator value={`SIP${Date.now()}`} label="Sipariş Barkodu" />
              </Box>
            </Grid>
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Geri
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <>
                <Button variant="outlined" sx={{ mr: 2 }} startIcon={<SaveIcon />}>
                  Taslak Kaydet
                </Button>
                <Button variant="contained" onClick={handleSubmit} startIcon={<SendIcon />}>
                  Siparişi Gönder
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                İleri
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SiparisOlusturma;
