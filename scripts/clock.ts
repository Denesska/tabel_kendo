/**
 * Created by d.gandzii on 7/5/2017.
 */
/* Get element */
// get hours
const HOURS = document.querySelector("#hours").transform.baseVal.getItem(0);
// get minutes
const MINUTES = document.querySelector("#minutes").transform.baseVal.getItem(0);
// get seconds
const SECONDS = document.querySelector("#seconds").transform.baseVal.getItem(0);



function runClock(){
    var time = new Date();
    let sec: number = time.getSeconds();
    let min: number = time.getMinutes();
    let hour: number = time.getHours();
    HOURS.setRotate((hour*360/12+(min*360/60/60)), 200, 200);
    MINUTES.setRotate(((min*360/60)+sec*360/60/60), 200, 200);
    SECONDS.setRotate((sec*360/60), 200, 200);
    console.log(hour+" : "+min+" : "+sec);
}

var interval = setInterval(runClock, 1000);