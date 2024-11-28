const { defineConfig } = require("cypress");
const path = require('path');

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
