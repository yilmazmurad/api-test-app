import { Container } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        {children}
      </Container>
    </>
  );
};

export default Layout;
