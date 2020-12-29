var PLAY=1;
var END=0;
gameState=PLAY
var monkey,monkey_running;
var jungle,jungleImage;
var fruit,fruitImage;
var score;

function preload(){
  
  jungleImage=loadImage("jungle.png");
  
  monkey_running =
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png ")
  
  fruitImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  score=0;
 }
function setup() {
  
  createCanvas(400, 400);
  jungle= createSprite(200,200,300,10);
  //jungle.velocityX=-2;
  jungle.addImage("background",jungleImage);
  jungle.scale=0.7;
  
  ground = createSprite(200,350,900,10);
  ground.visible=false;
  
  monkey = createSprite(80,250,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  FoodGroup=new Group();
  obstacleGroup= new Group(); 
  
}

function draw() {
  background(220);
   if(jungle.x<50){
    jungle.x=200;
  }
  if(gameState===PLAY){
    ground.velocityX=5;
    monkey.velocityX = 5;
    camera.position.x = monkey.x;
   if (monkey.x % 400 === 0){
    scroller = createSprite(monkey.x+400, 200, 300, 10);
    scroller.addImage(jungleImage);
    scroller.scale = 0.7;
    scroller.depth = monkey.depth;
    monkey.depth++;
   }
   if(ground.x<0){
    ground.x=200;
  }
  if(keyDown("space")&&monkey.y>=150){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  food();
  obstacles();
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+2;
  }
  if(obstacleGroup.isTouching(monkey)){
      gameState=END;
  }
  if (score === 100){
    gameState = END;
  text("You Won!!",monkey.x-30,180);
    text("Press r to restart",monkey.x-50,200);
  }
  
  }
  if(gameState===END){
    jungle.velocityX=0;
    obstacle.velocityX=0; 
   monkey.pause();
    monkey.scale=0.1;
    monkey.collide(ground);
    FoodGroup.destroyEach();
    if(keyDown("R")){
      reset();
    } 
    textSize(20);
    monkey.velocityX = 0
    text("GAME OVER",monkey.x-30,180);
    text("Press r to restart",monkey.x-50,200);
  }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("white");
  text("Score:"+score,monkey.x-30,50);
}

function food () {
  if(frameCount%80===0){
    fruit=createSprite(400,165,10,40);
    //fruit.velocityX=-5;
    fruit.addImage("moving",fruitImage);
    fruit.scale=0.05;
    fruit.y=Math.round(random(120,200));
    fruit.x = monkey.x + 200;
    FoodGroup.add(fruit);
}
} 
  function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(400,325,10,40);
    obstacle.collide(ground); 
    //obstacle.velocityX=-2;
    obstacle.addImage("moving",obstacleImage);
    obstacle.scale=0.1;
    obstacle.x = monkey.x + 200;
    obstacleGroup.add(obstacle);
    
  }
}
function reset(){
  gameState=PLAY;
  score=0;
  survivaltime=0;
  monkey.play();
  jungle.velocityX=-2;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
}
