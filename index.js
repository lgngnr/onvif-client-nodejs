const onvif = require("node-onvif");
const fs = require("fs");

// Loading device configuration
const config = require('./config.json');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice(config);

// Initialize the OnvifDevice object
device
  .init()
  .then(info => {
    // Show the detailed information of the device.
    console.log(JSON.stringify(info, null, "  "));
    let url = device.getUdpStreamUrl();
    console.log(url);
    // Get the data of the snapshot
    console.log("fetching the data of the snapshot...");
    return device.fetchSnapshot();
  })
  .then(res => {
    // Save the data to a file
    fs.writeFileSync("snapshot.jpg", res.body, { encoding: "binary" });
    console.log("Done!");
  })
  .catch(error => {
    console.error(error);
  });
