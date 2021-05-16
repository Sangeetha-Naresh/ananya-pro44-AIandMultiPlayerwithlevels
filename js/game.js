class Game
{
    constructor(){}


    getState() 
    {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) 
    {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() 
    {
            if (gameState === 0) 
            {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists())
                 {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
            player1 = createSprite(200,500);
            player1.addImage("player1",player_img);
            
            player2 = createSprite(800,500);
            player2.addImage("player2", player_img);
            
            players=[player1,player2];

    }
    
    play()
    {
        
        form.hide();

        Player.getPlayerInfo();

        image(back_img, 0, 0, 1000, 800);

        var x =100;
        var y=200;
        var index =0;

        drawSprites();

        for(var plr in allPlayers)
        {
                    
                    
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
                     
            players[index -1].x = x;
            players[index - 1].y = y;
                       
            if(index === player.index)
            {
                         
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25);

                         
            }
                    
            textSize(25);
            fill("white");
            text("Player 1 :" +allPlayers.player1.score,50,50);
            text("Player 2 :" + allPlayers.player2.score, 50, 100);
                 
        }
                
                
                 

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) 
        {
                    player.distance -= 10
                    player.update();
        }
        if (keyIsDown(LEFT_ARROW) && player.index !== null)
        {
                    player.distance += 10
                    player.update();
        }
            
        if (frameCount % 80 === 0) 
        {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;

       

                     var rand = Math.round(random(1,5));
                     switch(rand)
                     {
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
        }
                 
        if (player.index !== null) 
        {
            for (var i = 0; i < fruitGroup.length; i++)
             {
                if (fruitGroup.get(i).isTouching(players)) 
                {
                    fruitGroup.get(i).destroy();
                    
                    player.score =player.score+1;
                    player.update();
                              
                 }
                          
            }
        }

        if(player.score>=3)
        {
            this.end();
        }


    }

    end(){

       game.update(2);
       clear();
       fill("blue");
       textSize(100);
       text("GAME OVER!",200,300);

       fruitGroup.setVelocityYEach(0);
       fruitGroup.destroyEach();

      
        textSize(25);
        fill("red");
        text("Player 1 :" +allPlayers.player1.score,200,350);
        text("Player 2 :" + allPlayers.player2.score, 200, 400);

        if(allPlayers.player1.score >allPlayers.player2.score)
      {
        winner="player1";
      }
      else
      {
        winner="player2";
      }

      if(level==="one")
      {
        text("THE WINNER OF LEVEL1 IS:"+winner,200,420 );
        text("PRESS SPACE KEY TO GO TO LEVEL2",200,440);
  
        if(keyDown("space"))
        {
          clear();
          level="two";
          gameState=1;
          game.update(1);
        
          allPlayers.player1score=0;
          allPlayers.player2score=0;

          player.score=0;
          player.update();
      
        }
      }

      game.getState();
      if(level==="two" && gameState===2)
      {
        text("THE WINNER OF LEVEL2 IS:"+winner,200,420 );
        text("PRESS SPACE KEY TO GO TO LEVEL3",200,440);
  
        if(keyDown("space"))
        {
          clear();
          level="three";
          gameState=1;
          game.update(1);
        
          allPlayers.player1score=0;
          allPlayers.player2score=0;

          player.score=0;
          player.update();
      
        }
      }

      game.getState();
      if(level==="three" && gameState===2)
      {
        text("THE WINNER OF LEVEL3 IS:"+winner,200,420 );
        text("GAME OVER!!!!",200,440);
      }

       
    }
                
    

    
}