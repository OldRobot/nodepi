var socket;
var thisID=0;
var serverRefreshTime=200;
var timer=0;

function setup(){
    createCanvas(400,400);
    background(51);
   
    noStroke();

    socket = io.connect('192.168.1.123:8080');
    socket.on('mouse',newDrawing);
    socket.on('con',newMsg);
    socket.on('chat',newChat);
}

function newDrawing(data){
    fill(100,200,200);
    ellipse(data.x,data.y,20,20);

}

function newMsg(data){

    thisID=data;
}

function mouseDragged(){
    console.log("sending: " + mouseX + ","+ mouseY);
    var data={
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse',data);
    fill(220);
    ellipse(mouseX,mouseY,20,20);

}

function draw(){
    timer++;
    if(timer>serverRefreshTime){
        timer=0;
        socket.emit('refresh',"refresh");
    }
    fill(20);
    rect(0,0,width,100);
    fill(200);
    text(thisID,20,30);
}

function clicked(){
    var t = document.getElementById("connectInput").value;
   // console.log(t);
    socket.emit('connect_to',t);
}

function newChat(data){
    console.log(data);
}