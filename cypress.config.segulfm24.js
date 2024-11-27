const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1000,
  viewportHeight: 660,
  env:{
    username: 'testuser',
    password: 'p@hR#kyn%fSyy&sa9*6k1',
    email: 'test.user@graas.ai',
    customerFirstname: 'testuser',
    customerLastname: 'customer',
    customerEmail: 'test.user@graas.ai'
  },
  e2e: {
    baseUrl: 'https://segulfm24uat.stores2.shoptimize.in',
    frontendurl: 'https://segulfm24uat.stores2.shoptimize.in',
    adminurl: 'https://segulfm24uat.stores2.shoptimize.in/segulfm24admin',
    experimentalStudio: true,
    'defaultCommandTimeout': 10000,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
