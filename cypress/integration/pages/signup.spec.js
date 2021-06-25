/* eslint-disable no-undef */
describe('Sign up page', () => {
  const url = Cypress.env('INT_TEST_HOST');
  const signUpUrl = `${url}/signup`;
  const dashboardUrl = `${url}/`;

  beforeEach(() => {
    cy.fixture('signup_users.json').as('signUpUsers');
  });

  it('Visit sign up', () => {
    cy.visit(signUpUrl);
    cy.title().should('eq', 'Signup - Instagram Clone');
  });

  it('Verify content', () => {
    cy.get('img[src="/images/logo.png"]').should('have.attr', 'alt', 'Instagram Clone');

    cy.get('form').within(() => {
      cy.get('input[name="username"]')
        .should('have.attr', 'type', 'text')
        .should('have.attr', 'placeholder', 'Username')
        .should('have.attr', 'aria-label', 'Enter your username');
      cy.get('input[name="fullname"]')
        .should('have.attr', 'type', 'text')
        .should('have.attr', 'placeholder', 'Full name')
        .should('have.attr', 'aria-label', 'Enter your full name');
      cy.get('input[name="email"]')
        .should('have.attr', 'type', 'text')
        .should('have.attr', 'placeholder', 'Email address')
        .should('have.attr', 'aria-label', 'Enter your email address');
      cy.get('input[name="password"]')
        .should('have.attr', 'type', 'password')
        .should('have.attr', 'placeholder', 'Password')
        .should('have.attr', 'aria-label', 'Enter your password');
      cy.get('button')
        .should('have.attr', 'type', 'submit')
        .should('have.text', 'Sign Up')
        .should('be.disabled');
    });

    cy.get('p')
      .last()
      .should(($p) => expect($p.text()).to.contain('Have an account?'));
    cy.get('a[href="/login"]').should('have.text', 'Log in');
  });

  it('Sign up - error (username exists)', function () {
    const {
      existing_user: { username, fullname, email, password }
    } = this.signUpUsers;
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="fullname"]').type(fullname);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button').click();
    });
    cy.get('p.text-red-primary')
      .should('be.visible')
      .should('have.text', `Username "${username}" already exists`);
  });

  it('Sign up - error (bad email format)', function () {
    const {
      not_email_user: { username, fullname, email, password }
    } = this.signUpUsers;
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="fullname"]').type(fullname);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button').click();
    });
    cy.get('p.text-red-primary')
      .should('be.visible')
      .should('have.text', 'The email address is badly formatted.');
  });

  it('Sign up - error (short password)', function () {
    const {
      short_pwd_user: { username, fullname, email, password }
    } = this.signUpUsers;
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="fullname"]').type(fullname);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button').click();
    });
    cy.get('p.text-red-primary')
      .should('be.visible')
      .should('have.text', 'Password should be at least 6 characters');
  });
  /**
  * TODO: clean testing user before start
  it('Sign up - success', function () {
    const {
      success_user: { username, fullname, email, password }
    } = this.signUpUsers;
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="fullname"]').type(fullname);
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button').click();
    });
    cy.url().should('eq', dashboardUrl);
  });
  */
});
