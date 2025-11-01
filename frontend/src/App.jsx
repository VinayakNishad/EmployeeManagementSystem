import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import EmployeeManagement from './components/EmployeeManagement';
import './index.css';
import { ToastContainer } from 'react-toastify';

function App() {
  useEffect(() => {
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    bootstrapLink.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
    bootstrapLink.crossOrigin = 'anonymous';

    if (!document.querySelector(`link[href="${bootstrapLink.href}"]`)) {
      document.head.appendChild(bootstrapLink);
    }
  }, []);

  return (
    <Container fluid="lg" className="mt-4 mb-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <EmployeeManagement />
    </Container>
  );
}

export default App;
