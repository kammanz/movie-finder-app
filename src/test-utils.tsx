import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// The function to generate a unique query client for each test
const generateQueryClient = () => {
  return new QueryClient();
};

// Make the function that's going to wrap the component before render
// We'll also optionally take a client. If we want a particular test to override the query client above (ie. generateQueryClient), if we need specific options
// The function will return a RenderResult (ie. what you get when you run render in testing library)
export const renderWithQueryClient = (
  ui: ReactElement,
  client?: QueryClient
): RenderResult => {
  // Create a query client if we didnt get one
  // Does this by evaluating the 'client' variable
  const queryClient = client ?? generateQueryClient();

  // Remember, we are dealing with React Testing Library, so we need to render the component first, with the render function.
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

// import React, { ReactElement } from 'react';
// import { render, RenderOptions } from '@testing-library/react';
// import AuthProvider from './context/AuthContext';

// const AllProviders = ({ children }: { children: React.ReactNode }) => {
//   return <AuthProvider>{children}</AuthProvider>;
// };

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>
// ) => render(ui, { wrapper: AllProviders, ...options });

// export * from '@testing-library/react';
// export { customRender as render };
export {};
