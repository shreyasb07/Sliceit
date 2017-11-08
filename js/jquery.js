// Click on Start reset button
	//are we playing
		//yes
			//reload the page
		//no
			//show trialsLeft Box
			//change button text to Reset Game
			//1. create a random fuit
			// define a random step
			//2. move fruit down one step every 30 sec
				// is fruit too low
					// no --> repeat no.2
					//yes --> check if any trials left?
								//yes--> repeat no.1
								//no --> show game over, change button text to Start Game
//slice a fruit
	//play sound	
	//explode fruits

var playing = false;
var score;
var step;
var trialsLeft;
var fruits = ['apple', 'mango', 'grapes', 'watermelon', 'orange', 'pears', 'cherries','banana'];
var action;




$(function(){
// Click on Start reset button
$(".startBtn").click(function(){
//are we playing
	if (playing == true) {
		//reload the page
		location.reload();
	}else{
		//not playing
		playing = true; //game initiated
		//set score to zero
		score = 0; //set score to zero
		$("#score").html(score);


		//show trialsLeft box
		$("#trialsLeft").show();
		trialsLeft = 3;
		addHearts();

		//hide game over box
		$("#gameOver").hide();

		//change button text to reset game
		$(this).text("Reset Game");
		startAction();
	}
});

$("#fruit1").mouseover(function(){
	score++;
	$("#score").html(score); //update score value
	$("#slicesound")[0].play(); // Play sound


	//stop fruit and hide
	clearInterval(action);

//$("#fruit1").toggle("explode", 500); 

	//send new fruit
//$("#fruit1").show();
	startAction();
});



//add Functions

function addHearts(){
	$("#trialsLeft").empty();
	for (var i = 0; i < trialsLeft; i++) 
	{
		$("#trialsLeft").append('<img src = "imgs/hearts.png" class = "life">');
	}
}

//start sending fruits

function startAction(){
	$("#fruit1").show();
	chooseFruits(); //choose a random fruit
	$("#fruit1").css({
		'left': Math.round(550*Math.random()),
		'top': -25 // random position
	})
	//generate a random step
	step = 1 + Math.round(5*Math.random()); //change step

	//move fruit down by one step every 10ms
	action = setInterval(function()
	{
		$("#fruit1").css('top', $("#fruit1").position().top + step);

		//check if the fruit is too low
		if ($("#fruit1").position().top > $("#fruitsContainer").height())
		{
			//check if any trials left
			if (trialsLeft > 1)
			{
				$("#fruit1").show();
				chooseFruits(); //choose a random fruit
				$("#fruit1").css(
				{
					'left': Math.round(550*Math.random()),
					'top': -25 // random position
				})
				//generate a random step
				step = 1 + Math.round(5*Math.random()); //change step
				//reduce trials left
				trialsLeft--;
				//populate trialsLeft box
				addHearts();
			}
			else{
					//game Over
					playing = false; // not playing anymore
					$(".startBtn").html("Start Game!"); // Change button to start game
					$("#gameOver").show();
					$("#gameOver").html('<p>Game Over</p><p>Your Score is ' + score +'</p>');
					$("#trialsLeft").hide();
					stopAction();
				}
		}

	}, 10);
}

function chooseFruits(){
	$("#fruit1").attr('src' , 'imgs/' + fruits[Math.round(7*Math.random())] + '.png');
}


//stop dropping fruit

function stopAction(){
	clearInterval(action);
	$("#fruit1").hide();
}



});