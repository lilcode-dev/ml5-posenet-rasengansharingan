let video;
let poseNet;
let charingan;
let rasengan;
let charinganH = 1;
let charinganW = 1;
let rasenganH = 1;
let rasenganW = 1;
let d = 0;
const leftEye = { x: 0, y: 0 };
const rightEye = { x: 0, y: 0 };
const rightWrist = { x: 0, y: 0 };
const leftWrist = { x: 0, y: 0 };

function preload() {
  charingan = loadImage(
    "assets/img/sharingan-sasuke.png",
    console.log("sharingan is ready")
  );
  rasengan = loadImage(
    "assets/img/rasengan.png",
    console.log("rasengan is ready")
  );
}

function setup() {
  let canvas = createCanvas(displayWidth, displayHeight);
  canvas.id("canvas-video");
  canvas.parent("video-area");
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  poseNet = ml5.poseNet(video, poseNetInit);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let xr = poses[0].pose.rightWrist.x;
    let yr = poses[0].pose.rightWrist.y;
    rightWrist.x = lerp(xr, rightWrist.x, 0);
    rightWrist.y = lerp(yr, rightWrist.y, 0);
    rasenganW = 200;
    rasenganH = 200;
  } else {
    rasenganW = 1;
    rasenganH = 1;
  }
}

function draw() {
  image(video, 0, 0, width, height);
  image(charingan, leftEye.x - 20, leftEye.y - 30, charinganW, charinganH);
  image(charingan, rightEye.x - 34, rightEye.y - 30, charinganW, charinganH);
  image(rasengan, rightWrist.x - 150, rightWrist.y - 100, rasenganW, rasenganH);
}

function poseNetInit() {
  poseNet.on("pose", (results) => {
    if (results.length > 0) {
      let xl = results[0].pose.leftEye.x;
      let yl = results[0].pose.leftEye.y;
      let xr = results[0].pose.rightEye.x;
      let yr = results[0].pose.rightEye.y;
      leftEye.x = lerp(xl, leftEye.x, 0);
      leftEye.y = lerp(yl, leftEye.y, 0);
      rightEye.x = lerp(xr, rightEye.x, 0);
      rightEye.y = lerp(yr, rightEye.y, 0);
      d = dist(
        results[0].pose.leftEye.x,
        results[0].pose.leftEye.y,
        results[0].pose.rightEye.x,
        results[0].pose.rightEye.y
      );
      charinganW = d / 3;
      charinganH = d / 3;
    } else {
      charinganW = 1;
      charinganH = 1;
    }
  });
}

// footer year
const footer = document.querySelector(".footer");
footer.querySelector(
  ".footer-year"
).textContent = `Copyright © ${new Date().getFullYear()} - `;
