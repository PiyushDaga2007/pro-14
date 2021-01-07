var PLAY=1;
var END=0;
var gameState=PLAY;
var sword,swordImage;
var fruits,enemy;
var fruit1,fruit2,fruit3,fruit4;
var score,fruitsGroup,enemyGroup;
var monster,monsterImage;
var gameOverImage;
var ran=0;
var sound ,osound;
function  preload(){
 swordImage=loadImage("sword.png"); 
 fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
monsterImage=loadAnimation("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png")
  sound = loadSound("knifeSwooshSound.mp3")
  osound =loadSound("gameover.mp3");
}
function setup(){
  createCanvas(400,400);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  fruitsGroup= createGroup();
  enemyGroup=createGroup();
  score=0;
}
function draw(){
background("white");
  text("score :"+score,200,50);
  
  if(gameState===PLAY){
  ran=ran+Math.round(getFrameRate());
    console.log(ran);
    sword.y=World.mouseY;
     sword.x=World.mouseX;
  if(fruitsGroup.isTouching(sword)){
    sound.play();
    fruitsGroup.destroyEach();
    score+=2;
  }
    createFruits();
    enemy();
    if(enemyGroup.isTouching(sword)){
      osound.play();
      gameState=END;
      
      fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
fruitsGroup.velocityX=0;
      enemyGroup.velocityX=0;
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;
      
    }
  }
  drawSprites();

}
function createFruits(){
  if(frameCount%80===0){
   fruits=createSprite(400,200,20,20);
    fruits.scale=0.2;
    var r=Math.round(random(1,4))
  switch(r){
    case 1:fruits.addImage(fruit1);
      break;
      case 2:fruits.addImage(fruit2);
      break;
      case 3:fruits.addImage(fruit3);
      break;
      case 4:fruits.addImage(fruit4);
      break;
      default:break;
  }
    fruits.y=Math.round(random(50,340));
    fruits.velocityX=-7-score/10;
    fruits.setLifetime=100;
    fruitsGroup.add(fruits);
    }
}
function enemy(){
 if(frameCount%200===0){
   monster=createSprite(400,200,20,20);
   monster.addAnimation("running",monsterImage);
   monster.y=Math.round(random(100,300));
   monster.velocityX=-8-score/8;
   monster.setLifetime=50;
   enemyGroup.add(monster);
 } 
}