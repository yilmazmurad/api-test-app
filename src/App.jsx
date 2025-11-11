import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Listeleme from './pages/Listeleme';
import Tanimlama from './pages/Tanimlama';
import SiparisOnaylama from './pages/SiparisOnaylama';
import KuralTanimlama from './pages/KuralTanimlama';
import SiparisOlusturma from './pages/SiparisOlusturma';
import UretimPlanlama from './pages/UretimPlanlama';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/listeleme" element={<Listeleme />} />
            <Route path="/tanimlama" element={<Tanimlama />} />
            <Route path="/siparis-onaylama" element={<SiparisOnaylama />} />
            <Route path="/kural-tanimlama" element={<KuralTanimlama />} />
            <Route path="/siparis-olusturma" element={<SiparisOlusturma />} />
            <Route path="/uretim-planlama" element={<UretimPlanlama />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
