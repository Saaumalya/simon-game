/*$(".green").on("mouseover",function(){
  $(".green").css("background-color","red");
})*/

var buttoncolors=["red", "blue", "green", "yellow"];
var gamepattern=[];
var userclickedpattern=[];
var started=false;
var level=0;
$(document).keypress(function(){
  if(!started){
  $("#level-title").text("Level " + level);
  nextsequence();
  started=true;
  }
});

$(".btn").click(function(){
  var userchosencolor=$(this).attr("id");
  userclickedpattern.push(userchosencolor);
  console.log(userclickedpattern);
  playsound(userchosencolor);
  animatepress(userchosencolor);
  checkanswer(userclickedpattern.length-1);
});

function checkanswer(currentlevel){
  if(gamepattern[currentlevel]===userclickedpattern[currentlevel]){
    console.log("success");
    if(userclickedpattern.length===gamepattern.length){
      setTimeout(function(){
        nextsequence();
      },1000);
    }
  }else{
    console.log("wrong");
    playsound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game over");
    startover();
  }

}
function nextsequence(){
  userclickedpattern=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomnumber=Math.floor(Math.random()*4);
  var randomchosecolor=buttoncolors[randomnumber];
  gamepattern.push(randomchosecolor);
  $("#"+randomchosecolor).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomchosecolor);
}

function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatepress(currentcolor){
  $("#"+currentcolor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentcolor).removeClass("pressed");
}, 200);
}
function startover(){
  level=0;
  gamepattern=[];
  started=false;
}
