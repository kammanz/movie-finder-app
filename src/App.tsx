import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './react-query/queryClient';
import Form from './components/form/Form3';
import Homepage from './pages/homepage';
import PrivateRoute from './components/PrivateRoute';
import SavedMovies from './pages/savedMovies';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
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
      </Container>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
