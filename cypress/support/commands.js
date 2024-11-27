// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// support/commands.js
Cypress.Commands.add('slowclick', (selector, delay = 1000) => {
  cy.get(selector).click();
  cy.wait(delay);
});


Cypress.Commands.add('login', () => {
    cy.viewport(1920, 1080);
      cy.visit(Cypress.config('adminurl')); // please add a variable named 'adminurl' in e2e 
      cy.get('#username').type(Cypress.env('username')); //please add 'username' ENV variable in config file 
      cy.get('#login').type(Cypress.env('password')); //please add 'password' ENV variable in config file
      cy.get('.action-login').click();

      cy.wait(2000);
      cy.get('#menu-magento-customer-customer').click();
      cy.get("li[data-ui-id='menu-magento-customer-customer-manage']").click();
      cy.wait(2000);
      cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > #fulltext')
        .should('be.visible').clear({force:true})
        .type('testuser{enter}');
      cy.wait(5000)
      cy.get('body').then(($body) => {
        if($body.find('.data-grid-actions-cell > .action-menu-item').length > 0){
            cy.get('.data-grid-actions-cell > .action-menu-item').should('be.visible').click();
            cy.get('#login_as_customer > span').should('be.visible').click();
            cy.get('.modal-popup > .modal-inner-wrap').should('be.visible').click();
            cy.get('.action-accept').should('be.visible').click();
        }
        else{
            cy.get('#add').click();
            cy.wait(2000)
            cy.get('input[name="customer[firstname]"]').type(Cypress.env('customerFirstname')) //please add 'customerFirstname' ENV variable in config file
            cy.get('input[name="customer[lastname]"]').type(Cypress.env('customerLastname')) //please add 'customerLastname' ENV variable in config file
            cy.get('input[name="customer[email]"]').type(Cypress.env('customerEmail')) //please add 'customerEmail' ENV variable in config file
            cy.get('.admin__actions-switch-checkbox').check({force:true})
            cy.get('#save').click()
            cy.get('.data-grid-actions-cell > .action-menu-item').click();
            cy.wait(5000)
            cy.get('#login_as_customer > span').click();
            cy.get('.modal-popup > .modal-inner-wrap').click();
            cy.get('.action-accept').click();
          }
      });
      

      // Override window.open to stay in the same tab
      cy.window().then((win) => {
        cy.stub(win, 'open').callsFake((url) => {
          win.location.href = url;
        });
      });
      cy.url().should('include', '/customer/account'); // Example URL check for customer account page
})