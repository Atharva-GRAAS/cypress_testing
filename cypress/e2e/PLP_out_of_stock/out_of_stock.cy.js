describe('outOfStock check', () => {
    before(() => {
        cy.login();
    })

    it('check the out of stock product and get the sku',{
        defaultCommandTimeout: 10000,
        waitAfterEachCommand: 2000
      }, () => {
        cy.visit(Cypress.config('adminurl'))
        cy.wait(2000);
        cy.slowclick('#menu-magento-backend-stores');
        cy.get('.item-catalog-attributes-attributes').click();
        cy.get('input[name="attribute_code"]').clear({force:true}).type('stock{enter}')
        cy.get('input[name="frontend_label"]').clear({force:true}).type('Quantity{enter}')
        cy.slowclick('.even');
        cy.slowclick('strong[data-bs-target="#advanced_fieldset-content"]');
        cy.get('#is_used_in_grid').select('Yes')
        cy.get('#is_filterable_in_grid').select('Yes')
        cy.slowclick('#save');
        cy.wait(3000);
        cy.slowclick('#menu-magento-catalog-catalog');
        // cy.get('.item-catalog-products').click();
        // cy.get('.item-catalog-products').click({force:true});
        // cy.get('button span').contains('Columns').parent('button').click({force:true})
        // cy.visit(Cypress.config('frontendurl'))
        /* ==== Generated with Cypress Studio ==== */
        // cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click();
        cy.get('.item-catalog-products > a').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .admin__data-grid-actions-wrap > .admin__data-grid-action-columns > .admin__action-dropdown > .admin__action-dropdown-text').click();
        cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .admin__data-grid-actions-wrap > .admin__data-grid-action-columns > .admin__action-dropdown-menu > .admin__action-dropdown-menu-content > [data-repeat-index="88"] > .admin__field-label').click();
        cy.get('#\\39 0').uncheck();
        cy.get('#\\39 0').check();
        /* ==== End Cypress Studio ==== */
    })
    // it('Continue actions with the saved state', function () {
    //     // Use the alias in the next test
    //     cy.visit(this.savedAdminUrl); // Start from the URL saved in the first test
    //     cy.get('button span').contains('Columns').parent('button').click({ force: true });
    // });
})