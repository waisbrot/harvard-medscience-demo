import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { HeartRateSensor } from "heart-rate";

// Set up the Heart Rate sensor!
const hrm = new HeartRateSensor();
hrm.start();

// Find the things we want to change
const myLabel = document.getElementById("myLabel");
const BackgroundColor = document.getElementById("BackgroundColor");

// Update the clock every minute
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

// This gets called every second, to update our colors
function refreshData() {
  const data = {
      hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  }
  console.log(JSON.stringify(data));
  let blue = 215 - data.hrm.heartRate;
  let red = 40 + data.hrm.heartRate;
  let green = 0;
  BackgroundColor.style.fill = util.RGB2HTML(red,green,blue);
}

refreshData();
setInterval(refreshData, 1000);
