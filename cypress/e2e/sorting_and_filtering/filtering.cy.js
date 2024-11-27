describe('Filtering with login on PLP page', () => {
    before(() => {
        cy.login();
      })
      it('PLP page visit and apply filters', () => {
        cy.visit('/bestsellers.html')                   
      })
})