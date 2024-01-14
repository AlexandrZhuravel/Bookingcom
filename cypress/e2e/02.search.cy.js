describe('2.Searching UI tests', () => {
    let loginData;
    let urlList;
  
    beforeEach(() => {
      cy.fixture('loginData').then((data) => {
        loginData = data;
      });
      cy.fixture('urlList').then((data) => {
        urlList = data;
      });
    });

    it('2.1.Search without filling "Where are you going?" input field(Negative)', () => {
        cy.log('2.1.1.Open main page')
        cy.visit(urlList.mainPageUrl);
        cy.wait(3000)
        cy.log('2.1.2.Click on "Search" button')
        cy.get('button').contains('Search').click({force: true})
        cy.log('2.1.3. Check error message contains "Enter a destination to start searching.')
        cy.get('[data-testid="searchbox-alert"]').should('exist').and('contain.text', 'Enter a destination to start searching.')
    });
});