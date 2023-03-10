import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Form from '../pages/signin/Form';
import UserPage from '../pages/user/UserPage';
import PrivateRoute from './PrivateRoute';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="">
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
      </Container>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
