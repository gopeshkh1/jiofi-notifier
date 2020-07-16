const { JSDOM } = require("jsdom");
const axios = require("axios");
const notifier = require("node-notifier");

function callMain() {
  var notified = false;

  const interval = setInterval(async () => {
    try {
      const { data } = await axios.get("http://jiofi.local.html");
      const { document } = new JSDOM(data).window;
      const batterylevel = document.getElementById("batterylevel").value;
      const batterystatus = document.getElementById("batterystatus").value;

      console.log(batterylevel, batterystatus);

      if (batterystatus === "Charging") {
        notified = false;
      } else if (!notified && parseInt(batterylevel) < 10) {
        notifier.notify({
          title: "charge your jiofi",
          message: `battery level:${batterylevel}`
        });
        notified = true;
      }
    } catch (err) {
      console.log(err);
      clearInterval(interval);
    }
  }, 1000);
}

callMain();
