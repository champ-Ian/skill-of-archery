//Author:

// eslint-disable-next-line no-unused-vars

let isStart =  false;
let isPracticeMode = false;
let startTime;
let score = 0;
let isScoreStage = false;
let ball = 400;
let ballSpeed = 5;
let ballChange = true;
let hit = false;
let arrowShoot = false;
let arrowX;
let arrowY;
let arrowSize;

//your score
let shootCount = 5;
//how much time did

function setup() {
    createCanvas(800,600);
}

// 
function draw() {
   
    if (isScoreStage){
        showScore();
    }else{
        if (isStart===true){
            startGame();
        }else{
            readyGame();
        }
    }

}  
function showScore(){
    background(150,180,255);
    fill("black");
    textAlign(CENTER);
    textSize(100);
    if (score > 20){
        text("Nice Job!", width/2, 100);
    }else{
        text("Try again!", width/2, 100); 
    }
    text("Your score is...",width/2, 300);
    textSize(140);
    text(score,width/2, 500);

    if (millis()-startTime >= 2000){
        isScoreStage = false;
        console.log('here!')
        isStart= false;
    }
    

}
function readyGame(){
    
    textAlign(LEFT);
    background(150,180,255)
    fill("red")
    rect(50,150,300,300)
    fill("yellow")
    rect(450,150,300,300)
    textSize(50);
    fill("black")
    text("Archery Practice",100,250,50)
    textSize(50);
    fill("black")
    text("Archery Game",500,250,50)
}

function startGame(){


    if(isPracticeMode){
        startPracticeGame();
        
    }else{
        startBattleMode();
    }
}

function startPracticeGame(){

    background("gray")
    fill("yellow")
    ellipse(ball,300,100)
    fill("white")
    ellipse(700,500,100)
    textSize(32);
    fill("black");
    text("exit",675,510)
    if(ballChange == true){
        ball = ball+ballSpeed
    }
    if(ballChange == false){
        ball = ball-ballSpeed
    }
    if(ball >= 750){
        ballChange = false;
    }
    if(ball <= 50){
        ballChange = true;
    }
    if(arrowShoot){
        fill('white')
        ellipse(arrowX,arrowY,arrowSize);
        if(arrowSize > 10){
            arrowSize = arrowSize*0.93;
        }
    }
    let distance = dist(arrowX,arrowY,ball,300)
    if(arrowSize <= 10){
        ballSpeed = 0;
        if(distance < 50){
            textSize(100);
            fill("yellow")
            text("Hit",30,100)

        }else{
            textSize(100);
            fill("yellow")
            text("Not Hit",30,100)  
        } 

    
    }
}
        
    

function startBattleMode(){

    background(150,180,255);

    fill("white");
    ellipse(400,300,550);
    fill("black");
    ellipse(400,300,400);
    fill("blue");
    ellipse(400,300,250);
    fill("red");
    ellipse(400,300,100);
    fill("yellow");
    ellipse(400,300,10);
    textSize(100);
    fill("black");
    text(score,50,50,100);
    textSize(110);
    textAlign(LEFT);
        if (shootCount <= 0){
            // isStart = false;
            isPracticeMode = false;
            isScoreStage = true;
            shootCount = 5;
            startTime = millis();
        }
 
        if(millis()- startTime >= 3000){
            text('0',700,100)
        }else{
            text(Math.floor(4-(millis() - startTime)/1000),700,100)
        }
        if(millis() - startTime >= 3000){
            console.log('finished');
            textSize(150);
            fill("brown")
            textAlign(CENTER);   
            text("You Lose",400,250)
            shootCount= 5;
    
        }
        // console.log(millis());
        if(millis() - startTime >= 5000){
        text(score,300,300,50)
    isStart = false;

  
    }
    
}
    


    

    


function mouseClicked(){
    
    console.log(shootCount);
    if (!isStart){
        if(mouseX>50 && mouseX<350 && mouseY>150 && mouseY<450){
            console.log('clicked');
            startTime = millis();
            score = 0;
            ballSpeed =  15*Math.random()+5;
            isPracticeMode = true;
            isStart= true;
        }
        if(mouseX>450 && mouseX < 750 && mouseY>150 && mouseY<450){
            console.log('clicked')
            startTime = millis();
            score = 0;
            // console.log(millis())
            isPracticeMode = false;
            isStart= true;
        }
    }
    else if  (millis()-startTime >=100 && !isScoreStage){
        if(!isPracticeMode){
             gameModeClick();
        }else{
            arrowShoot = true;
            arrowX = mouseX;
            arrowY = mouseY;
            arrowSize = 80;
            let distance = dist(700,500,mouseX,mouseY)
            if(distance < 50){
                isStart = false;
                isPracticeMode = false;
                arrowShoot = false;
            }
        }            
    }
}
                
          
function gameModeClick(){
    let distance = dist(400,300,mouseX,mouseY);
    if(distance < 5){
        console.log('5')
        score = score+5
        shootCount = shootCount-1
      
        startTime= millis();
        

    }else if(distance < 50){
        console.log('4')
        score = score+4
        shootCount = shootCount-1
      
        startTime= millis();
        
    }else if(distance < 125){
        console.log('3')
        score = score+3
        shootCount = shootCount-1
      
        startTime= millis();
        
    }else if(distance < 200){
        console.log('2') 
        score = score+2 
        shootCount = shootCount-1
    
        startTime= millis();
        
    }else if(distance < 275){
        console.log('1')
        score = score + 1
        shootCount = shootCount-1
        
        startTime= millis();
   
    }  
}
