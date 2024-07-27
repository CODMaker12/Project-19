var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50)
  ghost.addImage("ghost_image", ghostImg)
  ghost.scale = 0.3

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  spookySound.loop()
}

function draw() {
  background(200);
  if (gameState === "play") {
    
    drawSprites() 

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x -3
    }    

    if (keyDown("right_arrow")) {
      ghost.x = ghost.x +3
    }    

    if (keyDown("space")) {
      ghost.velocityY = ghost.velocityY -5
    }    
    ghost.velocityY = ghost.velocityY + 0.8

    spawnDoors()

    if(tower.y > 400){
        tower.y = 300
      }

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0
    }

    if (invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
      ghost.destroy();
      gameState = "end" 
    }
  }

  if (gameState === "end") { 
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER", 230, 250)
  }
  
}


function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200,-50) 
    door.addImage("Door", doorImg)
    door.velocityY = 1
    door.x = Math.round(random(120,400))

    climber = createSprite(200,10)
    climber.addImage("climber",climberImg)
    climber.velocityY = 1
    climber.x = door.x

    ghost.depth = door.depth
    ghost.depth += 1

    invisibleBlock = createSprite(200, 15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1
    invisibleBlock.x = door.x
    invisibleBlock.debug = true

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
}