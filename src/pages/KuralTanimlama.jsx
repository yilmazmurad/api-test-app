import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper, TextField, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DataTable from '../components/common/DataTable';
import FormDialog from '../components/common/FormDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';

const KuralTanimlama = () => {
  const [rules, setRules] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [formData, setFormData] = useState({
    kural: '',
    parametre: '',
    deger: '',
    birim: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'kural', headerName: 'Kural Adı' },
    { field: 'parametre', headerName: 'Parametre' },
    { field: 'deger', headerName: 'Değer' },
    { field: 'birim', headerName: 'Birim' },
  ];

  const formFields = [
    { name: 'kural', label: 'Kural Adı', required: true },
    { name: 'parametre', label: 'Parametre', required: true },
    { name: 'deger', label: 'Değer', type: 'number', required: true },
    { name: 'birim', label: 'Birim (₺/m²/adet)', required: true },
  ];

  useEffect(() => {
    // Demo kurallar
    setRules([
      { id: 1, kural: 'Membran Fiyatı', parametre: 'M²', deger: '150', birim: '₺/m²' },
      { id: 2, kural: 'PVC Yüzeyi', parametre: 'M²', deger: '200', birim: '₺/m²' },
      { id: 3, kural: 'İşçilik', parametre: 'Saat', deger: '250', birim: '₺/saat' },
      { id: 4, kural: 'Min. Sipariş', parametre: 'Adet', deger: '5', birim: 'adet' },
    ]);
  }, []);

  const handleAdd = () => {
    setSelectedRule(null);
    setFormData({ kural: '', parametre: '', deger: '', birim: '' });
    setOpenForm(true);
  };

  const handleEdit = (rule) => {
    setSelectedRule(rule);
    setFormData(rule);
    setOpenForm(true);
  };

  const handleDelete = (rule) => {
    setSelectedRule(rule);
    setOpenConfirm(true);
  };

  const handleFormSubmit = (data) => {
    if (selectedRule) {
      setRules(rules.map((r) => (r.id === selectedRule.id ? { ...r, ...data } : r)));
    } else {
      const newRule = { id: Date.now(), ...data };
      setRules([...rules, newRule]);
    }
    setOpenForm(false);
  };

  const handleConfirmDelete = () => {
    setRules(rules.filter((r) => r.id !== selectedRule.id));
    setOpenConfirm(false);
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Kural Tanımlama
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Fiyat ve Parametre Kuralları</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Yeni Kural
            </Button>
          </Box>

          <DataTable columns={columns} data={rules} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fiyat Hesaplama Örneği
            </Typography>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Genişlik (cm)"
                type="number"
                defaultValue="100"
                size="small"
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Yükseklik (cm)"
                type="number"
                defaultValue="200"
                size="small"
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Adet"
                type="number"
                defaultValue="1"
                size="small"
              />
            </Box>

            <Button variant="contained" color="primary" fullWidth>
              Fiyat Hesapla
            </Button>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tahmini Fiyat:</strong> ₺2,500
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Membran: ₺300 + PVC: ₺400 + İşçilik: ₺500 + Diğer: ₺1,300
              </Typography>
            </Alert>
          </Paper>
        </Grid>
      </Grid>

      <FormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleFormSubmit}
        title={selectedRule ? 'Kural Düzenle' : 'Yeni Kural'}
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Kural Sil"
        message={`${selectedRule?.kural} kuralını silmek istediğinize emin misiniz?`}
      />
    </Box>
  );
};

export default KuralTanimlama;
