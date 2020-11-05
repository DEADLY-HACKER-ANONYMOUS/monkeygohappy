//loading variables
var monkey, monkey_running

var banana, bananaImage, obstacle, obstacleImage

var foodgroup, obstaclesgroup

var score

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var score;

var score1;

var time;

var gameover, gameoveri;

var background1, backgroundi;

var background2, background3, background4, background5, background6

var gameoversound;

var jumpsound;

var wb, wob;

var tick;

var ticki;

var h, e, m;

var tick2;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");

  gameoveri = loadImage("unnamed.png")

  backgroundi = loadImage("jungle2.jpg")

  background2 = loadImage("jungle.jpg")

  background3 = loadImage("jungle4.jpg")

  background4 = loadImage("images.jpg")

  background5 = loadImage("image.jpg")

  background6 = loadImage("download.jpg")

  gameoversound = loadSound("Recording.m4a")

  jumpsound = loadSound("Recordin.m4a")

  ticki = loadImage("tick.png")

}



function setup() {

  //for the animation of the forest background
  background1 = createSprite(0, 0)

  background1.addImage(backgroundi)
  
  background1.scale = 8.5


  //no use.........
  h = createSprite(870, 540, 20, 20)
  e = createSprite(870, 490, 20, 20)
  m = createSprite(870, 440, 20, 20)
  h.visible = false
  e.visible = false
  m.visible = false


  //for the buttons "with background" and "without background"
  wb = createSprite(460, 440, 20, 20)
  
  wob = createSprite(500, 490, 20, 20)


  //for the tick mark on the buttons
  
  tick = createSprite(460, 440, 10, 10)
  
  tick.addImage(ticki)
  
  tick.scale = 0.1


  //to set the canvas
  createCanvas(windowWidth, windowHeight);


  //for the bananas
  score = 0


  //for the monkey
  
  monkey = createSprite(50, 300, 50);
  
  monkey.addAnimation("moving", monkey_running);
  
  monkey.scale = 0.1;


  //for the framecount
  score1 = 0


  //for the ground with which the monkey collides
  
  invisibleGround = createSprite(800, 320, 1700, 10);
  
  invisibleGround.shapeColor = "black"

  

  
  //for the survival of time
  time = 0


  //for the obstacles and groups
  
  obstaclesgroup = createGroup();
  
  foodgroup = createGroup();


  score = 0


  //for the gameover image
  
  gameover = createSprite(650, 150)
  
  gameover.visible = false
  
  gameover.addImage(gameoveri)





}


function draw() {

  //for the initial background color
  background("purple")


  //for the infinite background
  
  background1.velocityX = -5
  
  if (background1.x < 0) {
  
    background1.x = background1.width / 2
  
  }


  //to set the default animation of forest
  if (score > -1) {
    
    background1.addImage(backgroundi)
  
  }


  //to change the background according to the score 
  if (score > 4) {
  
    background1.addImage(background2)
    
    background("blue")
    
  }

  if (score > 14) {
    
    background("green")
    
    background1.addImage(background3)
    
  }

  if (score > 24) {
    
    background1.addImage(background4)
    
    background("yellow")
    
  }

  if (score > 34) {
  
    background("lime")
    
    background1.addImage(background5)
  }

  if (score > 44) {
    
    background("red")
    
    background1.addImage(background6)
  }

  if (score > 54) {
    
    background("pink")
  }

  if (score > 64) {
    
    background("space")
  }

  if (score > 74) {
    
    background("orange")
  }

  if (gameState === PLAY) {

    //for the tick mark
    tick.visible = true

    //for the buttons
    wb.visible = true
    
    wob.visible = true

    //for the gameoverimage
    
    gameover.visible = false

    //to control the monkey using banana
    if (keyDown("space") && monkey.y >= 250) {
      monkey.velocityY = -18;
      jumpsound.play();
    }

    //to make the monkey move down when down key is pressed
    if (keyDown("DOWN_ARROW")) {
      monkey.velocityY = 10
    }


    if (keyDown("UP_ARROW") && monkey.y >= 250) {
      monkey.velocityY = -24;
      jumpsound.play();
    }

    //for the gravity
    monkey.velocityY = monkey.velocityY + 1

    //for the framecount
    score1 = Math.ceil(frameCount / 3)

    //for the time
    time = Math.ceil(Math.round(frameCount) / Math.round(frameRate()))

    //to create Random variables
    var x = Math.round(random(1, 2))
    if (frameCount % 30 === 0 && x === 1) {
      bananas();
    }
    
    
    if (frameCount % 30 === 0 && x === 2) {
      obstacles()
    }
    
    if (monkey.isTouching(obstaclesgroup)) {
      gameState = END
      gameoversound.play();
    }

    //scoring system
    if (monkey.isTouching(foodgroup)) {
      foodgroup.destroyEach();
      score = score + 1
    }
    
    //to make the monkye and the ground visible
    invisibleGround.visible = true

    monkey.visible = true

    //for the text(actually no use)
    fill("white")
    
    textFont("Georgia");
    
    textStyle(BOLD);
    
    textSize(30)
    
    text("BANANAS :" + score, 1000, 50)
    
    text("TIME :" + time, 150, 50)
    
    text("SCORE :" + score1, 600, 50)

    //to avoid echo for combination("space+ down arrow")
    if (monkey.isTouching(invisibleGround)) {
      jumpsound.stop();
    }
  }

  //for the with background
  if (mousePressedOver(wb) && gameState === PLAY) {
    //to make the animation visible when with background
    background1.visible = true

    //no use..............
    
    fill("white")
    
    textFont("Georgia");
    
    textStyle(BOLD);
    
    textSize(30)
    
    text("BANANAS :" + score, 1000, 50)
    
    text("TIME :" + time, 150, 50)
    
    text("SCORE :" + score1, 600, 50)
    
    text("WITH BACKGROUND", 50, 450)
    
    text("WITHOUT BACKGROUND", 50, 500)
  }


  //for the without background button
  if (mousePressedOver(wob) && gameState === PLAY) {
    //to make the animation invisible
    background1.visible = false

    //no use...............
    
    fill("black")
    
    textFont("Georgia");
    
    textStyle(BOLD);
    
    
    textSize(30)
  
    text("BANANAS :" + score, 1000, 50)
    
    text("TIME :" + time, 150, 50)
    
    text("SCORE :" + score1, 600, 50)
    
    text("WITH BACKGROUND", 50, 450)
    
    text("WITHOUT BACKGROUND", 50, 500)
  }
  

  //if the gamestate is end
  if (gameState === END) {

    //to make buttons invisible
    wb.visible = false
    wob.visible = false
    tick.visible = false

    //for the black color
    background("black")

    //for the gameover image
    gameover.visible = true

    //for the info and the text
    fill("white")
    textFont("Georgia");
    textStyle(BOLD);
    textSize(30)

    //no use...........
    monkey.velocityY = monkey.velocityY + 1

    //for the text for bananas,time of survival and score
    
    text("BANANAS :" + score, 50, 300)
    
    text("PRESS R TO RESTART", 800, 400)
    
    textFont("Georgia");
    
    textStyle(BOLD);
    
    textSize(30)
    
    text("TIME OF SURVIVAL :" + time, 800, 300)
    
    text("SCORE :" + score1, 50, 400)

    
    
    //to destroy the existing bananas and obstacles
    
    foodgroup.destroyEach();
    
    obstaclesgroup.setVelocityEach(0, 0)
    
    invisibleGround.visible = false
    
    obstaclesgroup.destroyEach();
    
    monkey.visible = false


    //for reset
    if (keyDown("r")) {
      reset();
    }
  }

  //to make the monkey collide with the ground
  
  monkey.collide(invisibleGround);
  
  drawSprites();



  //for the function of the button with and without background
  if (mousePressedOver(wb) && gameState === PLAY) {
    wbb();
  }
  if (mousePressedOver(wob) && gameState === PLAY) {
    wobb();
  }
  if (gameState === PLAY) {
    gameplaytext();


  }

  if (gameState === END) {
    gameendtext();
  }
}

function bananas() {

  //to create bananas at same x position with different heights........
  banana = createSprite(600, Math.round(random(120, 200)), 40, 10);

  //banana settings
  banana.addImage(bananaImage);
  
  banana.scale = 0.1;
  
  banana.velocityX = -(10 + (score / 2));
  
  foodgroup.add(banana)

  //assign lifetime to the variable
  banana.lifetime = 170;

}

function obstacles() {

  //obstacle settings
  
  var obstacle = createSprite(1100, 280, 10, 40);
  
  obstacle.addImage(obstacleImage)
  
  obstacle.velocityX = -(10 + (score / 2));
  
  obstacle.scale = 0.1
  
  obstaclesgroup.add(obstacle)
  
  obstacle.lifetime = 290
}

//for the text when game state= end
function gameendtext() {

  //text settings
  
  fill("white")
  
  textFont("Georgia");
  
  
  textStyle(BOLD);
  
  textSize(30)
  
  monkey.velocityY = monkey.velocityY + 1
  
  text("BANANAS :" + score, 50, 300)
  
  
  text("PRESS R TO RESTART", 800, 400)
  
  textFont("Georgia");
  
  textStyle(BOLD);
  
  textSize(30)
  
  text("TIME OF SURVIVAL :" + time, 800, 300)
  
  text("SCORE :" + score1, 50, 400)

  
}


//text for gamestate=PLAY
function gameplaytext() {

  //text settings

  fill("white")
  
  textFont("Georgia");
  
  textStyle(BOLD);
  
  textSize(30)
  
  
  text("BANANAS :" + score, 1000, 50)
  
  text("TIME :" + time, 150, 50)
  
  text("SCORE :" + score1, 600, 50)
  
  text("WITH BACKGROUND", 50, 450)
  
  text("WITHOUT BACKGROUND", 50, 500)
  
  /*text("HARD",700,550)
  
  
  text("MEDIUM",700,500)
  
  text("EASY",700,450)*/

  
}


//for the function with background
function wbb() {

  //background//
  background1.visible = true

  //tick mark//
  tick.x = 460
  tick.y = 440

  //text settings
  fill("white")

  textFont("Georgia");

  
  textStyle(BOLD);
  
  textSize(30)
  
  text("BANANAS :" + score, 1000, 50)
  
  text("TIME :" + time, 150, 50)
  
  text("SCORE :" + score1, 600, 50)
  
  text("WITH BACKGROUND", 50, 450)
  
  text("WITHOUT BACKGROUND", 50, 500)
}



function wobb() {

  //background invisibility
  background1.visible = false

  //for the tick mark
  tick.x = 500
  tick.y = 490

  //text settings
  
  fill("black")
  
  textFont("Georgia");
  
  textStyle(BOLD);
  
  textSize(30)
  
  text("BANANAS :" + score, 1000, 50)
  
  text("TIME :" + time, 150, 50)
  
  text("SCORE :" + score1, 600, 50)
  
  text("WITH BACKGROUND", 50, 450)
  
  text("WITHOUT BACKGROUND", 50, 500)
  
}





function reset() {

  //reset to function gametstae = play
  gameState = PLAY

  //for the framecount reset for the score and the time
  frameCount = 0

  //to destroy exisiting variables
  obstaclesgroup.destroyEach();

  //to set the score =0
  score = 0
}





//madam i created some variables named h,e,m meaning to different levels of game but they are not working ......

//so instead of deleting them i made them invisible........

//so i given them the comment "no use"


//and also madam i given other text as no use because when i use them , the background overlaps on them and make them non visible

//so i made them after drawing sprites to make them visible





