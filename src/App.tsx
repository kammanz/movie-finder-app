import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Homepage from './pages/homepage';
import PrivateRoute from './components/PrivateRoute';
import SavedMovies from './pages/savedMovies';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
