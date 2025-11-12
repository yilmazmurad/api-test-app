import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Listeleme from './pages/Listeleme';
import Tanimlama from './pages/Tanimlama';
import SiparisOnaylama from './pages/SiparisOnaylama';
import KuralTanimlama from './pages/KuralTanimlama';
import SiparisOlusturma from './pages/SiparisOlusturma';
import UretimPlanlama from './pages/UretimPlanlama';
import SiparisPdf from './pages/SiparisPdf';

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
    <ErrorBoundary>
      <AuthProvider>
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
                <Route path="/siparis-pdf" element={<SiparisPdf />} />
              </Routes>
            </Layout>
          </BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App
