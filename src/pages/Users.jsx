import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { apiService } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Ad Soyad' },
    { field: 'email', headerName: 'E-posta' },
    { field: 'phone', headerName: 'Telefon' },
    { field: 'website', headerName: 'Web Sitesi' },
  ];

  const formFields = [
    { name: 'name', label: 'Ad Soyad', required: true },
    { name: 'email', label: 'E-posta', type: 'email', required: true },
    { name: 'phone', label: 'Telefon', required: true },
    { name: 'website', label: 'Web Sitesi', required: false },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll('/users');
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', phone: '', website: '' });
    setOpenForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website || '',
    });
    setOpenForm(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenConfirm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (selectedUser) {
        // Güncelleme
        await apiService.update('/users', selectedUser.id, data);
        setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u)));
      } else {
        // Ekleme
        const newUser = await apiService.create('/users', data);
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
      }
      setOpenForm(false);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await apiService.delete('/users', selectedUser.id);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
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
          Kullanıcılar
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Yeni Kullanıcı
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataTable
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Kullanıcıyı Sil"
        message={`${selectedUser?.name} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default Users;
