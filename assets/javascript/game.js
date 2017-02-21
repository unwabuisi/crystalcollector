// GLOBAL VARIABLES
// =================================================================================
//User score always begins at 0, Main Number is randomly generated
var mainNumber;
var userScore;

//Game Counters
var wins = 0;
var losses = 0;

//Crystal number values
var crystalValues;


//FUNCTIONS
// =================================================================================

//Generates a random integer between min,max inclusive
function randomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

//Populates crystalValues array with random integers making sure no two crystals have the same value
function crystalValuePopulator () {
	nums = uniqueArray(4,1,12);
	return nums;
}

//Creates an array with unique numbers and no duplicates
function uniqueArray(num_elements,min,max) {

    var temp, nums = new Array;

    for (var i=0; i<num_elements; i++) {

        while((temp=number_found(randomInt(min,max),nums))==-1);
        nums[i] = temp;
    }

    return (nums);
}

//returns whether the number has been found in the array
function number_found(random_number,number_array) {

    for (var i=0; i<number_array.length; i++) {

        if (random_number==number_array[i]) {
            return (-1);
	}
   }

    return (random_number);
}

//Initializes the game and resets game/win counters
function startGame(wins,losses) {
	mainNumber = randomInt(19,120);
	crystalValues = crystalValuePopulator();
	wins = wins;
	losses = losses;
	userScore = 0;
	
	//function(s) to update displays
	$("#numberToGuess").html(mainNumber);
	$("#score").html(userScore);
	$("#wins").html("Wins: " + wins);
	$("#losses").html("Losses: " +losses);
	$("#crystal1").attr("value",crystalValues[0]);
	$("#crystal2").attr("value",crystalValues[1]);
	$("#crystal3").attr("value",crystalValues[2]);
	$("#crystal4").attr("value",crystalValues[3]);
}

//Checks if the game is over
function isGameOver() {

	//User Won
	if (userScore == mainNumber) {
		wins++;
		startGame(wins,losses);
	}

	//User lost
	else if (userScore > mainNumber) {
		losses++;
		startGame(wins,losses);
		
	}
}

//Adds value of crystal to user score
function crystalAdder() {

	event.preventDefault();

	num = $(this).attr("value");
	userScore += parseInt(num);
	$("#score").html(userScore);

	isGameOver();
}



//MAIN PROCESS
// =================================================================================
startGame(0,0);

$(".crystal").on("click", crystalAdder);