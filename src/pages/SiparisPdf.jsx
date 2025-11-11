import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SiparisPdf = () => {
  const [orders] = useState([
    {
      id: 1,
      siparisNo: 'SIP-2024-001',
      musteri: 'ABC Mobilya Ltd.',
      urun: 'Mutfak Kapağı',
      adet: 12,
      genislik: 60,
      yukseklik: 120,
      toplam: 4320,
      durum: 'teklif',
      tarih: '2024-11-10',
    },
    {
      id: 2,
      siparisNo: 'SIP-2024-002',
      musteri: 'XYZ Dekorasyon',
      urun: 'Banyo Dolabı',
      adet: 8,
      genislik: 80,
      yukseklik: 100,
      toplam: 3200,
      durum: 'onaylandi',
      tarih: '2024-11-09',
    },
    {
      id: 3,
      siparisNo: 'SIP-2024-003',
      musteri: 'Ege Yapı',
      urun: 'Ofis Kapağı',
      adet: 25,
      genislik: 70,
      yukseklik: 140,
      toplam: 12250,
      durum: 'uretimde',
      tarih: '2024-11-08',
    },
    {
      id: 4,
      siparisNo: 'SIP-2024-004',
      musteri: 'Marmara İnşaat',
      urun: 'Yatak Odası',
      adet: 15,
      genislik: 90,
      yukseklik: 200,
      toplam: 13500,
      durum: 'tamamlandi',
      tarih: '2024-11-05',
    },
    {
      id: 5,
      siparisNo: 'SIP-2024-005',
      musteri: 'Akdeniz Mobilya',
      urun: 'Gardrop Kapağı',
      adet: 20,
      genislik: 100,
      yukseklik: 220,
      toplam: 22000,
      durum: 'onaylandi',
      tarih: '2024-11-07',
    },
  ]);

  const statusConfig = {
    teklif: { label: 'Teklif', color: 'info' },
    onaylandi: { label: 'Onaylandı', color: 'success' },
    uretimde: { label: 'Üretimde', color: 'warning' },
    tamamlandi: { label: 'Tamamlandı', color: 'secondary' },
    iptal: { label: 'İptal', color: 'error' },
  };

  // Tek sipariş için PDF oluştur
  const generateSinglePDF = (order) => {
    const doc = new jsPDF();

    // Türkçe karakter desteği için font ekle (basit çözüm)
    doc.setFont('helvetica');

    // Başlık
    doc.setFontSize(20);
    doc.text('SIPARIS DETAYI', 105, 20, { align: 'center' });

    // Çizgi
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // Sipariş bilgileri
    doc.setFontSize(12);
    let yPos = 40;

    doc.setFont('helvetica', 'bold');
    doc.text('Siparis No:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(order.siparisNo, 70, yPos);
    yPos += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Musteri:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(order.musteri, 70, yPos);
    yPos += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Tarih:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(order.tarih, 70, yPos);
    yPos += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Durum:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(statusConfig[order.durum].label, 70, yPos);
    yPos += 15;

    // Ürün detayları tablosu
    doc.autoTable({
      startY: yPos,
      head: [['Urun', 'Adet', 'Genislik (cm)', 'Yukseklik (cm)', 'Toplam (TL)']],
      body: [[order.urun, order.adet, order.genislik, order.yukseklik, `${order.toplam.toLocaleString('tr-TR')} TL`]],
      theme: 'grid',
      headStyles: { fillColor: [25, 118, 210], textColor: 255, fontStyle: 'bold' },
      styles: { font: 'helvetica', fontSize: 11, cellPadding: 5 },
    });

    // Alt bilgi
    yPos = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Bu belge elektronik ortamda olusturulmustur.', 105, yPos, { align: 'center' });
    doc.text('Siparis Yonetim Sistemi - ' + new Date().toLocaleDateString('tr-TR'), 105, yPos + 5, {
      align: 'center',
    });

    // PDF'i indir
    doc.save(`Siparis_${order.siparisNo}.pdf`);
  };

  // Tüm siparişler için PDF oluştur
  const generateAllPDF = () => {
    const doc = new jsPDF();

    // Başlık
    doc.setFontSize(20);
    doc.text('SIPARIS LISTESI', 105, 20, { align: 'center' });

    // Tarih
    doc.setFontSize(10);
    doc.text(`Rapor Tarihi: ${new Date().toLocaleDateString('tr-TR')}`, 105, 28, { align: 'center' });

    // Çizgi
    doc.setLineWidth(0.5);
    doc.line(20, 32, 190, 32);

    // Tablo verisi hazırla
    const tableData = orders.map((order) => [
      order.siparisNo,
      order.musteri,
      order.urun,
      order.adet,
      `${order.genislik}x${order.yukseklik}`,
      `${order.toplam.toLocaleString('tr-TR')} TL`,
      statusConfig[order.durum].label,
    ]);

    // Tablo oluştur
    doc.autoTable({
      startY: 40,
      head: [['Siparis No', 'Musteri', 'Urun', 'Adet', 'Olcu (cm)', 'Toplam', 'Durum']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [25, 118, 210],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
      },
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: 4,
      },
      columnStyles: {
        0: { cellWidth: 28 },
        1: { cellWidth: 35 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 25, halign: 'center' },
        5: { cellWidth: 28, halign: 'right' },
        6: { cellWidth: 24, halign: 'center' },
      },
    });

    // Özet bilgiler
    const yPos = doc.lastAutoTable.finalY + 15;
    const toplamSiparis = orders.length;
    const toplamTutar = orders.reduce((sum, order) => sum + order.toplam, 0);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`Toplam Siparis: ${toplamSiparis}`, 20, yPos);
    doc.text(`Toplam Tutar: ${toplamTutar.toLocaleString('tr-TR')} TL`, 20, yPos + 8);

    // Alt bilgi
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Bu rapor elektronik ortamda olusturulmustur.', 105, yPos + 25, { align: 'center' });
    doc.text('Siparis Yonetim Sistemi', 105, yPos + 30, { align: 'center' });

    // PDF'i indir
    doc.save(`Siparis_Listesi_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Sipariş PDF Çıktıları
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={generateAllPDF}
          size="large"
        >
          Tüm Siparişleri İndir (PDF)
        </Button>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>
                  <strong>Sipariş No</strong>
                </TableCell>
                <TableCell>
                  <strong>Müşteri</strong>
                </TableCell>
                <TableCell>
                  <strong>Ürün</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Adet</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Ölçü (cm)</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Toplam</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Durum</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>PDF</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.siparisNo}</TableCell>
                  <TableCell>{order.musteri}</TableCell>
                  <TableCell>{order.urun}</TableCell>
                  <TableCell align="center">{order.adet}</TableCell>
                  <TableCell align="center">
                    {order.genislik} x {order.yukseklik}
                  </TableCell>
                  <TableCell align="right">₺{order.toplam.toLocaleString('tr-TR')}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={statusConfig[order.durum].label}
                      color={statusConfig[order.durum].color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="PDF İndir">
                      <IconButton color="error" onClick={() => generateSinglePDF(order)}>
                        <PictureAsPdfIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mt: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" gutterBottom>
          📋 PDF Özellikleri
        </Typography>
        <Box component="ul" sx={{ mt: 2 }}>
          <li>
            <Typography variant="body2">✅ Tek tek sipariş PDF'i indirebilirsiniz</Typography>
          </li>
          <li>
            <Typography variant="body2">✅ Tüm siparişleri tek PDF'te indirebilirsiniz</Typography>
          </li>
          <li>
            <Typography variant="body2">✅ PDF'ler otomatik tarih damgalıdır</Typography>
          </li>
          <li>
            <Typography variant="body2">✅ Profesyonel tablo formatında raporlama</Typography>
          </li>
        </Box>
      </Paper>
    </Box>
  );
};

export default SiparisPdf;
