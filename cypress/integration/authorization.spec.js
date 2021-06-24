/* eslint-disable no-undef */
describe('Visits without authorization', () => {
  it('Redirect to login', () => {
    cy.visit(Cypress.env('INT_TEST_HOST'));
    cy.location('pathname').should('eq', '/login');
  });
});
