var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  ftd=createButton("Feed the Dog");
  ftd.position(700,95);
  ftd.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("feedTime");
 feedTime.on("value",function(data){
 lastFed=data.val();
 });
  //write code to display text lastFed time here
  fill("purple");
  textSize(20);
  if (lastFed>=12){
  text("Last Fed : "+lastFed%12+" PM",350,95);
  }else if(lastFed==0){
    text("Last Fed : "+lastFed+" AM",350,95);
  }else{
    text("Last Fed : "+lastFed+" AM",350,95);
  }
 // lastFed.database.ref("/");
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
}


function feedDog(){
  dog.addImage(happyDog);
  
  //write code here to update food stock and last fed time
  
  var foodStock=foodObj.getFoodStock();
  if(foodStock>0){
    foodObj.updateFoodStock(foodStock-1);
   }else{
    
    foodObj.updateFoodStock(foodStock*0);
   }

   database.ref("/").update({
     Food:foodStock,
     feedTime:hour()
   });

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
