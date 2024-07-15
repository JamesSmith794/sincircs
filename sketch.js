// Alex Donley
// https://thecodingtrain.com/challenges/36-blobby

let phase = 0.0;
let gArray = []
let song

function setup() {
  createCanvas(600, 600);
  // numOfVert = createSlider(2, 80, 40, 1);
  wavelength = createSlider(2, 40, 10, 0.5);
  amplitude = createSlider(0, 100, 100, 1);
  rotation = createSlider(0, 1, 0, .01);
  interpolation = createSlider(1, 200, 3, 1)
  phaseSlide = createSlider(-1, 1, 0.5, 0.01)

  limit = 12

  for (i = 0; i<limit; i++) {
    gArray[i] = loadSound('sfx/g' + (i + 1) +'.wav')
  }

  sceneAmp = new p5.Amplitude();
}

function draw() {
  background(0);
  noFill(); 
  stroke(255)
  
  let res = width;
  //let amp = amplitude.value();
  let amp = sceneAmp.getLevel() * amplitude.value();
  // if (gur.isPlaying()) {
  //     let amp = gur.getLevel();
  // }
  
  let limit = wavelength.value() * PI;
  let waveArray = [];
  
  // ellipse(width/2, width/2 + 50, 5, 5)
  
  //raw arrays
  
  for (let n=0; n<res+1; n++){
    let x = n * limit / res
    let y;
    if (x < TWO_PI){
      y = ((cos(x+PI) + 1));
    } else {
      y = 0;
    }
    waveArray.push([x, y])
  }
  
  translate(0, height)
 
  //linear visual
   
  // beginShape();
  // waveArray.forEach((element) =>{
  //   vertex(element[0]*width/limit, ((element[1]*amp/20)+1)*-1*height/2)
  // })
  // endShape();
  
 
  //circular visual
  
  ellipse(width/2 + 150, width/2, 5, 5)
  translate(width / 2, - height / 2);

//   var radius = 150;
//   var rot = rotation.value()*TWO_PI;

//   beginShape();
//   for (var a = 0; a < res; a += 1) {
//     let r = radius + (waveArray[a][1] * amp);
//     let x = r * cos(TWO_PI*a/res + rot);
//     let y = r * sin(TWO_PI*a/res + rot);
//     vertex(x, y);
//   }
//   endShape(CLOSE);
  
  
//   wiggle interpolation
//   translate(-width / 2, 0);
  
//   beginShape()
//   for (let m = 0; m < waveArray.length; m++){
//     let x = m;
//     let y = cos(m/interpolation.value() + phase) * height * amp * waveArray[m][1]/40;
//     vertex(x, y);
//   }
//   endShape()
//   translate(width / 2, 0);
  
//wiggle circle
  
  
  var radius = height / 4;
  var rot = rotation.value()*TWO_PI;

  beginShape();
  for (var a = 0; a < res; a += 1) {
    let r = radius + (cos(a/interpolation.value() + phase) * amp * waveArray[a][1]);
    let x = r * cos(TWO_PI*a/res + rot);
    let y = r * sin(TWO_PI*a/res + rot);
    vertex(x, y);
  }
  endShape(CLOSE);

  phase += phaseSlide.value();
}

function playWav() {
  // if (!song.isPlaying()) {
    n = Math.floor(Math.random() * limit)

    song = gArray[n]
    console.log(song.duration())
    song.play();
  //}
}