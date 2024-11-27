describe('login via admin panel', () => {
    it('admin panel login',{
      defaultCommandTimeout: 10000
    }, () => {
      // cy.viewport(1920, 1080);
      cy.window().then((win) => {
        const width = win.innerWidth;
  
        if (width >= 1024) {
          // Desktop-specific test
          cy.log('Running desktop-specific test');
          
          cy.visit(Cypress.config('adminurl')); // Add 'adminurl' variable in e2e config
          cy.get('#username').type(Cypress.env('username')); // Add 'username' in ENV config
          cy.get('#login').type(Cypress.env('password')); // Add 'password' in ENV config
          cy.get('.action-login').click();
  
          cy.wait(2000);
          cy.get('#menu-magento-customer-customer').click();
          cy.get("li[data-ui-id='menu-magento-customer-customer-manage']").click();
          cy.wait(2000);
          cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > #fulltext')
            .should('be.visible')
            .clear({ force: true })
            .type('testuser{enter}');
          cy.wait(5000);
  
          cy.get('body').then(($body) => {
            if ($body.find('.data-grid-actions-cell > .action-menu-item').length > 0) {
              // Existing customer actions
              cy.get('.data-grid-actions-cell > .action-menu-item').should('be.visible').click();
              cy.get('#login_as_customer > span').should('be.visible').click();
              cy.get('.modal-popup > .modal-inner-wrap').should('be.visible').click();
              cy.get('.action-accept').should('be.visible').click();
            } else {
              // Add new customer
              cy.get('#add').click();
              cy.wait(2000);
              cy.get('input[name="customer[firstname]"]').type(Cypress.env('customerFirstname')); // Add 'customerFirstname' in ENV
              cy.get('input[name="customer[lastname]"]').type(Cypress.env('customerLastname')); // Add 'customerLastname' in ENV
              cy.get('input[name="customer[email]"]').type(Cypress.env('customerEmail')); // Add 'customerEmail' in ENV
              cy.get('.admin__actions-switch-checkbox').check({ force: true });
              cy.get('#save').click();
              cy.get('.data-grid-actions-cell > .action-menu-item').click();
              cy.wait(5000);
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
          cy.url().should('include', '/customer/account');
        } else {
          cy.viewport('iphone-6+') //iphone 14 pro viewport 
          // Mobile-specific test
          cy.log('This is a mobile device');
          cy.visit(Cypress.config('adminurl')); // Add 'adminurl' variable in e2e config
          cy.get('#username').type(Cypress.env('username')); // Add 'username' in ENV config
          cy.get('#login').type(Cypress.env('password')); // Add 'password' in ENV config
          cy.get('.action-login').click();
  
          cy.wait(2000);
          cy.get('#menu-magento-customer-customer').click();
          cy.get("li[data-ui-id='menu-magento-customer-customer-manage']").scrollIntoView().click();
          cy.wait(2000);
          cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > #fulltext')
            .should('be.visible')
            .clear({ force: true })
            .type('testuser{enter}');
          cy.wait(5000);
  
          cy.get('body').then(($body) => {
            if ($body.find('.data-grid-actions-cell > .action-menu-item').length > 0) {
              // Existing customer actions
              cy.get('.data-grid-actions-cell > .action-menu-item').scrollIntoView().should('be.visible').click();
              cy.slowclick('#login_as_customer > span').scrollIntoView().should('be.visible');
              cy.slowclick('.modal-popup > .modal-inner-wrap').should('be.visible');
              cy.get('.action-accept').should('be.visible').click();
            } else {
              // Add new customer
              cy.get('#add').click();
              cy.wait(2000);
              cy.get('input[name="customer[firstname]"]').type(Cypress.env('customerFirstname')); // Add 'customerFirstname' in ENV
              cy.get('input[name="customer[lastname]"]').type(Cypress.env('customerLastname')); // Add 'customerLastname' in ENV
              cy.get('input[name="customer[email]"]').type(Cypress.env('customerEmail')); // Add 'customerEmail' in ENV
              cy.get('.admin__actions-switch-checkbox').check({ force: true });
              cy.get('#save').click();
              cy.get('.data-grid-actions-cell > .action-menu-item').click();
              cy.wait(5000);
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
          cy.url().should('include', '/customer/account');
        }
      });

      /* ==== End Cypress Studio ==== */
    });
  });
  