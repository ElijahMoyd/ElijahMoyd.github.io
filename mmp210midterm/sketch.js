let pageNum = 1; //declare a variable to hold current page number (current state)
let numPages = 5; //declare a variable to hold total number of pages (states)
  let gp;
  let gpIndex;
  let gpConnected = false;
  let img; 
  let img2;
  let img3;
  let img4;
  let img5;
  let rocket;
let rain = [];
let numRain = 20;
let rocketY = 0;
let blastOff = false;
let rocketX;

function setup() {
  createCanvas(400, 400);
      img = loadImage('Background.png');
      img2 = loadImage('Spacebackground.png');
      img5 = loadImage('moon.png');
      img4 = loadImage('space2.png');
      img3 = loadImage('space.png');
      rocket = loadImage('Rocket.png')
  window.addEventListener("gamepadconnected", function(e) {
    gpIndex = e;
    gpConnected = true;
    console.log("Gamepad connected");
    for (let i = 0; i < numRain; i++){
    rain[i] = [];
    rain[i][0] = random(width);
    rain[i][1] = random(height);
  }
  });
    window.addEventListener("gamepaddisconnected", function(f) {
    gpConnected = false;
    console.log("Gamepad disconnected");
  });
}
  console.log(pageNum); //during setup, print current page (zero)


function draw() {
  console.log(blastOff);
  //display something different on the canvas depending on current page (current state)
  
   if(gpConnected){
    gp = navigator.getGamepads()[gpIndex.gamepad.index];
    if (gp.buttons[0].pressed){
      blastOff = true;
    }
  }
  if (pageNum == 1){
    image(img,0,0,width,height);
    image(rocket,width/2-rocket.width/2,height-rocket.height-rocketY ,rocket.width,rocket.height);
    if (blastOff &&  rocketY < height){
    rocketY = rocketY + 5;
    }
    if(rocketY >= height){
      pageNum = 2;
      rocketY = 0;
      
    }
  }
 
  else if (pageNum == 2){
    image(img2,0,0,width,height);
    image(rocket,width/2-rocket.width/2 + rocketX ,height-rocket.height-rocketY ,rocket.width,rocket.height);
    if (rocketY < height){
    rocketY = rocketY + 2;
    rocketX = map(gp.axes[3],-1,1,-width/3,width/3);
    }
    if(rocketY >= height){
      pageNum = 3;
      rocketY = 0;
      
    }
  }
  else if (pageNum == 3){
    image(img3,0,0,width,height);
    for (let i = 0; i < numRain; i++){
    star (rain[i][0], rain[i][1],25,75,5);
    if (rain[i][1] > height){
      rain[i][0] = random(width);
      rain[i][1] = -random(height);
    }
    rain[i][1]++;
  }
    image(rocket,width/2-rocket.width/2 + rocketX ,height-rocket.height-rocketY ,rocket.width,rocket.height);
    if (rocketY < height){
    rocketY = rocketY + 2;
    rocketX = map(gp.axes[3],-1,1,-width/3,width/3);
    }
    if(rocketY >= height){
      pageNum = 4;
      rocketY = height;
      
    }
  }
  else if (pageNum == 4){
    
    image(img5,0,0,width,height);
     image(rocket,width/2,height-rocket.height-rocketY ,rocket.width,rocket.height);
    if (rocketY > 0){
    rocketY = rocketY - 2;
    rocketX = map(gp.axes[3],-1,1,-width/3,width/3);
    }
  }
 
}
function star (x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
    fill(252, 255, 51);
  }
  endShape(CLOSE);
}

//mousePressed() function will run each time the mouse is clicked
function mousePressed(){
  //if the numerical value of the current page is less than the total number of pages, we can increment the pageNum variable's value and move to the next page
  if (pageNum < numPages){
    pageNum++;
  }
  
  //otherwise, reset to first page
  else{
    pageNum = 1;
  }
  
  //after each click, print the current page number to the console
  console.log(pageNum);
}