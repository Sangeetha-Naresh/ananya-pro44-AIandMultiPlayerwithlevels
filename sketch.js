var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;
var player1score =0;
var player2score =0;
var level="one";
var winner;

// *****************************AI*******************************************

var player1ai, player2ai;
var fruitsai;
var fruitGroupai;
var fruit1_imgai, fruit2_imgai, fruit3_imgai, fruit4_imgai, fruit5_imgai;
var player_imgai;
var player1scoreai =0;
var player2scoreai =0;
var back_imgai;

var PLAYAI=1;
var ENDAI=0;
var gamestateai=null;

var gamemode=null;

var levelai="one";
var winnerai;

function preload()
{
  back_img = loadImage("images/jungle.jpg");

  player_img = loadImage("images/basket2.png");

  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");

  fruitGroup = new Group();

  // *****************************AI*******************************************

  back_imgai = loadImage("images/jungle.jpg");

  player_imgai = loadImage("images/basket2.png");

  fruit1_imgai = loadImage("images/apple2.png");
  fruit2_imgai = loadImage("images/banana2.png");
  fruit3_imgai = loadImage("images/melon2.png");
  fruit4_imgai = loadImage("images/orange2.png");
  fruit5_imgai = loadImage("images/pineapple2.png");

}


function setup()
 {
  createCanvas(1000, 600);

  background(0);
   
  fill(255);
  
  text("welcome to egg catcher game",300,50);
  text("press 1 for single player press 2 for 2 player",300,100); 
}

function draw()
{

  if(keyDown("1") && gamemode===null)
  {
    gamemode="ai";

    player1ai = createSprite(200,500);
    player1ai.addImage("player1",player_imgai);
  
    player2ai = createSprite(800,500);
    player2ai.addImage("player2", player_imgai);

    fruitGroupai = new Group();

    gamestateai=PLAYAI;
  }

  

  if(keyDown("2") && gamemode===null )
  {
    gamemode="multi";
   
    clear();
    fill("red")
    text("welcome to multiplayer egg catcher game ",300,50);

    database = firebase.database();

    game = new Game();
    game.getState();
    console.log("hi");
    game.start();
  }


if (gamemode==="multi")
{
  background(back_img);
  
   if (playerCount === 2) 
   {
     game.update(1);
   }
   if (gameState === 1)
  {
     clear(); 
     game.play();
   }

   if (gameState === 2) {
    game.end();
  }
}


  //***************************************AI******************************


    if(gamestateai===PLAYAI)
    {
          background(back_imgai);
  
            
          textSize(25);
          fill("white");
          text("Player 1 :" +player1scoreai,50,50);
          text("Player 2 :" + player2scoreai, 50, 100);
  
          if(keyIsDown(RIGHT_ARROW))
          {
            player2ai.x=player2ai.x+4;
          }
  
          if(keyIsDown(LEFT_ARROW))
          {
            player2ai.x=player2ai.x-4;
          }
  
          spawnfruits();
  
          for (var i = 0; i < fruitGroupai.length; i++)
          {
            if(fruitGroupai.isTouching(player1ai))
            {
              player1scoreai=player1scoreai+1;
              fruitGroupai.get(i).destroy();
            }
            if(fruitGroupai.isTouching(player2ai))
            {
              player2scoreai=player2scoreai+1;
              fruitGroupai.get(i).destroy();
            }
          }
  
          if(player1scoreai>=3 || player2scoreai>=3)
          {
              gamestateai=ENDAI;
          }
  
          drawSprites();
  
    }
  
    if(gamestateai===ENDAI)
    {
      clear();
     
      
  
      textSize(25);
      fill("black");
      text("Player 1 :" +player1scoreai,400,330);
      text("Player 2 :" + player2scoreai, 400, 360);
  
  
  
  
      fruitGroupai.setVelocityYEach(0);
      fruitGroupai.destroyEach();

      if(player1scoreai > player2scoreai)
      {
        winnerai="player1";
      }
      else
      {
        winnerai="player2";
      }

      if(levelai==="one")
      {
        text("THE WINNER OF LEVEL1 IS:"+winnerai,400,390 );
        text("PRESS SPACE KEY TO GO TO LEVEL2",400,420);
  
        if(keyDown("space"))
        {
          clear();
          levelai="two";
          gamestateai=PLAYAI;
        
          player1scoreai=0;
          player2scoreai=0;
      
        }
      }
      if(levelai==="two" && gamestateai===ENDAI)
      {
      
        text("THE WINNER OF LEVEL2 IS:"+winnerai,400,390 );
        text("PRESS SPACE KEY TO GO TO LEVEL3",400,420);
  
        if(keyDown("space"))
        {
          clear();
          levelai="three";
          gamestateai=PLAYAI;
        
          player1scoreai=0;
          player2scoreai=0;
      
        }
      }

      if(levelai==="three" && gamestateai===ENDAI)
      {
      
        text("THE WINNER OF LEVEL3 IS:"+winnerai,400,390 );

        fill("blue");
        textSize(100);
        text("GAME OVER!",200,300);
  
        
      }


    }



   
  
}




 
 function spawnfruits()
 {
  if (frameCount % 50 === 0) 
  {
               fruitsai = createSprite(random(100, 1000), 0, 100, 100);
               if(levelai==="one")
               {
                fruitsai.velocityY = 6;
               }
               if(levelai==="two")
               {
                 fruitsai.velocityY=8;
               }
               if(levelai==="three")
               {
                 fruitsai.velocityY=10;
               }
              
               player1ai.x=fruitsai.x;
 

               var rand = Math.round(random(1,5));
               switch(rand)
               {
                   case 1: fruitsai.addImage("fruit1",fruit1_imgai);
                   break;
                   case 2: fruitsai.addImage("fruit1", fruit2_imgai);
                   break;
                   case 3: fruitsai.addImage("fruit1", fruit3_imgai);
                   break;
                   case 4: fruitsai.addImage("fruit1", fruit4_imgai);
                   break;
                   case 5: fruitsai.addImage("fruit1", fruit5_imgai);
                   break;
               }
               fruitGroupai.add(fruitsai);
               
  }
 }

