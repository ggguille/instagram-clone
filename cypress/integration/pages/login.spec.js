/* eslint-disable no-undef */
describe('Login page', () => {
  const url = Cypress.env('INT_TEST_HOST');
  const loginUrl = `${url}/login`;
  const dashboardUrl = `${url}/`;

  const loginEmail = Cypress.env('INT_TEST_LOGIN_EMAIL');
  const loginPassword = Cypress.env('INT_TEST_LOGIN_PWD');

  it('Visit login', () => {
    cy.visit(loginUrl);
    cy.title().should('eq', 'Login - Instagram Clone');
  });

  it('Verify content', () => {
    cy.get('img[src="/images/logo.png"]').should('have.attr', 'alt', 'Instagram Clone');

    cy.get('form').within(() => {
      cy.get('input[type="text"]')
        .should('have.attr', 'placeholder', 'Email address')
        .should('have.attr', 'aria-label', 'Enter your email address');

      cy.get('input[type="password"]')
        .should('have.attr', 'placeholder', 'Password')
        .should('have.attr', 'aria-label', 'Enter your password');
      cy.get('button')
        .should('have.attr', 'type', 'submit')
        .should('have.text', 'Log In')
        .should('be.disabled');
    });

    cy.get('p')
      .last()
      .should(($p) => expect($p.text()).to.contain("Don't have an account?"));
    cy.get('a[href="/signup"]').should('have.text', 'Sign up');
  });

  it('Login - error (bad email format)', () => {
    cy.get('form').within(() => {
      cy.get('input[type="text"]').type('not an email');
      cy.get('input[type="password"]').type('anything');
      cy.get('button').click();
    });
    cy.get('p')
      .first()
      .should('be.visible')
      .should('have.text', 'The email address is badly formatted.');
  });

  it('Login - error (bad access)', () => {
    cy.get('form').within(() => {
      cy.get('input[type="text"]').type('notexists@mail.com');
      cy.get('input[type="password"]').type('anything');
      cy.get('button').click();
    });
    cy.get('p')
      .first()
      .should('be.visible')
      .should(
        'have.text',
        'There is no user record corresponding to this identifier. The user may have been deleted.'
      );
  });

  it('Login - success', () => {
    cy.get('form').within(() => {
      cy.get('input[type="text"]').type(loginEmail);
      cy.get('input[type="password"]').type(loginPassword);
      cy.get('button').click();
    });
    cy.url().should('eq', dashboardUrl);
  });
});
