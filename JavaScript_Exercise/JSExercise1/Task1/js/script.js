let timeVal = setInterval(function(){
    let d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}, 1000);

let d = new Date();
let day = String(d.getDate()).padStart(2, '0');
let month = d.toLocaleString('default', {month: 'short'});
let year = d.getFullYear();
document.getElementById("date").textContent = `${day} ${month} ${year}`;

let status = 0; // 0:stop 1:running
let time = 0;

function start() {
    status = 1;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("resumeBtn").disabled = true;
    timer();
}

function stop() {
    status = 0;
    document.getElementById("resumeBtn").disabled = false;
}

function resume() {
    status = 1;
    timer();
}

function reset() {
    status = 0;
    time = 0;
    document.getElementById("timerLabel").innerHTML = "00:00:00:00";
    document.getElementById("startBtn").disabled = false;
}

function timer() {
    if (status == 1) {
        setTimeout(function(){
            time++;
            let hour = String(Math.floor(time/100/60/24)).padStart(2, '0');
            let min = String(Math.floor(time/100/60)).padStart(2, '0');
            let sec = String(Math.floor(time/100)).padStart(2, '0');
            let msec = String(time % 100).padStart(2, '0');

            if(sec>=60) {
                sec %= 60;
            }

            document.getElementById("timerLabel").innerHTML = hour + ":" + min + ":" + sec + ":" + msec;
            timer();
        }, 10);
    }
}