/* eslint-disable no-undef */

describe('Verify authorization', () => {
  const url = Cypress.env('INT_TEST_HOST');
  const uid = Cypress.env('INT_TEST_UID');
  it('No authorization (redirect to login)', () => {
    cy.visit(url);
    cy.location('pathname').should('eq', '/login');
  });

  it('Authorization (no redirection)', () => {
    cy.login(uid);
    cy.visit(url);
    cy.location('pathname').should('eq', '/');
  });
});
