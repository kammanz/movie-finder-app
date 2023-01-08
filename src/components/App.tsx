import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Signup from './Signup';
import Login from './Login';
// import Form from './Form';
import Form3 from './Form3';
import UserPage from './UserPage';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Routes>
        <Route path="/" element={<Form3 />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/userPage" element={<UserPage />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
