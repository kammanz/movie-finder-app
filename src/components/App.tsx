import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Form from './Form';
import UserPage from './UserPage';
import PrivateRoute from './PrivateRoute';
import List from './List';

const App = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Routes>
        <Route path="/" element={<Form formType="signup" />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Form formType="login" />} />
      </Routes>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/userPage" element={<UserPage />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/list" element={<List />} />
      </Routes>
    </Container>
  );
};

export default App;
