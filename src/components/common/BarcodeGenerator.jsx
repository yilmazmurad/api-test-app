import { Box, Typography, Paper } from '@mui/material';

const BarcodeGenerator = ({ value, label }) => {
  // Basit barkod gösterimi - gerçek projede react-barcode kullanılabilir
  const barcodeValue = value || '000000000000';
  
  return (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', maxWidth: 300 }}>
      <Typography variant="caption" color="text.secondary" gutterBottom>
        {label || 'Sipariş No'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2px',
          my: 2,
          height: 60,
        }}
      >
        {barcodeValue.split('').map((digit, index) => (
          <Box
            key={index}
            sx={{
              width: index % 2 === 0 ? '4px' : '2px',
              height: '100%',
              backgroundColor: 'black',
            }}
          />
        ))}
      </Box>
      <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
        {barcodeValue}
      </Typography>
    </Paper>
  );
};

export default BarcodeGenerator;
