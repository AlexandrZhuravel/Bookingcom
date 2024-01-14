//Command for login on "https://www.booking.com/" page 
Cypress.Commands.add('login', (loginPageUrl, email, password) => {
  cy.log('01. Open login page')
  cy.visit(loginPageUrl)
  cy.log('02. Type user mail in "Email address" input field')
  cy.get('[data-ga-label="username"]').type(email)
  cy.log('03. Click on "Continue with email" button')
  cy.get('button').contains('Continue with email').click()
  cy.log('04. Type user password in "Password" input field')
  cy.get('[data-ga-label="password"]').type(password)
  cy.log('05. Click on "Sign in" button')
  cy.get('button').contains('Sign in').click()
  cy.log('06. Complete the captcha if it appears')
  cy.get('.nw-signin').then((loginBlock) => {
    if (loginBlock.text().includes('Are you a robot?')) {
      cy.get('#px-captcha').trigger('mousedown');
      cy.wait(5000);
      cy.get('#px-captcha').trigger('mouseup');
    }
  });
})

//Command for completing captcha on "https://account.booking.com/sign-in/password" page
Cypress.Commands.add('сompleteCaptcha', () => {
  cy.get('.nw-signin').then((loginBlock) => {
    if (loginBlock.text().includes('Are you a robot?')) {
      cy.get('#px-captcha').trigger('mousedown');
      cy.wait(5000);
      cy.get('#px-captcha').trigger('mouseup');
    }
  });
});