//display settings
let board;
let boardWidth=800;
let boardHeight=300;
let context;

//player settings
let playerWidth=64;
let playerHeight=64;
let playerX=50;
let playerY=boardHeight-playerHeight;
let playerImg;
let player={
    x:playerX,
    y:playerY,
    width:playerWidth,
    height:playerHeight
}
//physics
let velocityY=0;
let gravity=0.2;

//tree settings
let treeImg;
let treeWidth=70;
let treeHeight=105;
let treeX=700;
let treeY=boardHeight-treeHeight;
//generate tree 
let treeArray=[];
let treeSpeed=-3;

//game over
let gameover=false;

//score system
let score=0;

window.onload=function(){
    //display
    board=document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d");
    //player
    playerImg=new Image()
    playerImg.src="./image/player.png"
    playerImg.onload=function(){
        context.drawImage(playerImg,player.x,player.y,player.width,player.height)
    }
    //tree
    treeImg=new Image();
    treeImg.src="./image/tree.png"
    requestAnimationFrame(update)
    setInterval(createTree,3000)
    document.addEventListener("keydown",movePlayer)
}
//update animation 
function update(){
    requestAnimationFrame(update)
    if(gameover){
        return;
    }
    context.clearRect(0,0,board.width,board.height)
    velocityY+=gravity;
    //create player object
    player.y=Math.min(player.y+velocityY,playerY);
    context.drawImage(playerImg,player.x,player.y,player.width,player.height)
    //create tree object
    for(let i=0;i<treeArray.length;i++){
        let tree=treeArray[i]
        tree.x+=treeSpeed
        context.drawImage(tree.img,tree.x,tree.y,tree.width,tree.height)
        if(onCollision(player,tree)){
            gameover=true;
            context.font="normal bold 20px Arial"
            context.textAlign="center"
            context.fillText("Game Over!",boardWidth/2 , boardHeight/2)
        }
    }
    //display score
    score++;
    context.font="20px Arial"
    context.textAlign="left"
    context.fillText(score,5,20)
}

function movePlayer(e){
    if(gameover){
        return;
    }
    if(e.code=="Space" && player.y == playerY){
        velocityY=-10;
    }
}

function createTree(){
    if(gameover){
        return;
    }
    let tree={
        img:treeImg,
        x:treeX,
        y:treeY,
        width:treeWidth,
        height:treeHeight
    }
    treeArray.push(tree)
    if(treeArray.length>5){
        treeArray.shift()
    }
}

function onCollision(obj1,obj2){
    return obj1.x<obj2.x+obj2.width &&
           obj1.x+obj1.width>obj2.x &&
           obj1.y<obj2.y+obj2.height &&
           obj1.y+obj1.height>obj2.y
}

function restartGame(){
    location.reload();
}