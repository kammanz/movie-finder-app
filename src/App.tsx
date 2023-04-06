import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from './react-query/queryClient';
import Form from './pages/signin/Form';
import Homepage from './pages/homepage';
import PrivateRoute from './components/PrivateRoute';
import SavedMovies from './pages/savedMovies';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Form formType="signup" />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Form formType="login" />} />
        </Routes>
        <Routes>
          <React.Fragment>
            {/* <Navbar /> */}
            <Route element={<PrivateRoute />}>
              {/* <Navbar /> */}
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/savedMovies" element={<SavedMovies />} />

              {/* <Route path="/homepage" element={<Homepage />} /> */}
            </Route>
          </React.Fragment>
        </Routes>
        {/* <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/savedMovies" element={<SavedMovies />} />
          </Route>
        </Routes> */}
      </Container>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
