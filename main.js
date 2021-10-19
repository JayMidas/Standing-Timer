let myImage = document.querySelector('img');
let myButton = document.getElementById('changebutton');
let sitTimerTitle = document.getElementById('SitTitle');
let standTimerTitle = document.getElementById('StandTitle');

let standTimerIntervals;
let standTimerDisplay = document.getElementById('StandTime');

let sitTimerIntervals;
let sitTimerDisplay = document.getElementById('SitTime');

let standTimerTotal = 0;
let standTimerTotalDisplay = document.getElementById('StandTotal');

let sitTimerTotal = 0;
let sitTimerTotalDisplay = document.getElementById('SitTotal');

let stance = "standing"
let stancestem = "You are currently "
let stancetext = document.getElementById('currentStance');

let timeonclick = 0;
let standTimerTotalOnclick = 0;
let sitTimerTotalOnclick = 0;
let timenow;
let duration;
let durationastext;
let hr;
let mins;
let secs;

var alarmsound = new Audio('alarmtone.mp3');
let alarmtriggered = false;
let mute = false;

// Button Functions

function changestance() {
    alarmtriggered = false;
    if (stance !== "sitting") {
        standToSit();
    } else {
        sitToStand();
    }
}

function standToSit() {
    stance = "sitting";
    myButton.innerHTML = "Stand Up"
    myImage.setAttribute('src', 'images/sitting.png');
    stancetext.innerHTML = stancestem + stance;
    sitTimerTitle.innerHTML = "Current Sitting Session";
    standTimerTitle.innerHTML = "Last Standing Session";
    clearInterval(standTimerIntervals);
    timeonclick = new Date().getTime();
    sitTimerTotalOnclick = sitTimerTotal;
    sitTimerIntervals = setInterval(updateSitTimer, 50);
}

function sitToStand() {
    stance = "standing";
    myButton.innerHTML = "Sit Down"
    myImage.setAttribute('src', 'images/standing.png');
    stancetext.innerHTML = stancestem + stance;
    sitTimerTitle.innerHTML = "Last Sitting Session";
    standTimerTitle.innerHTML = "Current Standing Session";
    clearInterval(sitTimerIntervals);
    timeonclick = new Date().getTime();
    standTimerTotalOnclick = standTimerTotal;
    standTimerIntervals = setInterval(updateStandtimer, 50);
}



//TIMER FUNCTIONS

function updateSitTimer() {
    timenow = new Date().getTime();
    duration = timenow - timeonclick;
    if (duration >= 3600000 && !alarmtriggered) {
        alarmtriggered = true
        sitalarm()
    }

    durationastext = formatAsTime(duration, "hours")
    sitTimerDisplay.innerHTML = durationastext;

    sitTimerTotal = sitTimerTotalOnclick + 1000 * (Math.floor(duration / 1000));
    durationastext = formatAsTime(sitTimerTotal, "hours")
    sitTimerTotalDisplay.innerHTML = durationastext;
}

function updateStandtimer() {
    timenow = new Date().getTime();
    duration = timenow - timeonclick;
    if (duration >= 120000 && !alarmtriggered) {
        alarmtriggered = true
        standalarm()
    }

    durationastext = formatAsTime(duration, "minutes")
    standTimerDisplay.innerHTML = durationastext;

    standTimerTotal = standTimerTotalOnclick + 1000 * (Math.floor(duration / 1000));
    durationastext = formatAsTime(standTimerTotal, "hours")
    standTimerTotalDisplay.innerHTML = durationastext;
}

function sitalarm() {
    if (mute = false) {
        alarmsound.play()
    };
}

function standalarm() {
    if (mute = false) {
        alarmsound.play()
    };
}

function formatAsTime(duration, format) {
    if (format === "hours") {
        hr = Math.floor(duration / 3600000);
        duration = duration - hr * 3600000;
        mins = Math.floor(duration / 60000);
        if (mins < 10) { mins = '0' + mins }
        duration = duration - mins * 60000;
        secs = Math.floor(duration / 1000);
        if (secs < 10) { secs = "0" + secs }
        return durationastext = hr + ":" + mins + ":" + secs;
    }
    if (format === "minutes") {
        mins = Math.floor(duration / 60000);
        if (mins < 10) { mins = '0' + mins }
        duration = duration - mins * 60000;
        secs = Math.floor(duration / 1000);
        if (secs < 10) { secs = "0" + secs }
        return durationastext = mins + ":" + secs;
    }

}




