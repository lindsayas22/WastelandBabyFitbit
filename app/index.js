import clock from "clock"; // needed to have a clock!
import document from "document"; // needed to access the labels used to display values 
import { preferences } from "user-settings"; // needed to get the user preference 12h or 24h
import { zeroPad, } from "../common/utils"; // import user function zeroPad
import { HeartRateSensor } from "heart-rate"; // import HR reading from sensor
import * as batterypic from "./battery.js";
import { battery } from "power"; // import battery level
import userActivity from "user-activity"; //adjusted types (matching the stats that you upload to fitbit.com, as opposed to local types)

// Update the clock every second
clock.granularity = "seconds"; //clock is refreshing every sec

// Get a handle on the <text> elements specified in the index.gui file

const dateHandle = document.getElementById("dateLabel"); 
const batteryHandle = document.getElementById("batteryLabel");
const stepsHandle = document.getElementById("stepsLabel");
const heartrateHandle = document.getElementById("heartrateLabel");

const numH1 = document.getElementById("timeH1");
const numH2 = document.getElementById("timeH2");
const numM1 = document.getElementById("timeM1");
const numM2 = document.getElementById("timeM2");

const Day = document.getElementById("Days");
const Date1 = document.getElementById("Date1s");
const Date2 = document.getElementById("Date2s");
const Month = document.getElementById("Months");

// The following block read the heart rate from your watch
const hrm = new HeartRateSensor();

hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate}`; // the measured HR is being sent to the heartrateHandle set
}
hrm.start();


// Update the <text> elements every tick with the current time
clock.ontick = (evt) => {
  
  //Date
  
  let today = evt.date;
  let daynum = today.getDay();
  let monthnum = today.getMonth();
  
  // array for days of the week names (used to call to .png files)
  const _days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };
  
  // array for month names (used to call to .png files)
  const _months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }
  
  // get current date name from the arrays
  let day = _days[daynum];
  let month = _months[monthnum];
  
  // select .png images, using the names from arrays
  Day.image = `Days/${day}.png`;
  Month.image = `Months/${month}.png`;
  
  let date = today.getDate(); 
  
  if (date > 9) {
      let D1 = Math.floor(date / 10);
      Date1.image = `Numbers/${D1}.png`;
  } else {
      let D1 = "0";
      Date1.image = `Numbers/${D1}.png`;
  }
  
  let D2 = Math.floor(date % 10);
  Date2.image = `Numbers/${D2}.png`;  
   
  //Time  
  let hours = today.getHours();
  let mins = today.getMinutes();

    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } else {
        // 24h format
        hours = util.zeroPad(hours);
    }
  
  if (hours > 9) {
      let H1 = Math.floor(hours / 10);
      numH1.image = `Numbers/HozFont/${H1}.png`;
  } else {
      let H1 = "0";
      numH1.image = `Numbers/HozFont/${H1}.png`;
  }
  
  let H2 = Math.floor(hours % 10);
  numH2.image = `Numbers/HozFont/${H2}.png`;
  
  let M1 = Math.floor(mins / 10);
  numM1.image = `Numbers/HozFont/${M1}.png`;
  
  let M2 = Math.floor(mins % 10); 
  numM2.image = `Numbers/HozFont/${M2}.png`;
  
  
  // Activity Values: adjusted type
  let stepsValue = (userActivity.today.adjusted["steps"] || 0); // steps value measured from fitbit is assigned to the variable stepsValue
  let stepsString = stepsValue; 
  stepsHandle.text = stepsString; // the string stepsString is being sent to the stepsHandle
  
  batterypic.setLevel();
   
  // Battery Measurement
  let batteryValue = battery.chargeLevel; // measure the battery level and send it to the variable batteryValue
  
  // Assignment value battery
  batteryHandle.text = `${batteryValue}%`; // the string including the batteryValue is being sent to the batteryHandle set at line 14
  
 
}
