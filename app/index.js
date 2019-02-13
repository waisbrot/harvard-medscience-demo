import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as util from "../common/utils";
import * as watch from '../common/functions' ;

// Find the things we want to change
const myLabel = document.getElementById("myLabel");

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
  let heartrate = watch.GetHeartRate()
  console.log(heartrate);
  let blue = 215 - heartrate;
  let red = 40 + heartrate;
  let green = 0;
  watch.SetBackgroundColor(red,green,blue);
}

refreshData();
setInterval(refreshData, 1000);
