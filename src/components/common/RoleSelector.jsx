import { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import EngineeringIcon from '@mui/icons-material/Engineering';

const RoleSelector = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'patron',
      title: 'Patron',
      icon: <PersonIcon sx={{ fontSize: 60 }} />,
      color: '#1976d2',
      description: 'Tüm sistem erişimi',
    },
    {
      id: 'beyaz-yaka',
      title: 'Beyaz Yaka',
      icon: <WorkIcon sx={{ fontSize: 60 }} />,
      color: '#2e7d32',
      description: 'Sipariş ve teklif yönetimi',
    },
    {
      id: 'mavi-yaka',
      title: 'Mavi Yaka',
      icon: <EngineeringIcon sx={{ fontSize: 60 }} />,
      color: '#ed6c02',
      description: 'Üretim takip ve izleme',
    },
  ];

  const handleRoleClick = (roleId) => {
    setSelectedRole(roleId);
    if (onRoleSelect) {
      onRoleSelect(roleId);
    }
    // LocalStorage'a kaydet
    localStorage.setItem('userRole', roleId);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
        Giriş Bölümü
      </Typography>
      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} sm={4} key={role.id}>
            <Card
              elevation={selectedRole === role.id ? 8 : 3}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: selectedRole === role.id ? `3px solid ${role.color}` : 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
              onClick={() => handleRoleClick(role.id)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: role.color,
                    color: 'white',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {role.icon}
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {role.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {role.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoleSelector;
