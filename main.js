let myButton = document.getElementById('changebutton');
let sitTimerTitle = document.getElementById('SitTitle');
let standTimerTitle = document.getElementById('StandTitle');

let standTimerIntervals;
let standTimerDisplay = document.getElementById('StandTime');

let sitTimerIntervals;
let sitTimerDisplay = document.getElementById('SitTime');

let standTimerTotal = 0;
let standSessionCounts = 0;
let standTimerTotalDisplay = document.getElementById('StandTotal');

let sitTimerTotal = 0;
let sitSessionCounts = 0;
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

let alarmsound = new Audio('alarmtone.mp3');
let alarmtriggered = false;
let mute = false;
let alarmInterval;
let TextFlashInterval;

let red = 1;
let green = 1;

// Change Stance Functions

function changestance() {
    refreshStatus()

    if (stance !== "sitting") {
        standToSit();
    } else {
        sitToStand();
    }
}

function refreshStatus() {
    document.title = 'Sitting Timer';
    $('#favicon').attr('href', 'images/favicon.png');
    red = 1;
    green = 1;
    clearInterval(alarmInterval)
    clearInterval(TextFlashInterval)
    $('#SitTime').removeClass('warning');
    $('#StandTime').removeClass('bonus');
    $('#standingimg').toggleClass('transparent');
    $('#sittingimg').toggleClass('transparent');
    alarmtriggered = false;

}

function standToSit() {
    stance = "sitting"
    sitSessionCounts++
    $('#SitSessionsCount').text(sitSessionCounts)
    myButton.innerHTML = "Stand Up"
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
    standSessionCounts++;
    $('#StandSessionsCount').text(standSessionCounts)
    myButton.innerHTML = "Sit Down"
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
    if (duration >= 2000 && !alarmtriggered) {
        alarmtriggered = true
        document.title = 'Time to Stand!';
        alarm()
        alarmInterval = setInterval(alarm, 60000)
        TextFlashInterval = setInterval(TextFlash, 500, "warning")
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
    if (duration >= 2000 && !alarmtriggered) {
        alarmtriggered = true
        document.title = 'Extra Standing Time';
        alarm()
        alarmInterval = setInterval(alarm, 60000)
        TextFlashInterval = setInterval(TextFlash, 500, "bonus")

    }

    durationastext = formatAsTime(duration, "minutes")
    standTimerDisplay.innerHTML = durationastext;

    standTimerTotal = standTimerTotalOnclick + 1000 * (Math.floor(duration / 1000));
    durationastext = formatAsTime(standTimerTotal, "hours")
    standTimerTotalDisplay.innerHTML = durationastext;
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


//Alarm Functions 

function alarm() {
    if (mute === false) {
        alarmsound.play()
    }
}

function TextFlash(alpha) {
    if (alpha === "warning") {
        $('#SitTime').toggleClass('warning');
        if (red === 1) {
            red = 0;
            $('#favicon').attr('href', 'images/whiteexclaim.png');
        } else {
            red = 1;
            $('#favicon').attr('href', 'images/redexclaim.png');
        }
    }
    else if (alpha === "bonus") {
        $('#StandTime').toggleClass('bonus');
    }
}

// UI Functions

function closedrawer() {
    $('#drawermain').addClass("outofview")
}

function drawerbutton() {
    $('#drawermain').toggleClass("outofview")
}

function muteunmute() {
    if (mute === true) {
        mute = false;
        $('#muteBttn').attr("src", "images/soundon.png")

    }
    else if (mute === false) {
        mute = true;
        $('#muteBttn').attr("src", "images/muted.png")

    }
}