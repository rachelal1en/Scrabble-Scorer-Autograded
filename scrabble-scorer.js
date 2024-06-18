// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let oldScrabbleScorer = function (word) {
	word = word.toUpperCase();
	let letterPoints = "";
   let score =0;
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         score += Number(pointValue);
		 }
 
	  }
	}
	return score;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   let userWord = input.question("Enter a word to score: ");
   return userWord;
};


let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

let simpleScorer = function (word) {
   word = word.toUpperCase();
	let letterPoints = "";
   let score = 0;
	for (let i = 0; i < word.length; i++) {
      letterPoints += `Points for '${word[i]}': 1\n`
      score += 1;
	  }
	return score;
}

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = "";
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
         letterPoints += `Points for '${word[i]}': 3\n`
         score += 3;
      }
      else {
      letterPoints += `Points for '${word[i]}': 1\n`
      score += 1;
	  }
   }
	return score;
}

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;
	for (let i = 0; i < word.length; i++) {
      let tempVal = word[i];
      score += newPointStructure[tempVal];
	  }
	return score;
};

const scoringAlgorithms = [];

let simpleScorerObject = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};
let vowelBonusScorerObject = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};
let ScrabbleScorerObject = {
   name: "Scrabble",
   description: "	The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};
scoringAlgorithms.push(simpleScorerObject, vowelBonusScorerObject, ScrabbleScorerObject);
// console.log(scoringAlgorithms);

function scorerPrompt(word) {
   let userSeletion = -1;
   while ((userSeletion != 0) && (userSeletion != 1) && (userSeletion != 2)) {
      console.log(typeof userSeletion);
      userSeletion = input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");}
   return (`Score for '${word}': ${scoringAlgorithms[userSeletion].scorerFunction(word)}`);
}


function transform(oldPointStructure) {
   let tempObject = {};
   for (item in oldPointStructure) {
      let score = Number(item);
      let tempArr = oldPointStructure[item];
      for (let i=0; i<tempArr.length; ++i) {
         let tempLett = String(tempArr[i]).toLowerCase();
         tempObject[tempLett] = score;         
      }
   };
   return tempObject;
};

function runProgram() {
   let userWord = initialPrompt();
   console.log(scorerPrompt(userWord));
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
