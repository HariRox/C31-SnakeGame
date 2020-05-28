var snakeNumSegments = 10;
var direction = 'right';

const startingX = 0; 
const startingY = 250;
const difference = 10;

var xCoordinate = [];
var yCoordinate = [];

var foodX = 0;
var foodY = 0;

var scoreText;

function setup(){
  scoreText = createDiv('Score = 0');
  scoreText.position(20, 20);
  scoreText.id = 'score';
  scoreText.style('color', 'red');

  createCanvas(600, 600);
  
  frameRate(25);
  stroke(255);
  strokeWeight(10);
  updateFoodPosition();

  for (let i = 0; i < snakeNumSegments; i++){
    xCoordinate.push(startingX + i * difference);
    yCoordinate.push(startingY);
  }
}

function draw(){
  background(0);
  for(let i = 0; i < snakeNumSegments - 1; i++){
    line(xCoordinate[i], yCoordinate[i], xCoordinate[i + 1], yCoordinate[i + 1]);
  }

  updateSnakePosition();
  checkBoundaries();
  checkFoodCollision();
}

function updateSnakePosition(){
  for(let i = 0; i < snakeNumSegments - 1; i++){
    xCoordinate[i] = xCoordinate[i + 1];
    yCoordinate[i] = yCoordinate[i + 1];
  }
  
  switch(direction){
    case 'right':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2] + difference;
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2];
      break;

    case 'up':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2];
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2] - difference;
      break;
      
    case 'left':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2] - difference;
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2];
      break;
      
    case 'down':
      xCoordinate[snakeNumSegments - 1] = xCoordinate[snakeNumSegments - 2];
      yCoordinate[snakeNumSegments - 1] = yCoordinate[snakeNumSegments - 2] + difference;
      break;
  }
}


function checkBoundaries(){
  if(xCoordinate[xCoordinate.length - 1] > width ||
     xCoordinate[xCoordinate.length - 1] < 0 ||
     yCoordinate[yCoordinate.length - 1] > height ||
     yCoordinate[yCoordinate.length - 1] < 0 ||
     checkSnakeCollision()){
    noLoop();
    const scoreVal = parseInt(scoreText.html().substring(8));
    scoreText.html('Game ended! Your score was : ' + scoreVal);
  }
}

function checkSnakeCollision(){
  const snakeHeadX = xCoordinate[xCoordinate.length - 1];
  const snakeHeadY = yCoordinate[yCoordinate.length - 1];
  
  for (let i = 0; i < xCoordinate.length - 1; i++) {
    if(xCoordinate[i] === snakeHeadX && yCoordinate[i] === snakeHeadY)     {
      return true;
    }
  }
}

function checkFoodCollision(){
  point(foodX, foodY);
  if(xCoordinate[xCoordinate.length - 1] === foodX && yCoordinate[yCoordinate.length - 1] === foodY){
    const prevScore = parseInt(scoreText.html().substring(8));
    scoreText.html('Score = ' + (prevScore + 1));
    xCoordinate.unshift(xCoordinate[0]);
    yCoordinate.unshift(yCoordinate[0]);
    snakeNumSegments++;
    updateFoodPosition();
  }
}
function updateFoodPosition(){
  foodX = floor(random(10, (width - 100) / 10)) * 10;
  foodY = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed(){
  switch(keyCode)
  {
    case 37:
      if(direction !== 'right'){
        direction = 'left';
      }
      break;
      
    case 39:
      if(direction !== 'left'){
        direction = 'right';
      }
      break;
      
    case 38:
      if (direction !== 'down'){
        direction = 'up';
      }
      break;
      
    case 40:
      if (direction !== 'up'){
        direction = 'down';
      }
      break;
  }
}