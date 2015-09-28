
var faceNames = require('./facenames');
var cardValues = require('./cardvalues');

function analyzeHand(cards){	
	var result = checkForPairings(cards) || isStraightFlush(cards) || isFlush(cards) || isStraight(cards) || setHighCard(cards);	
	return { description: result};
}

function isStraightFlush(cards){
	var result;
	if(isFlush(cards) && isStraight(cards)){
		if(cards[0].face === 'A'){
			result = 'Royal flush';
		} else {
			result = faceNames[cards[0].face] + '-high straight flush';
		}		
	}
	return result;
}

function isFlush(cards) {
	var result;
	var isFlush = cards.isFlush || cards.every(function(card){
		return card.suite === cards[0].suite;
	})
	if(isFlush) {
		result = faceNames[cards[0].face] + '-high flush';
		cards.isFlush = true;
	}
	return result;
}

function isStraight(cards){
	var result;
	var isStraight = true;
		
	var internalCardArray = cards.slice(0);
	
	if(isPossibleFiveHighStraightWithAnAce(internalCardArray))
	{
		//temp move the ace to the bottom of the array to check for straight
		var aceCard = internalCardArray.shift();
		internalCardArray.push(aceCard);
	}
	
	var highCardValue = cardValues[internalCardArray[0].face];
	
	for(var i = 1; i < internalCardArray.length; i++){
		var nextCardValue = cardValues[internalCardArray[i].face];
		
		if(i === internalCardArray.length - 1 && internalCardArray[i].face === 'A') {
			//if the last card is an Ace, then treat it as a value of 1 to test for a straight
			nextCardValue = 1;
		}
		
		if((highCardValue - 1) !== nextCardValue) {
			isStraight = false;
			break;
		}
		highCardValue = nextCardValue;	
	}
	if(isStraight) {
		result = faceNames[internalCardArray[0].face] + '-high straight';
	}
	return result;
}

function checkForPairings(cards){
	var cardGroup = {};
	
	cards.forEach(function(card){
		cardGroup[card.face] = cardGroup[card.face] || [];
		cardGroup[card.face].push(card);
	});
	var keys = Object.keys(cardGroup);
	var result;
	if(keys.length === 4){
		keys.some(function(cardFace) {			
			if(cardGroup[cardFace].length === 2){
				result = 'Pair of ' + faceNames[cardFace] + 's';
				return true;
			}
		});
	} else if(keys.length === 3){
		keys.some(function(cardFace) {			
			if(cardGroup[cardFace].length === 3){
				result = 'Three ' + faceNames[cardFace] + 's';
				return true;
			}
		});
	} else if(keys.length === 2){
		var fours = cardGroup[keys[0]].length === 4 ? cardGroup[keys[0]] : cardGroup[keys[1]].length === 4 ? cardGroup[keys[1]] : null;
		
		if(fours){
			result = 'Four ' + faceNames[fours[0].face] + 's';
		} else {	
			var threes = cardGroup[keys[0]].length === 3 ? cardGroup[keys[0]] : cardGroup[keys[1]].length === 3 ? cardGroup[keys[1]] : null;
			var twos = cardGroup[keys[0]].length === 2 ? cardGroup[keys[0]] : cardGroup[keys[1]].length === 2 ? cardGroup[keys[1]] : null;
			if(threes && twos) {
				result = "Full house - " + faceNames[threes[0].face] + 's full of ' + faceNames[twos[1].face] + 's'
			}
		}
	}
	
	return result;
}

function setHighCard(cards) {
	return faceNames[cards[0].face] + ' high';
}

function isPossibleFiveHighStraightWithAnAce(cards){
	return cards[0].face === 'A' && cards[cards.length - 1].face === '2'
}

module.exports = {
	analyzeHand: analyzeHand
}