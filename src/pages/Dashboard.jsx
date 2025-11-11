import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RoleSelector from '../components/common/RoleSelector';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedRole, setSelectedRole] = useState(localStorage.getItem('userRole'));
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'mavi-yaka') {
      // Mavi yaka için direkt üretim planlama sayfasına yönlendir
      navigate('/uretim-planlama');
    }
  }, [navigate]);

  const patronStats = [
    {
      title: 'Günlük Siparişler',
      value: '12',
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      description: 'Bugün alınan sipariş',
    },
    {
      title: 'Bekleyen Onaylar',
      value: '5',
      icon: <PendingActionsIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      description: 'Onay bekleyen',
    },
    {
      title: 'Üretimdeki İşler',
      value: '8',
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      description: 'Aktif üretim',
    },
    {
      title: 'Tamamlanan',
      value: '23',
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      description: 'Bu hafta tamamlanan',
    },
  ];

  const dailyRevenue = {
    title: 'Günlük Para Girişi',
    value: '₺45,280',
    subValues: [
      { label: 'Nakit', value: '₺18,500' },
      { label: 'Kredi Kartı', value: '₺16,300' },
      { label: 'Havale', value: '₺10,480' },
    ],
    icon: <AttachMoneyIcon sx={{ fontSize: 50 }} />,
    color: '#4caf50',
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'mavi-yaka') {
      // Mavi yaka için direkt üretim planlama sayfasına yönlendir
      setTimeout(() => {
        navigate('/uretim-planlama');
      }, 500);
    }
  };

  // Rol seçilmemişse rol seçim ekranını göster
  if (!selectedRole) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Sipariş Yönetim Sistemine Hoş Geldiniz
        </Typography>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </Box>
    );
  }

  // Mavi yaka için boş sayfa (zaten yönlendirilecek)
  if (selectedRole === 'mavi-yaka') {
    return null;
  }

  // Patron için günlük sipariş ve para girişi
  if (selectedRole === 'patron') {
    return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Patron Paneli
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={5}>
            <Card
              elevation={4}
              sx={{
                background: `linear-gradient(135deg, ${dailyRevenue.color} 0%, ${dailyRevenue.color}dd 100%)`,
                color: 'white',
                height: '100%',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {dailyRevenue.title}
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {dailyRevenue.value}
                    </Typography>
                  </Box>
                  <Box>{dailyRevenue.icon}</Box>
                </Box>
                <Box mt={3}>
                  {dailyRevenue.subValues.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">{item.label}:</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {patronStats.slice(0, 3).map((stat, index) => (
            <Grid item xs={12} md={7 / 3} sm={4} key={index}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      backgroundColor: stat.color,
                      color: 'white',
                      mb: 2,
                      mx: 'auto',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {stat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    backgroundColor: patronStats[3].color,
                    color: 'white',
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  {patronStats[3].icon}
                </Box>
                <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
                  {patronStats[3].value}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                  {patronStats[3].title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {patronStats[3].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Günlük Özet
          </Typography>
          <Typography variant="body1" paragraph>
            Bugünkü iş akışınızın özeti. Tüm finansal ve operasyonel metrikleri tek bir ekranda görüntüleyin.
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <li><Typography variant="body2">💰 Günlük nakit akışı takibi</Typography></li>
            <li><Typography variant="body2">📊 Sipariş durumu istatistikleri</Typography></li>
            <li><Typography variant="body2">🏭 Üretim performans göstergeleri</Typography></li>
            <li><Typography variant="body2">✅ Tamamlanan işler özeti</Typography></li>
          </Box>
        </Paper>
      </Box>
    );
  }

  // Beyaz yaka için tam erişim
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Beyaz Yaka Paneli
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={4}
            sx={{
              background: `linear-gradient(135deg, ${dailyRevenue.color} 0%, ${dailyRevenue.color}dd 100%)`,
              color: 'white',
              height: '100%',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {dailyRevenue.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="bold">
                    {dailyRevenue.value}
                  </Typography>
                </Box>
                <Box>{dailyRevenue.icon}</Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {patronStats.slice(0, 3).map((stat, index) => (
          <Grid item xs={12} md={4 / 1.5} sm={6} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    backgroundColor: stat.color,
                    color: 'white',
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={3}
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: patronStats[3].color,
                  color: 'white',
                  mb: 2,
                  mx: 'auto',
                }}
              >
                {patronStats[3].icon}
              </Box>
              <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                {patronStats[3].value}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                {patronStats[3].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {patronStats[3].description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Sistem Bilgileri
        </Typography>
        <Typography variant="body1" paragraph>
          Bu sistem üzerinden tüm sipariş süreçlerinizi yönetebilirsiniz.
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li><Typography variant="body2">✅ Sipariş takibi ve yönetimi</Typography></li>
          <li><Typography variant="body2">✅ Barkod ile üretim izleme</Typography></li>
          <li><Typography variant="body2">✅ Otomatik fiyat hesaplama</Typography></li>
          <li><Typography variant="body2">✅ Malzeme stok takibi (Membran, PVC yüzeyi)</Typography></li>
          <li><Typography variant="body2">✅ Üretim planlama ve iş emri</Typography></li>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
