import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { apiService } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Ürün Adı' },
    {
      field: 'price',
      headerName: 'Fiyat',
      renderCell: (row) => `$${row.price}`,
    },
    {
      field: 'category',
      headerName: 'Kategori',
      renderCell: (row) => (
        <Chip label={row.category} size="small" color="primary" />
      ),
    },
    {
      field: 'description',
      headerName: 'Açıklama',
      renderCell: (row) => row.description?.substring(0, 40) + '...' || '-',
    },
  ];

  const formFields = [
    { name: 'title', label: 'Ürün Adı', required: true },
    { name: 'price', label: 'Fiyat', type: 'number', required: true },
    { name: 'category', label: 'Kategori', required: true },
    {
      name: 'description',
      label: 'Açıklama',
      required: false,
      multiline: true,
      rows: 3,
    },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll('/products');
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Ürünler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setFormData({ title: '', price: '', description: '', category: '' });
    setOpenForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description || '',
      category: product.category || '',
    });
    setOpenForm(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenConfirm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        price: parseFloat(data.price),
      };

      if (selectedProduct) {
        await apiService.update('/products', selectedProduct.id, productData);
        setProducts(
          products.map((p) => (p.id === selectedProduct.id ? { ...p, ...productData } : p))
        );
      } else {
        const newProduct = await apiService.create('/products', productData);
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      }
      setOpenForm(false);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await apiService.delete('/products', selectedProduct.id);
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
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
          Ürünler
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Yeni Ürün
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={selectedProduct ? 'Ürün Düzenle' : 'Yeni Ürün'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Ürün Sil"
        message={`"${selectedProduct?.title}" adlı ürünü silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default Products;
