import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { apiService } from '../services/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: '1',
  });

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'userId', headerName: 'Kullanıcı ID' },
    { field: 'title', headerName: 'Başlık' },
    {
      field: 'body',
      headerName: 'İçerik',
      renderCell: (row) => row.body.substring(0, 50) + '...',
    },
  ];

  const formFields = [
    { name: 'title', label: 'Başlık', required: true },
    {
      name: 'body',
      label: 'İçerik',
      required: true,
      multiline: true,
      rows: 4,
    },
    { name: 'userId', label: 'Kullanıcı ID', type: 'number', required: true },
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll('/posts');
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Gönderiler yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPost(null);
    setFormData({ title: '', body: '', userId: '1' });
    setOpenForm(true);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      userId: post.userId.toString(),
    });
    setOpenForm(true);
  };

  const handleDelete = (post) => {
    setSelectedPost(post);
    setOpenConfirm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      const postData = {
        ...data,
        userId: parseInt(data.userId),
      };

      if (selectedPost) {
        await apiService.update('/posts', selectedPost.id, postData);
        setPosts(posts.map((p) => (p.id === selectedPost.id ? { ...p, ...postData } : p)));
      } else {
        const newPost = await apiService.create('/posts', postData);
        setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
      }
      setOpenForm(false);
    } catch (err) {
      console.error('Form submit error:', err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await apiService.delete('/posts', selectedPost.id);
      setPosts(posts.filter((p) => p.id !== selectedPost.id));
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
          Gönderiler
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Yeni Gönderi
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <DataTable
        columns={columns}
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={selectedPost ? 'Gönderi Düzenle' : 'Yeni Gönderi'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Gönderi Sil"
        message={`"${selectedPost?.title}" başlıklı gönderiyi silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default Posts;
