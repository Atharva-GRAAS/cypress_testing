const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  env:{
    username: 'test',
    password: 'wXm&ckJa$MWw#CRS*h9@',
    email: 'test.user@graas.ai',
    customerFirstname: 'testuser',
    customerLastname: 'customer',
    customerEmail: 'test.user@graas.ai'
  },
  e2e: {

    adminurl: 'https://sehkm24uat.stores2.shoptimize.in/sehkm24admin', 
    experimentalStudio: true,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
