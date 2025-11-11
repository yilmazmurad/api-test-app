import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  const statusConfig = {
    teklif: { label: 'Teklif', color: '#2196F3' },
    onaylandi: { label: 'Onaylandı', color: '#4CAF50' },
    uretimde: { label: 'Üretimde', color: '#FF9800' },
    tamamlandi: { label: 'Tamamlandı', color: '#9C27B0' },
    iptal: { label: 'İptal', color: '#F44336' },
    bekliyor: { label: 'Bekliyor', color: '#757575' },
  };

  const config = statusConfig[status] || statusConfig.bekliyor;

  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.color,
        color: 'white',
        fontWeight: 'bold',
      }}
    />
  );
};

export default StatusChip;
