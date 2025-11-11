import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import StatusChip from '../components/common/StatusChip';
import { apiService } from '../services/api';

const Listeleme = () => {
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    siparisNo: '',
    musteriAdi: '',
    urunTipi: '',
    olculer: '',
    fiyat: '',
    durum: 'teklif',
  });

  const columns = [
    { field: 'id', headerName: 'Sipariş No' },
    { field: 'musteriAdi', headerName: 'Müşteri Adı' },
    { field: 'urunTipi', headerName: 'Ürün Tipi' },
    { field: 'olculer', headerName: 'Ölçüler' },
    { 
      field: 'fiyat', 
      headerName: 'Fiyat',
      renderCell: (row) => `₺${row.fiyat || '0'}`,
    },
    {
      field: 'durum',
      headerName: 'Durum',
      renderCell: (row) => <StatusChip status={row.durum || 'bekliyor'} />,
    },
    { 
      field: 'tarih', 
      headerName: 'Tarih',
      renderCell: (row) => row.tarih || new Date().toLocaleDateString('tr-TR'),
    },
  ];

  const formFields = [
    { name: 'siparisNo', label: 'Sipariş No', required: true },
    { name: 'musteriAdi', label: 'Müşteri Adı', required: true },
    { name: 'urunTipi', label: 'Ürün Tipi', required: true },
    { name: 'olculer', label: 'Ölçüler (örn: 100x200)', required: true },
    { name: 'fiyat', label: 'Fiyat', type: 'number', required: true },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Gerçek API'de /siparisler endpoint'i kullanılacak
      const data = await apiService.getAll('/posts');
      // Demo veri dönüşümü
      const mappedData = data.slice(0, 10).map((item, index) => ({
        id: `SIP-${1000 + index}`,
        musteriAdi: item.title?.substring(0, 20) || `Müşteri ${index + 1}`,
        urunTipi: ['Kapı', 'Pencere', 'Dolap', 'Panel'][index % 4],
        olculer: `${80 + index * 10}x${200 + index * 5}`,
        fiyat: (1500 + index * 250).toString(),
        durum: ['teklif', 'onaylandi', 'uretimde', 'tamamlandi'][index % 4],
        tarih: new Date(Date.now() - index * 86400000).toLocaleDateString('tr-TR'),
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

  const handleAdd = () => {
    setSelectedOrder(null);
    setFormData({ siparisNo: '', musteriAdi: '', urunTipi: '', olculer: '', fiyat: '', durum: 'teklif' });
    setOpenForm(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setFormData({
      siparisNo: order.id,
      musteriAdi: order.musteriAdi,
      urunTipi: order.urunTipi,
      olculer: order.olculer,
      fiyat: order.fiyat,
      durum: order.durum,
    });
    setOpenForm(true);
  };

  const handleDelete = (order) => {
    setSelectedOrder(order);
    setOpenConfirm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedOrder) {
        // Güncelleme
        setOrders(orders.map((o) => (o.id === selectedOrder.id ? { ...o, ...data } : o)));
      } else {
        // Ekleme
        const newOrder = {
          id: `SIP-${Date.now()}`,
          ...data,
          tarih: new Date().toLocaleDateString('tr-TR'),
        };
        setOrders([newOrder, ...orders]);
      }
      setOpenForm(false);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setOrders(orders.filter((o) => o.id !== selectedOrder.id));
      setOpenConfirm(false);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (tab === 0) return true; // Tümü
    if (tab === 1) return order.durum === 'teklif';
    if (tab === 2) return order.durum === 'onaylandi';
    if (tab === 3) return order.durum === 'uretimde';
    if (tab === 4) return order.durum === 'tamamlandi';
    return true;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Tüm Siparişler
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Yeni Sipariş
        </Button>
      </Box>

      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Tümü" />
        <Tab label="Teklif" />
        <Tab label="Onaylandı" />
        <Tab label="Üretimde" />
        <Tab label="Tamamlandı" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataTable
        columns={columns}
        data={filteredOrders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={selectedOrder ? 'Sipariş Düzenle' : 'Yeni Sipariş'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Sipariş Sil"
        message={`${selectedOrder?.id} nolu siparişi silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default Listeleme;
