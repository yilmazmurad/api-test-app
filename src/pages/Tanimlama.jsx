import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Tabs, Tab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { apiService } from '../services/api';

const Tanimlama = () => {
  const [tab, setTab] = useState(0); // 0: Ürünler, 1: Müşteriler
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const productColumns = [
    { field: 'id', headerName: 'Ürün Kodu' },
    { field: 'urunAdi', headerName: 'Ürün Adı' },
    { field: 'kategori', headerName: 'Kategori' },
    { field: 'birimFiyat', headerName: 'Birim Fiyat', renderCell: (row) => `₺${row.birimFiyat}` },
    { field: 'malzeme', headerName: 'Malzeme' },
  ];

  const customerColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'musteriAdi', headerName: 'Müşteri Adı' },
    { field: 'telefon', headerName: 'Telefon' },
    { field: 'adres', headerName: 'Adres' },
    { field: 'firma', headerName: 'Firma' },
  ];

  const productFields = [
    { name: 'urunAdi', label: 'Ürün Adı', required: true },
    { name: 'kategori', label: 'Kategori (Kapı/Pencere/Dolap)', required: true },
    { name: 'birimFiyat', label: 'Birim Fiyat', type: 'number', required: true },
    { name: 'malzeme', label: 'Malzeme Bilgisi', required: false },
  ];

  const customerFields = [
    { name: 'musteriAdi', label: 'Müşteri Adı', required: true },
    { name: 'telefon', label: 'Telefon', required: true },
    { name: 'adres', label: 'Adres', multiline: true, rows: 2, required: false },
    { name: 'firma', label: 'Firma', required: false },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Demo veri - gerçek API'de /urunler ve /musteriler kullanılacak
      const productData = await apiService.getAll('/products');
      const customerData = await apiService.getAll('/users');
      
      setProducts(productData.slice(0, 8).map((item, index) => ({
        id: `URN-${1000 + index}`,
        urunAdi: item.title?.substring(0, 25) || `Ürün ${index + 1}`,
        kategori: ['Kapı', 'Pencere', 'Dolap', 'Panel'][index % 4],
        birimFiyat: (500 + index * 100).toString(),
        malzeme: ['Membran', 'PVC', 'Ahşap', 'Metal'][index % 4],
      })));

      setCustomers(customerData.slice(0, 10).map((item, index) => ({
        id: `MUS-${2000 + index}`,
        musteriAdi: item.name || `Müşteri ${index + 1}`,
        telefon: item.phone || '0532 XXX XX XX',
        adres: item.address?.street || 'Adres bilgisi yok',
        firma: item.company?.name || '-',
      })));
      
      setError(null);
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    if (tab === 0) {
      setFormData({ urunAdi: '', kategori: '', birimFiyat: '', malzeme: '' });
    } else {
      setFormData({ musteriAdi: '', telefon: '', adres: '', firma: '' });
    }
    setOpenForm(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setOpenForm(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setOpenConfirm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (tab === 0) {
        // Ürün işlemleri
        if (selectedItem) {
          setProducts(products.map((p) => (p.id === selectedItem.id ? { ...p, ...data } : p)));
        } else {
          const newProduct = { id: `URN-${Date.now()}`, ...data };
          setProducts([newProduct, ...products]);
        }
      } else {
        // Müşteri işlemleri
        if (selectedItem) {
          setCustomers(customers.map((c) => (c.id === selectedItem.id ? { ...c, ...data } : c)));
        } else {
          const newCustomer = { id: `MUS-${Date.now()}`, ...data };
          setCustomers([newCustomer, ...customers]);
        }
      }
      setOpenForm(false);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (tab === 0) {
        setProducts(products.filter((p) => p.id !== selectedItem.id));
      } else {
        setCustomers(customers.filter((c) => c.id !== selectedItem.id));
      }
      setOpenConfirm(false);
    } catch (err) {
      console.error('Delete error:', err);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Tanımlama
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          {tab === 0 ? 'Yeni Ürün' : 'Yeni Müşteri'}
        </Button>
      </Box>

      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Ürün Tanımlama" />
        <Tab label="Müşteri Tanımlama" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {tab === 0 ? (
        <DataTable
          columns={productColumns}
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <DataTable
          columns={customerColumns}
          data={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={
          selectedItem
            ? tab === 0
              ? 'Ürün Düzenle'
              : 'Müşteri Düzenle'
            : tab === 0
            ? 'Yeni Ürün'
            : 'Yeni Müşteri'
        }
        fields={tab === 0 ? productFields : customerFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title={tab === 0 ? 'Ürün Sil' : 'Müşteri Sil'}
        message={`${selectedItem?.urunAdi || selectedItem?.musteriAdi} silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default Tanimlama;
