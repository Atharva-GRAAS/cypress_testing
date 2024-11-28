const { defineConfig } = require("cypress");
const path = require('path');
const fs = require('fs');

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
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Get the original video path
          const originalVideoPath = results.video;

          // Create a new file name with a timestamp
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Format timestamp for filename
          const newVideoName = `${path.basename(spec.relative)}_${timestamp}.mp4`;

          // Define the new video path
          const newVideoPath = path.join(path.dirname(originalVideoPath), newVideoName);

          // Rename the video file
          fs.renameSync(originalVideoPath, newVideoPath);
          console.log(`Renamed video to: ${newVideoPath}`);
        }
      });
    },
  },
});
