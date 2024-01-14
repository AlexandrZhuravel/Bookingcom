/// <reference types="cypress" />

describe('1.Login page UI tests', () => {
  let loginData;
  let urlList;
  const unregisterMail = 'test@test.test'

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
    cy.fixture('urlList').then((data) => {
      urlList = data;
    });
  });

  it('1.1.Login with valid data from main page(Positive)', () => {
    cy.intercept('POST', '/api/identity/authenticate/v1.0/sign_in/password/submit*').as('passwordSubmit')

    cy.log('1.1.1.Open main page')
    cy.visit(urlList.mainPageUrl);
    cy.log('1.1.2.Click on "Sign in" button')
    cy.get('[data-testid="header-sign-in-button"]').click()
    cy.log('1.1.3. Type user mail in "Email address" input field')
    cy.get('[data-ga-label="username"]').type(loginData.email)
    cy.log('1.1.4. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.1.5. Type user password in "Password" input field')
    cy.get('[data-ga-label="password"]').type(loginData.password)
    cy.log('1.1.6. Click on "Sign in" button')
    cy.get('button').contains('Sign in').click()
    cy.log('1.1.7. Check POST "/api/identity/authenticate/v1.0/sign_in/password/submit" request receives response with "200" code')
    cy.wait('@passwordSubmit').its('response.statusCode').should('eq', 200)
  });

  it('1.2.Login without filling "Email address" input field(Negative)', () => {
    cy.log('1.2.1. Open login page')
    cy.visit(loginData.loginPageUrl)
    cy.log('1.2.2. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.2.3. Check error message contains "Enter your email address" text')
    cy.get('#username-note').should('be.visible').and('contain.text', 'Enter your email address')
  });

  it('1.3.Login by filling "Email address" input field with invalid mail(Negative)', () => {
    cy.log('1.3.1. Open login page')
    cy.visit(loginData.loginPageUrl)
    cy.log('1.3.2. Type invalid mail in "Email address" input field')
    cy.get('[data-ga-label="username"]').type(loginData.password)
    cy.log('1.3.3. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.3.4. Check error message contains "Make sure the email address you entered is correct." text')
    cy.get('#username-note').should('be.visible').and('contain.text', 'Make sure the email address you entered is correct.')
  });

  it('1.4.Login by filling "Email address" input field with unregistered mail(Negative)', () => {
    cy.log('1.4.1. Open login page')
    cy.visit(loginData.loginPageUrl)
    cy.log('1.4.2. Type unregistered mail in "Email address" input field')
    cy.get('[data-ga-label="username"]').type(unregisterMail)
    cy.log('1.4.3. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.4.4. Check error message contains "Make sure the email address you entered is correct." text')
    cy.get('#username-note').should('be.visible').and('contain.text', 'Make sure the email address you entered is correct.')
  });

  it('1.5.Login without filling "Password" input field(Negative)', () => {
    cy.log('1.5.1. Open login page')
    cy.visit(loginData.loginPageUrl)
    cy.log('1.5.2. Type user mail in "Email address" input field')
    cy.get('[data-ga-label="username"]').type(loginData.email)
    cy.log('1.5.3. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.5.4. Click on "Sign in" button')
    cy.get('button').contains('Sign in').click()
    cy.log('1.5.5. Check error message contains "Enter your Booking.com password" text')
    cy.get('#password-note').should('be.visible').and('contain.text', 'Enter your Booking.com password')
    cy.log('1.5.6. Check "Password" input field contains error symbol')
    cy.get('.password-input-container').find('[xmlns="http://www.w3.org/2000/svg"]').should('be.visible')
  });

  it('1.6.Login by filling "Password" input field with unregistered password(Negative)', () => {
    cy.intercept('POST', '/api/identity/authenticate/v1.0/sign_in/password/submit').as('passwordSubmit')

    cy.log('1.6.1. Open login page')
    cy.visit(loginData.loginPageUrl)
    cy.log('1.6.2. Type user mail in "Email address" input field')
    cy.get('[data-ga-label="username"]').type(loginData.email)
    cy.log('1.6.3. Click on "Continue with email" button')
    cy.get('button').contains('Continue with email').click()
    cy.log('1.6.4. Type unregistered password in "Password" input field')
    cy.get('[data-ga-label="password"]').type(loginData.email)
    cy.log('1.6.5. Click on "Sign in" button')
    cy.get('button').contains('Sign in').click()
    cy.log('1.6.6. Complete the captcha if it appears')
    cy.сompleteCaptcha()
    cy.log('1.6.7. Check error message contains "Your password is incorrect – try again or use a verification link" text')
    cy.get('#password-note').should('be.visible').and('contain.text', 'Your password is incorrect – try again or use a verification link')
    cy.log('1.6.8. Check "Password" input field contains error symbol')
    cy.get('.password-input-container').find('[xmlns="http://www.w3.org/2000/svg"]').should('be.visible')
    cy.log('1.6.9. Check POST "/api/identity/authenticate/v1.0/sign_in/password/submit" request receives response with "errorDetails:Password is incorrect" attribute')
    cy.wait('@passwordSubmit')
      .its('response.body.error.0.errorDetails')
      .should('eq', 'Password is incorrect')
  });
});
