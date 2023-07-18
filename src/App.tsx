import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Homepage from './pages/homepage';
import SavedMovies from './pages/savedMovies';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
    </Routes>
  );
};

export default App;
