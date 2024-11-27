describe('Sorting file' , () => {
    let initialPrices = [];
    let ascending_filteredPrices = [];
    let descending_filteredPrices = [];
  
    beforeEach(() => {
      cy.login();
    });
    it("price ascending" , () => {
        cy.visit('/bestseller.html')
        cy.get("#maincontent form").each(($el) => {
            const price = parseFloat(
                $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
              );
              initialPrices.push(price);
          })
          .then(() => {
            // Log initial prices for debugging
            cy.log('Initial Prices:', initialPrices);
          });

        cy.log("Going to ascend the list of products")
        
        // Ascending Product list 
        cy.get('.form-select').select('price');
        cy.get("#maincontent form").each(($el) => {
          const price = parseFloat(
              $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
            );
            ascending_filteredPrices.push(price);
        })
        .then(() => {
          // Log initial prices for debugging
          cy.log('Filtered Prices after Ascend list:', ascending_filteredPrices);
        });
    }),
      it("price descending" , () => {
        cy.visit('/bestseller.html')
        cy.get("#maincontent form").each(($el) => {
            const price = parseFloat(
                $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
              );
              initialPrices.push(price);
          })
          .then(() => {
            // Log initial prices for debugging
            cy.log('Initial Prices:', initialPrices);
          });
  
        cy.log("Going to descend the list of products")
        
        // Ascending Product list 
        cy.get('.form-select').select('price');
        cy.get('a[title="Set Descending Direction"] svg').click()
        cy.get("#maincontent form").each(($el) => {
          const price = parseFloat(
              $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
            );
            descending_filteredPrices.push(price);
        })
        .then(() => {
          // Log initial prices for debugging
          cy.log('Filtered Prices after Ascend list:', descending_filteredPrices);
        });
  }),
  it("Bestsellers" , () => {
    cy.visit('/all-products.html')
    cy.get("#maincontent form").each(($el) => {
        const price = parseFloat(
            $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
          );
          initialPrices.push(price);
      })
      .then(() => {
        // Log initial prices for debugging
        cy.log('Initial Prices:', initialPrices);
      });

    cy.log("Going to descend the list of products")
    
    // Ascending Product list 
    cy.get('.form-select').select('bestsellers');
    // cy.get('a[title="Set Descending Direction"] svg').click()
    cy.get("#maincontent form").each(($el) => {
      const price = parseFloat(
          $el.find('.price-wrapper[id^="product-price"]').attr('data-price-amount')
        );
        descending_filteredPrices.push(price);
    })
    .then(() => {
      // Log initial prices for debugging
      cy.log('Filtered Prices after Ascend list:', descending_filteredPrices);
    });
  })
})