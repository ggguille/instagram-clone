/* eslint-disable no-undef */
describe('Visits without authorization', () => {
  it('Redirect to login', () => {
    cy.visit('http://localhost:3000');
    cy.location('pathname').should('eq', '/login');
  });
});
