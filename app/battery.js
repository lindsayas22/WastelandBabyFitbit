import document from "document";
import { battery } from "power";

const batData = document.getElementById("batteryLevel");

//change the color of the battery at different levels
function batteryLevelColor(percentage) {
  if(percentage <= 15) {
    return 'darkred';
  } else if (percentage <= 45) {
    return 'sandybrown';
  }
  return 'darkseagreen';
}

export function setLevel() {
  batData.width = Math.round(battery.chargeLevel * 23 / 100);
  batData.style.fill = batteryLevelColor(Math.round(battery.chargeLevel));
}