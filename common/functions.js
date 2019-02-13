import document from "document";
import { HeartRateSensor } from "heart-rate";

import * as util from "./utils";

const BackgroundColor = document.getElementById("BackgroundColor");
// Set up the Heart Rate sensor!
const hrm = new HeartRateSensor();
hrm.start();


export function GetHeartRate() {
    const data = {
      hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  }
    return data.hrm.heartRate
}

export function SetBackgroundColor(red, green, blue) {
  console.log("Red   " + red)
  console.log("Green " + green)
  console.log("Blue  " + blue)

  if (red > 255) {
    red = 255;
  } else if (red < 0) {
    red = 0;
  }
  if (green > 255) {
    green = 255;
  } else if (green < 0) {
    green = 0;
  }
  if (blue >= 255) {
    blue = 254;
  } else if (blue < 0) {
    blue = 0;
  }
  BackgroundColor.style.fill = util.RGB2HTML(red,green,blue);
}
