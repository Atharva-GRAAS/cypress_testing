describe('Mobile Testing in Cypress',()=>{

  it('Iphone resolution testing',()=>{
    //Opening program on Iphone 6/7/8 resolution
    cy.viewport(375,667);
    cy.visit('https://sem24.stores2.shoptimize.in/ae/');
    cy.get('.p-0.block').click();
    cy.get('div[class="menu-wrap"]').click()
    cy.get('a.flex.items-center.w-full.my-3.bg-container-lighter.border-container.level-0.text-dark-charcoal-30.text-sm').eq(0).click();
    cy.get('a[title="Door Bell"] span').click();
    // cy.get('#html-body > div.page-wrapper > header > div.z-40.relative.order-1.navigation.flex.lg\:hidden.basis-2\/6.mobile-menu > div > nav > div > div > div:nth-child(1) > div > a:nth-child(6) > span').click();

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.object-contain').click();
    /* ==== End Cypress Studio ==== */
  })
})