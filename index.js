// Vars
var videoLength;
var desiredClip = 226;
const stat1 = document.getElementById("vidlength");
const stat2 = document.getElementById("desiredlength");
const vidid = document.getElementById("vidid");
const linkerror = document.getElementById("linkerror");
const cliperror = document.getElementById("cliperror");
const timeerror = document.getElementById("timeerror");
const time = document.getElementById("time");

// Get time
var today = new Date();
var hrs = today.getHours();
var mins = today.getMinutes();
var secs = today.getSeconds();

var loadTime = secs+(mins*60)+(hrs*3600);
var currTimeInSecs;
updateDate();
var desirTimeInSecs = currTimeInSecs+desiredClip;

// Converts my "second time format" to a readable value
function secsTotime(x) {
    var hrs = x / 3600;
    var mins = (x % 3600)/60;

    return parseInt(hrs - 12) + ":" + parseInt(mins);
}

// Player is created in createVid.js
function onPlayerReady(event) {
    videoLength = player.getDuration();
    stat1.innerHTML = "Desired Clip: " + desiredClip;
    stat2.innerHTML = "Video Length: " + videoLength;

    player.playVideo();
    player.pauseVideo();
}

// Sets currTimeInSecs to the current time
function updateDate() {
    var today = new Date();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();

    currTimeInSecs = secs+(mins*60)+(hrs*3600);
}

// Update time + check if video should start
function loop() {
    updateDate();
    console.log("-------------");
    console.log(desirTimeInSecs - desiredClip - currTimeInSecs);
    // Start the video if time is appropriate
    if (currTimeInSecs == (desirTimeInSecs - desiredClip)) {
        player.playVideo();
    }
    // Loop but make sure it needs to loop
    if (desirTimeInSecs - desiredClip - currTimeInSecs >= 0) {
        setTimeout(loop, 1000); // Play loop in 1 second
    }
}

vidid.addEventListener('change', (event) => {
    var str = vidid.value;

    const r = 'youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})'; // valid yt id regex https://stackoverflow.com/a/19647711
    // Check if str is a youtube video
    if (str.match(r)) {
        // Adjust error box
        linkerror.innerHTML = "";

        // Get id and create video
        var id = str.substring(24, str.length);
        create(id);
    } else {
        linkerror.innerHTML = "Invalid link";
    }
})

cliptime.addEventListener('change', (event) =>{
    var str = cliptime.value;

    const r = '[0-9]:[0-9]'; // Basic regex for timestamp
    // Check if time is valid
    if (str.match(r)) {
        // Adjust error box
        cliperror.innerHTML = "";

        // Work out time in seconds
        var timeMins = parseInt(str.substring(0, 2));
        var timeSecs = parseInt(str.substring(3, 5));
        
        desiredClip = (timeMins*60)+timeSecs // Converts minutes to seconds, hours to seconds and adds them together
        stat1.innerHTML = "Desired Clip: " + desiredClip;
    } else {
        // Adjust error box
        cliperror.innerHTML = "Invalid timestamp"
    }
})

time.addEventListener('change', (event) => {
    var str = time.value;
    var timeHrs = parseInt(str.substring(0, 2));
    var timeMins = parseInt(str.substring(3, 5));
    
    const r = '[0-9]:[0-9]'; // Basic regex for timestamp
    if (str.match(r)) {
        desirTimeInSecs = (timeMins*60)+(timeHrs*3600); // Converts minutes to seconds, hours to seconds and adds them together
        console.log(desirTimeInSecs - desiredClip - currTimeInSecs);
        if (desirTimeInSecs - desiredClip - currTimeInSecs >= 0) {
            timeerror.innerHTML = "";
            loop();
        } else {
            // If it wont make it in time pull up error
            timeerror.innerHTML = "That wont make it in time";
        }
        
    } else {
        // Adjust error box
        timeerror.innerHTML = "Invalid time";
    }
})