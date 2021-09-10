song = "";

left_WristY = "";
right_WristY = "";
left_WristX = "";
right_WristX = "";
score_l = "";
score_2 = "";
paused = 0;

volume = 1;
rate = 1;

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 450);

    if (score_l > 0.2 && paused == 0) {

        fill('#FF0000');
        stroke('#FF0000');

        circle(left_WristX, left_WristY, 10);

        volume = Number(left_WristY / 50);
        song.setVolume(volume / 10);
        document.getElementById("vol").innerHTML = floor(volume);
        document.getElementById("myRange").value = volume;
    }

    if (score_2 > 0.2 && paused == 0) {

        fill('#4287f5');
        stroke('#4287f5');

        circle(right_WristX, right_WristY, 10);

        if(right_WristY > 0 && right_WristY <= 100){
            song.rate(0.5);
            document.getElementById("myRange2").value = 5;
            document.getElementById("speed").innerHTML = "0.5x";
        }
        if(right_WristY > 100 && right_WristY <= 200){
            song.rate(1);
            document.getElementById("myRange2").value = 10;
            document.getElementById("speed").innerHTML = "1x";
        }
        if(right_WristY > 200 && right_WristY <= 300){
            song.rate(1.5);
            document.getElementById("myRange2").value = 15;
            document.getElementById("speed").innerHTML = "1.5x";
        }
        if(right_WristY > 300 && right_WristY <= 400){
            song.rate(2);
            document.getElementById("myRange2").value = 20;
            document.getElementById("speed").innerHTML = "2x";
        }
        if(right_WristY > 400 && right_WristY <= 500){
            song.rate(2.5);
            document.getElementById("myRange2").value = 25;
            document.getElementById("speed").innerHTML = "2.5x";
        }
    }

}

function preload() {
    song = loadSound('music.mp3')
}

function play() {
    song.play();
    song.setVolume(volume / 10);
    song.rate(1);
}

function modelLoaded() {
    // console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0 && paused == 0) {
        // console.log(results);

        left_WristY = results[0].pose.leftWrist.y;
        right_WristY = results[0].pose.rightWrist.y;

        score_l = results[0].pose.keypoints[9].score;
        score_2 = results[0].pose.keypoints[9].score;

        left_WristX = results[0].pose.leftWrist.x;
        right_WristX = results[0].pose.rightWrist.x;

        // console.log("Left = "+leftWrist);
        // console.log('Right = '+rightWrist);
    }
}

function changeVolume() {
    volume = document.getElementById("myRange").value;
    song.setVolume(volume / 10);
    document.getElementById("vol").innerHTML = volume;
}
function changeRate() {
    if (paused == 0) {
        rate = document.getElementById("myRange2").value;
        song.rate(rate / 10);
        document.getElementById("speed").innerHTML = rate / 10;
    }
}

function pause() {
    if (paused == 0) {
        song.rate(0);
        paused = 1;
        console.log(paused+" paused");
        document.getElementById("pause").innerHTML = "UNPAUSE"
    } else {
        song.rate(1);
        paused = 0;
        console.log(paused+" paused");
        document.getElementById("pause").innerHTML = "PAUSE"
    }
}