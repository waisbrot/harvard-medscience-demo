/**********************************************************************
 * A file of helper code, to make the main file simpler to work with
 **********************************************************************/
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { preferences } from "user-settings";

/**********************************************************************
 * SETUP
 * This code runs once at start-up and sets up some basic pieces
 **********************************************************************/

// *** Get handles to some DOM elements, so we only have to find them once ***

// The HTML 'rect' that we use to control the background color
const BackgroundColor = document.getElementById("BackgroundColor");

// An image behind the clock
const BackgroundImage = document.getElementById('BackgroundImage');

// The text component where we draw the time
const TimeText = document.getElementById("TimeText");

// Some text in the middle of the screen
const BigText = document.getElementById('BigText');

// *** Set up sensors ***

// Set up the Heart Rate sensor!
const hrm = new HeartRateSensor();
hrm.start();

/**********************************************************************
 * EXPORTED FUNCTIONS
 * These functions can be used in this file and in the main file
 **********************************************************************/

// Get the current heart-rate in Beats Per Minute
export function GetHeartRate() {
    const heartRate = hrm.heartRate || 0;  // when there's no HR detected, use zero
    return heartRate;
}

// Log a message to the console, for debugging. Things that aren't strings already get shows as JSON
export function log(thing) {
    if (typeof(thing) === 'object') {
        console.log(JSON.stringify(thing));
    } else {
        console.log(thing);
    }
}

// Set the backround color of the watch-face
export function SetBackgroundColor(red, green, blue) {
    log({"R": red, "G": green, "B": blue});

    BackgroundColor.style.fill = RGB2HTML(red, green, blue);
}

export function SetImage(fileName) {
    BackgroundImage.image = fileName;
}

// Draw a digital clock large in the center, with the current time
export function DrawTimeCenter(evt, color) {
    const time = timeString(evt.date);
    TimeText.text = time;
    TimeText.style.fill = color;
    TimeText.style.fontSize = 80;
    TimeText.style.textAnchor = 'middle';
    TimeText.x = 50;
    TimeText.y = 190;
}

export function DrawTimeSmallCorner(evt, color) {
    const time = timeString(evt.date);
    TimeText.text = time;
    TimeText.style.fill = color;
    TimeText.style.fontSize = 24;
    TimeText.x = 230;
    TimeText.y = 20;
}

export function DrawText(text, color) {
    BigText.text = text;
    BigText.style.fill = color;
    BigText.style.fontSize = 50;
    BigText.style.textAnchor = 'right';
    BigText.x = 150;
    BigText.y = 190;
}

/**********************************************************************
 * PRIVATE FUNCTIONS
 * These functions are only used in this file; not elsewhere.
 * They are little helper-functions
 **********************************************************************/

// Print the time as a string, in either 12-hour or 24-hour format
function timeString(date) {
    let hours = date.getHours();
    if (preferences.clockDisplay === "12h") {
        // 12-hour clock format
        hours = hours % 12 || 12;
    }
    const mins = date.getMinutes();
    return `${hours}:${zeroPad(mins, 2)}`;
}

// Pad a number with leading zeros to form a string:
//    zeroPad(5, 2) -> "05"
//    zeroPad(5, 3) -> "005"
//    zeroPad(99, 3) -> "099"
function zeroPad(number, places) {
    let padding = "";
    for (let i = 1; i < places; i++) {
        const nextPlace = Math.pow(10, i);
        if (number < nextPlace) {
            padding += '0';
        }
    }
    return padding + number;
}

// If a number is between 'low' and 'high' inclusive, return it. If it's too low, return 'low'. If it's
// too hight, return 'high'
function clamp(number, low, high) {
    if (number < low) {
        return low;
    } else if (number > high) {
        return hight;
    } else {
        return number;
    }
}

// Take "red" "green" "blue" values between 0 and 255 and turn them into an HTML color code string
function RGB2HTML(red, green, blue)
{
    red = clamp(red);
    green = clamp(green);
    blue = clamp(blue);
    const decColor = blue + (0x100 * green) + (0x10000 *red) + 0x1000000;
    return '#' + decColor.toString(16).substr(1);
}
