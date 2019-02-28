import clock from "clock";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import * as watch from '../common/functions' ;

// Update the clock every minute
clock.granularity = "seconds";

// Update the <text> element every tick with the current time.
// With a granularity of 'seconds', that means it gets called once every second.
// This function will not get called when the display is off
clock.ontick = (evt) => {
    colorBackground();
    imageBackground();
    //watch.DrawTimeSmallCorner(evt, 'white');
};

// Make a background color based on the current heart-rate
function colorBackground() {
    let heartrate = watch.GetHeartRate();
    console.log(`HR: ${heartrate}`);

    let blue = 215 - heartrate;
    let red = 40 + heartrate;
    let green = 0;
    watch.SetBackgroundColor(red, green, blue);
}

function imageBackground() {
    let heartrate = watch.GetHeartRate();
    if (heartrate > 130) {
        watch.SetImage('running.png');
    } else if (heartrate > 100) {
        watch.SetImage('walking.png');
    } else if (heartrate > 70) {
        watch.SetImage('sitting.png');
    } else {
        watch.SetImage('sleeping.png');
    }
}
