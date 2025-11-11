import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
} from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DataTable from '../components/common/DataTable';
import StatusChip from '../components/common/StatusChip';
import BarcodeGenerator from '../components/common/BarcodeGenerator';

const UretimPlanlama = () => {
  const [productions, setProductions] = useState([]);
  const [selectedProduction, setSelectedProduction] = useState(null);

  const columns = [
    { field: 'siparisNo', headerName: 'Sipariş No' },
    { field: 'urun', headerName: 'Ürün' },
    { field: 'adet', headerName: 'Adet' },
    {
      field: 'durum',
      headerName: 'Durum',
      renderCell: (row) => <StatusChip status={row.durum} />,
    },
    {
      field: 'ilerleme',
      headerName: 'İlerleme',
      renderCell: (row) => (
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={row.ilerleme} />
          <Typography variant="caption">{row.ilerleme}%</Typography>
        </Box>
      ),
    },
    { field: 'baslangic', headerName: 'Başlangıç' },
    { field: 'teslimTarihi', headerName: 'Teslim' },
  ];

  useEffect(() => {
    // Demo üretim verileri
    setProductions([
      {
        id: 1,
        siparisNo: 'SIP-3001',
        urun: 'Beyaz PVC Kapı',
        adet: 2,
        durum: 'uretimde',
        ilerleme: 65,
        baslangic: '10.11.2025',
        teslimTarihi: '15.11.2025',
        malzemeler: { membran: '4 m²', pvc: '5 m²', aksesuarlar: 'Komplet' },
        barkod: 'BAR3001',
      },
      {
        id: 2,
        siparisNo: 'SIP-3002',
        urun: 'Ahşap Pencere',
        adet: 3,
        durum: 'uretimde',
        ilerleme: 30,
        baslangic: '11.11.2025',
        teslimTarihi: '16.11.2025',
        malzemeler: { ahsap: '6 m²', cam: '3 m²', aksesuarlar: 'Komplet' },
        barkod: 'BAR3002',
      },
      {
        id: 3,
        siparisNo: 'SIP-3003',
        urun: 'Metal Dolap',
        adet: 1,
        durum: 'onaylandi',
        ilerleme: 0,
        baslangic: '-',
        teslimTarihi: '18.11.2025',
        malzemeler: { metal: '8 m²', boya: '2 L', aksesuarlar: 'Komplet' },
        barkod: 'BAR3003',
      },
    ]);
  }, []);

  const handleStartProduction = (production) => {
    setProductions(
      productions.map((p) =>
        p.id === production.id
          ? { ...p, durum: 'uretimde', ilerleme: 10, baslangic: new Date().toLocaleDateString('tr-TR') }
          : p
      )
    );
  };

  const handleCompleteProduction = (production) => {
    setProductions(
      productions.map((p) =>
        p.id === production.id ? { ...p, durum: 'tamamlandi', ilerleme: 100 } : p
      )
    );
  };

  const handleEdit = (production) => {
    setSelectedProduction(production);
  };

  const handleDelete = () => {};

  const stats = [
    {
      title: 'Üretimdeki İşler',
      value: productions.filter((p) => p.durum === 'uretimde').length,
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />,
      color: '#FF9800',
    },
    {
      title: 'Bekleyen İşler',
      value: productions.filter((p) => p.durum === 'onaylandi').length,
      icon: <HourglassEmptyIcon sx={{ fontSize: 40 }} />,
      color: '#2196F3',
    },
    {
      title: 'Tamamlanan',
      value: productions.filter((p) => p.durum === 'tamamlandi').length,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Üretim Planlama
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
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
                <Typography variant="h3" align="center" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={selectedProduction ? 8 : 12}>
          <DataTable columns={columns} data={productions} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>

        {selectedProduction && (
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Üretim Detayları
              </Typography>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Sipariş No
                </Typography>
                <Typography variant="h6">{selectedProduction.siparisNo}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Ürün
                </Typography>
                <Typography variant="body1">{selectedProduction.urun}</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Durum
                </Typography>
                <StatusChip status={selectedProduction.durum} />
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  İlerleme
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={selectedProduction.ilerleme}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption">{selectedProduction.ilerleme}%</Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Malzemeler
                </Typography>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  {Object.entries(selectedProduction.malzemeler).map(([key, value]) => (
                    <Typography key={key} variant="body2">
                      • {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </Typography>
                  ))}
                </Paper>
              </Box>

              <Box mb={3}>
                <BarcodeGenerator value={selectedProduction.barkod} label="İş Emri Barkodu" />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                {selectedProduction.durum === 'onaylandi' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStartProduction(selectedProduction)}
                    fullWidth
                  >
                    Üretime Başla
                  </Button>
                )}

                {selectedProduction.durum === 'uretimde' && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleCompleteProduction(selectedProduction)}
                    fullWidth
                  >
                    Üretimi Tamamla
                  </Button>
                )}

                <Button variant="outlined" onClick={() => setSelectedProduction(null)} fullWidth>
                  Kapat
                </Button>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UretimPlanlama;
