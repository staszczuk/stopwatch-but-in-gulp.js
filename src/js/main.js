var screen = document.querySelector("#screen");
var panel = document.querySelector("#panel");
var laps = document.querySelector("#laps");

var time = [0, 0, 0];
var screenTime = ["", "", ""];
var screenTimeString = "00:00:00";
var running = false;
var interval;
var globalLapNumber = 0;

function load() {
    convert();
    draw();
    if (screen.innerHTML !== "Loading") {
        panel.classList.remove("hidden");
    }
}

function convert() {
    for (var i = 0; i < 3; i++) {
        if (time[i] < 10) {
            screenTime[i] = "0" + time[i];
        } else {
            screenTime[i] = time[i];
        }
    }
}

function draw() {
    screenTimeString = screenTime[0] + ":" + screenTime[1] + ":" + screenTime[2];
    screen.innerHTML = screenTimeString;
}

function stopwatch() {
    time[2] += 1;

    if (time[2] == 100) {
        time[2] = 0;
        time[1]++;
    }

    if (time[1] == 60) {
        time[1] = 0;
        time[0]++;
    }

    if (time[0] == 60) {
        startPause();
    }

    convert();
    draw();
}

function startPause() {
    if (running) {
        clearInterval(interval);
        running = false;

        var element = document.querySelector("#pause");
        element.classList.add("hidden");
        element = document.querySelector("#play");
        element.classList.remove("hidden");
    } else {
        interval = setInterval(stopwatch, 10);
        running = true;

        var element = document.querySelector("#play");
        element.classList.add("hidden");
        element = document.querySelector("#pause");
        element.classList.remove("hidden");
    }
}

function reset() {
    for (var i = 0; i < 3; i++) {
        time[i] = 0;
    }

    for (var i = 0; i < 3; i++) {
        screenTime[i] = "00";
    }

    draw();
    document.querySelector("#laps").innerHTML = "";
    globalLapNumber = 0;
}

function stop() {
    if (running) {
        clearInterval(interval);
        running = false;

        var element = document.querySelector("#pause");
        element.classList.add("hidden");
        element = document.querySelector("#play");
        element.classList.remove("hidden");
    }

    reset()
}

function lap() {
    if (running || (time[0] !== 0 || time[1] !== 0 || time[2] !== 0)) {
        globalLapNumber++;

        var lap = document.createElement("div");
        lap.classList.add("lap");
        laps.appendChild(lap);

        var lapNumber = document.createElement("p");
        lapNumber.classList.add("lapNumber");
        lap.appendChild(lapNumber);
        var lapNumberContent = document.createTextNode(globalLapNumber);
        lapNumber.appendChild(lapNumberContent);

        var lapTime = document.createElement("p");
        lapTime.classList.add("lapTime");
        lap.appendChild(lapTime);
        var lapTimeContent = document.createTextNode(screenTimeString);
        lapTime.appendChild(lapTimeContent);

        laps.scrollTop = laps.scrollHeight;
    }
}
