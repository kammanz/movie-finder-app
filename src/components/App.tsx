import React from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup';

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: 400 }}>
        <Signup />
      </div>
    </Container>
  );
};

export default App;
