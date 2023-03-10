import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const generateQueryClient = () => {
  return new QueryClient();
};

export const renderWithQueryClient = (
  ui: ReactElement,
  client?: QueryClient
): RenderResult => {
  const queryClient = client ?? generateQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

export {};
