import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Container } from 'react-bootstrap';
import Form from './components/form';
import Homepage from './pages/homepage';
import PrivateRoute from './components/PrivateRoute';
import SavedMovies from './pages/savedMovies';

const App = () => {
  return (
    // <Container>
    <div>
      <Routes>
        <Route path="/" element={<Form formType="signup" />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Form formType="login" />} />
      </Routes>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
        </Route>
      </Routes>
    </div>

    // </Container>
  );
};

export default App;
