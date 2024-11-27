describe('payment gateway', () => {
    let activePaymentMethods = [];
    before(() => {
        cy.login();
    })

    it('getting enabled payment ways and storing in array', () => {
        cy.visit(Cypress.config('adminurl'))
        cy.wait(2000)
        cy.get('#menu-magento-backend-stores').click()
        cy.get('li[data-ui-id="menu-magento-config-system-config"]').click()
        cy.get(".admin__page-nav-title").contains('Sales').click()
        cy.get('.admin__page-nav-item').contains('Payment Methods').click();
        cy.get('div.section-config').each(($section) => {
            const paymentRow = $section.find('#row_payment_paybycredit_active');
      
            // Check if the row exists
            if (paymentRow.length > 0) {
              // Find the <td> element with class 'value'
              const valueCell = paymentRow.find('td.value');
      
              // Check if the text inside the <td> is 'Yes'
              if (valueCell.text().trim() === 'Yes') {
                // Get the text of the <td> with class 'label'
                const labelText = paymentRow.find('td.label').text().trim();
      
                // Add the label text to the array
                activePaymentMethods.push(labelText);
              }
            }
          }).then(() => {
            // Output the array of active payment methods
            cy.log('Active Payment Methods:', activePaymentMethods);
            expect(activePaymentMethods).to.not.be.empty; // Optiona
        })
    })
})