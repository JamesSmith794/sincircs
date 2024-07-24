// Alex Donley

let phase = 0;
let zoff = 0;
let r;
let c;
let res = 300

let deformations = [];

let img;
let snd;
let sceneAmp;
let gArray = []

function preload() {
  img = loadImage('img/p5.jpg')

  limit = 12

  for (i = 0; i<limit; i++) {
    gArray[i] = loadSound('sfx/g' + (i + 1) +'.wav')
  }
}

function setup() {
  createCanvas(windowWidth, 600);
  c = width * 0.75;
  cordHeight = createSlider(1, 300, 75);
  displacer = createSlider(50, res-50, res/2);
  angleMode(DEGREES)  

  sceneAmp = new p5.Amplitude();
}

function draw() {
  
  background(255);
  image(img, 0,0, height, height);

  stroke(0);
  strokeWeight(5);
  fill(255, 213, 154);
  noFill();

  
  //curve(125, 600, 125, 600, 200, 410, 125, 310)
  
  beginShape(); 
  
  vertex(135, 600);
  curveVertex(135, 600); 
  curveVertex(125, 500); 
  curveVertex(200, 410); 
  curveVertex(125, 310); 
  curveVertex(100, 200);
  curveVertex(190, 200);
  curveVertex(225, 235);
  curveVertex(287, 230);
  curveVertex(325, 245)
  curveVertex(335, 280);
  curveVertex(329, 305);
  vertex(329, 305);
  endShape(); 

  breath = map(sin(phase * 3), -1, 1, 0, 10)
  h = 120 //+ wig;

  deformations = []

  gur = sceneAmp.getLevel() * 10

  //createSineDisplacement(0, 300, 10, 1, -5)
  createSineDisplacement(100, 300, 20)
  createSineDisplacement(0, 300, 5, 1, -5)
  createSineDisplacement(0, 150, 4 * gur, 2, 100)

  // NEED TO: fix inversion when initial vertex is in greater x / y value than second vertex
  // NEED TO: fix errors of division by zero when y1 and y2 equal each other

  x1 = 329
  y1 = 305
  x2 = 300
  y2 = 530
  dir = 1

  circArray = calculateArc(x1, y1, x2, y2, dir * (h + breath));
  translate(circArray[0], circArray[1])

  arcDiff = circArray[4] - circArray[3]

  beginShape()
  vertex(x1 - circArray[0], y1 - circArray[1])
  for (let a = 0; a < res; a += 1){
    // index = map(a, circArray[3], circArray[4], 0, res-1)
    // console.log(index)
    pos = map(a, 0, res, circArray[3], circArray[4])

    rad = circArray[2]
    newrad = rad

    deformations.forEach((deform) =>{
      newrad -= deform[a];
    })
    
    let x = newrad * cos(pos);
    let y = newrad * sin(pos);

    vertex(x, y);
  }
  vertex(x2 - circArray[0], y2 - circArray[1])
  endShape()

  translate(-circArray[0], -circArray[1])

  beginShape()
  vertex(300, 530)
  curveVertex(300, 530)
  curveVertex(312, 565)
  curveVertex(310, 600)
  vertex(310, 600)
  endShape()


  phase += 0.5;
  //noLoop();
}

function calculateArc(startx, starty, endx, endy, height) {
  distance = Math.sqrt((endy - starty)**2 + (endx - startx)**2);
  slope = (endy - starty) / (endx - startx);
  bigPerpendicular = -1 * slope**-1;

  midx = (endx + startx) / 2;
  midy = (endy + starty) / 2;

  distHalf = distance / 2
  miniSlope = height / distHalf;
  smallPerpendicular = -1 * miniSlope**-1

  rad = height / 2 - (smallPerpendicular * distHalf/2)
  offset = rad - height

  circy = midy + offset * bigPerpendicular / Math.sqrt(1 + bigPerpendicular**2)
  circx = midx + offset / Math.sqrt(1 + bigPerpendicular**2)

  rotation = 90 - atan(slope)
  innerAngle = atan(distHalf / offset)

  arcStart = (Math.floor(innerAngle/100) * -1) * 180 + innerAngle - rotation
  arcEnd = 360 - arcStart - 2 * rotation

  //console.log(distance, slope, bigPerpendicular, midx, midy, rad, offset, circx, circy)
  //console.log(rotation, innerAngle, arcStart, arcEnd)
  let dataArray = [circx, circy, rad, arcStart, arcEnd]
  return dataArray;
}

function createSineDisplacement(start, end, amp, innerwl, speed){
  diff = end - start;

  //console.log(diff)
  sineArray = [];
  for (i = 0; i < res; i++) {
    if (i < start || i > end) {
      sineArray.push(0);
    } else {
      pnt = map(i, start, end, 0, 360)
      wave = cos(pnt)
      adjusted = map(wave, -1, 1, -1, 0) * amp 
      if (innerwl) {
        interp = adjusted * cos(i * innerwl + phase * speed);
        sineArray.push(interp)
      } else {
        sineArray.push(adjusted);
      }
      
    }
  }

  console.log(cos(360))
  deformations.push(sineArray);

  return sineArray;
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
}

function playSound() {
  n = Math.floor(Math.random() * limit)

  snd = gArray[n]
  console.log(snd.duration())
  snd.play();
}