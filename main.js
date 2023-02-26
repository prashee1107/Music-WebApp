song1 = "";
song2 = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload(){
    song2 = loadSound("Doraemon-Title-Song.mp3");
    song1 = loadSound("Shinchan-Original-Song.mp3");
}
function setup(){
    canvas = createCanvas(600,600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotPoses);
}
function modelloaded(){
    console.log("PoseNet is Initialised");
}
function draw(){
    image(video,0,0,600,600);
fill("red");
    stroke("red");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
   if(scoreLeftWrist > 0.2){
   circle(leftwristX,leftwristY,20);
   song2.stop();
   if(song1_status == false){
    song1.play();
    document.getElementById("song_name").innerHTML = "Song = Shinchan Theme song";
   }
   }


    
     if(scoreRightWrist > 0.2){
    circle(rightwristX,rightwristY,20);
    song1.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("song_name").innerHTML = "Song = Doraemon theme song";
    }
   }
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("LeftWrist X = "+ leftwristX+ " LeftWrist Y = " +leftwristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("RightWrist X = "+ rightwristX+ " RightWrist Y = " +rightwristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}