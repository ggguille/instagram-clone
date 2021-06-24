/* eslint-disable no-undef */
describe('Login page', () => {
  const url = `${Cypress.env('INT_TEST_HOST')}/login`;
  const loginEmail = Cypress.env('INT_TEST_LOGIN_EMAIL');
  const loginPassword = Cypress.env('INT_TEST_LOGIN_PWD');

  it('Visit login', () => {
    cy.visit(url);
    cy.title().should('eq', 'Login - Instagram Clone');
  });

  it('Verify content', () => {
    cy.get('img[src="/images/logo.png"]').should('have.attr', 'alt', 'Instagram Clone');

    cy.get('form').within(() => {
      cy.root()
        .get('input[type="text"]')
        .should('have.attr', 'placeholder', 'Email address')
        .should('have.attr', 'aria-label', 'Enter your email address');

      cy.root()
        .get('input[type="password"]')
        .should('have.attr', 'placeholder', 'Password')
        .should('have.attr', 'aria-label', 'Enter your password');
      cy.root()
        .get('button')
        .should('have.attr', 'type', 'submit')
        .should('have.text', 'Log In')
        .should('be.disabled');
    });

    cy.get('p')
      .last()
      .should(($p) => expect($p.text()).to.contain("Don't have an account?"));
    cy.get('a[href="/signup"]').should('have.text', 'Sign up');
  });

  it('Login', () => {
    cy.get('form').within(() => {
      cy.root().get('input[type="text"]').type(loginEmail);
      cy.root().get('input[type="password"]').type(loginPassword);
      cy.root().get('button').click();
    });
  });
});
