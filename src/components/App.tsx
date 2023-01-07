import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signup from './Signup';
import Login from './Login';
import Form from './Form';
import UserPage from './UserPage';

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Routes>
        <Route path="/" element={<Form isSignup={true} />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Form isSignup={false} />} />
      </Routes>
      <Routes>
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
    </Container>
  );
};

export default App;
