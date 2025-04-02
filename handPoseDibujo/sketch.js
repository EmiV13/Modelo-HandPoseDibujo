let handPose;
let video;
let hands = [];
let painting;

function preload() {
  handPose = ml5.handPose();
}

//funcion mousePressed para ver datos
function mousePressed() {
  console.log(hands);
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);
  painting.clear();

  // Crea el vieo y lo esconde
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Empiza a detectar las manos con la WebCam
  handPose.detectStart(video, gotHands);
}

// Funcion Callback para cuanbdo handPose detecta datos
function gotHands(results) {

  // Salva la salida en la variable hands
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);

    // Dinuja todos los puntos de las manos
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];

      for (let j = 0; j < hand.keypoints.length; j++) {
        //let keypoint = hand.keypoints[j];
        let index = hand.keypoints[9]; 

        fill(0, 255, 0);
        noStroke();
        //circle(keypoint.x, keypoint.y, 10);

        fill(0, 0, 255);
        noStroke();
        circle(index.x, index.y, 30, 30);

        painting.fill(0, 0, 255);
        painting.noStroke();
        painting.circle(index.x, index.y, 10, 10);
      }
    }
    image(painting, 0, 0);
  }
