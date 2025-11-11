import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Grid, Paper } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DataTable from '../components/common/DataTable';
import StatusChip from '../components/common/StatusChip';
import BarcodeGenerator from '../components/common/BarcodeGenerator';
import { apiService } from '../services/api';

const SiparisOnaylama = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const columns = [
    { field: 'id', headerName: 'Sipariş No' },
    { field: 'musteriAdi', headerName: 'Müşteri' },
    { field: 'urunTipi', headerName: 'Ürün' },
    { field: 'olculer', headerName: 'Ölçüler' },
    {
      field: 'fiyat',
      headerName: 'Fiyat',
      renderCell: (row) => `₺${row.fiyat}`,
    },
    {
      field: 'durum',
      headerName: 'Durum',
      renderCell: (row) => <StatusChip status={row.durum} />,
    },
  ];

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      // Demo veri - gerçek API'de /siparisler?durum=teklif kullanılacak
      const data = await apiService.getAll('/products');
      const mappedData = data.slice(0, 6).map((item, index) => ({
        id: `SIP-${3000 + index}`,
        musteriAdi: item.title?.substring(0, 20) || `Müşteri ${index + 1}`,
        urunTipi: ['Kapı', 'Pencere', 'Dolap'][index % 3],
        olculer: `${90 + index * 10}x${210 + index * 5}`,
        fiyat: (2000 + index * 300).toString(),
        durum: ['teklif', 'onaylandi'][index % 2],
        barkod: `BAR${3000 + index}`,
      }));
      setOrders(mappedData);
      setError(null);
    } catch (err) {
      setError('Siparişler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (order) => {
    // Siparişi onayla ve durumu güncelle
    setOrders(
      orders.map((o) =>
        o.id === order.id ? { ...o, durum: 'onaylandi' } : o
      )
    );
    setSelectedOrder({ ...order, durum: 'onaylandi' });
  };

  const handlePrint = (order) => {
    // Çıktı alma işlemi
    alert(`${order.id} için çıktı alınıyor...`);
    console.log('Barkod çıktısı:', order.barkod);
  };

  const handleProductionOrder = (order) => {
    // Üretime iş emri gönder
    setOrders(
      orders.map((o) =>
        o.id === order.id ? { ...o, durum: 'uretimde' } : o
      )
    );
    alert(`${order.id} üretime gönderildi!`);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = (order) => {
    if (window.confirm(`${order.id} nolu siparişi silmek istediğinize emin misiniz?`)) {
      setOrders(orders.filter((o) => o.id !== order.id));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Sipariş Onaylama
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={selectedOrder ? 8 : 12}>
          <DataTable columns={columns} data={orders} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>

        {selectedOrder && (
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Sipariş Detayları
              </Typography>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Sipariş No
                </Typography>
                <Typography variant="h6">{selectedOrder.id}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Müşteri
                </Typography>
                <Typography variant="body1">{selectedOrder.musteriAdi}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Ürün
                </Typography>
                <Typography variant="body1">{selectedOrder.urunTipi}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Ölçüler
                </Typography>
                <Typography variant="body1">{selectedOrder.olculer}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary">
                  Fiyat
                </Typography>
                <Typography variant="h6">₺{selectedOrder.fiyat}</Typography>
              </Box>

              <Box mb={3}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Durum
                </Typography>
                <StatusChip status={selectedOrder.durum} />
              </Box>

              <Box mb={3}>
                <BarcodeGenerator value={selectedOrder.barkod} label="Barkod" />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                {selectedOrder.durum === 'teklif' && (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => handleApprove(selectedOrder)}
                    fullWidth
                  >
                    Onayla
                  </Button>
                )}

                {selectedOrder.durum === 'onaylandi' && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<PrintIcon />}
                      onClick={() => handlePrint(selectedOrder)}
                      fullWidth
                    >
                      Barkod Çıktısı Al
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleProductionOrder(selectedOrder)}
                      fullWidth
                    >
                      Üretime Gönder
                    </Button>
                  </>
                )}

                <Button
                  variant="outlined"
                  onClick={() => setSelectedOrder(null)}
                  fullWidth
                >
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

export default SiparisOnaylama;
