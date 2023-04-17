import React from 'react';
import Form from '../Form3';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

it('mounts', async () => {
  cy.mount(
    <MemoryRouter initialEntries={['/f']}>
      <Routes>
        <Route path={'/:segment'} element={<Form formType="signup" />} />
      </Routes>
    </MemoryRouter>
  );
  cy.get('[for="email"]').should('have.text', 'Email');
  cy.get('[for="password"]').should('have.text', 'Password');

  cy.get('#email').type('jane@gmail.com');
  cy.get('#password').type('123456');
  cy.get('[type="submit"').click();
});
