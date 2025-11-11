import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ApiIcon from '@mui/icons-material/Api';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // localStorage değişikliklerini izle
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };

    // Storage event dinleyicisi ekle
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getNavItems = () => {
    const allItems = [
      { title: 'Anasayfa', path: '/', icon: <DashboardIcon />, roles: ['patron', 'beyaz-yaka', 'mavi-yaka'] },
      { title: 'Listeleme', path: '/listeleme', icon: <ListAltIcon />, roles: ['beyaz-yaka'] },
      { title: 'Tanımlama', path: '/tanimlama', icon: <CategoryIcon />, roles: ['beyaz-yaka'] },
      { title: 'Sipariş Onaylama', path: '/siparis-onaylama', icon: <CheckCircleIcon />, roles: ['beyaz-yaka'] },
      { title: 'Kural Tanımlama', path: '/kural-tanimlama', icon: <SettingsIcon />, roles: ['beyaz-yaka'] },
      { title: 'Sipariş Oluşturma', path: '/siparis-olusturma', icon: <ShoppingCartIcon />, roles: ['beyaz-yaka'] },
      { title: 'Üretim Planlama', path: '/uretim-planlama', icon: <PrecisionManufacturingIcon />, roles: ['beyaz-yaka', 'mavi-yaka'] },
      { title: 'Sipariş PDF', path: '/siparis-pdf', icon: <PictureAsPdfIcon />, roles: ['beyaz-yaka'] },
    ];

    // Rol varsa filtrele, yoksa hiç menü gösterme
    if (!userRole) return [];
    return allItems.filter(item => item.roles.includes(userRole));
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  // Eğer rol seçilmemişse navbar'ı gösterme
  if (!userRole) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <ApiIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: 4 }}>
          Sipariş Yönetim Sistemi
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              color="inherit"
              startIcon={item.icon}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.2)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
        <Button
          color="inherit"
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{ ml: 2, border: '1px solid rgba(255,255,255,0.5)' }}
        >
          Çıkış
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
