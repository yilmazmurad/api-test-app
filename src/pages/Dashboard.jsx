import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import ApiIcon from '@mui/icons-material/Api';

const Dashboard = () => {
  const stats = [
    {
      title: 'Kullanıcılar',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      description: 'Kullanıcı yönetimi',
    },
    {
      title: 'Gönderiler',
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      description: 'İçerik yönetimi',
    },
    {
      title: 'Ürünler',
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      description: 'Ürün yönetimi',
    },
    {
      title: 'API Test',
      icon: <ApiIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      description: 'Canlı API testi',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Anasayfa
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
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
                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
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

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Hoşgeldiniz! 🎉
        </Typography>
        <Typography variant="body1" paragraph>
          Bu uygulama, API'lerinizi test etmek için tasarlanmış canlı bir test ortamıdır.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Yukarıdaki modüllerden birini seçerek CRUD işlemlerini gerçekleştirebilirsiniz:
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li><Typography variant="body2">✅ Veri listeleme</Typography></li>
          <li><Typography variant="body2">✅ Yeni kayıt ekleme</Typography></li>
          <li><Typography variant="body2">✅ Kayıt düzenleme</Typography></li>
          <li><Typography variant="body2">✅ Kayıt silme</Typography></li>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
