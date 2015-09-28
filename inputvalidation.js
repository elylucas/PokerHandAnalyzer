var cardValues = require('./cardvalues');

function validate(input) {	
		
	var valid = /(([2-9]|10|J|Q|K|A)[HDSC]\s*){5}$/i.test(input);	
	if(!valid){
		return new Error('Input string is not valid');
	}
	input = input.toUpperCase();
		
	return getCardArray(input);
}

function getCardArray(input) {
	var cardArray = [];
	var cardRegEx = /([2-9]|10|J|Q|K|A)([HDSC])/gi;
	
	var match = cardRegEx.exec(input);
	while(match != null) {
		cardArray.push({
			face: match[1],
			suite: match[2]
		});
		match = cardRegEx.exec(input);
	}
	
	cardArray.sort(cardSortCompare);
	return cardArray;
}

function cardSortCompare(a, b) {
	return cardValues[b.face] - cardValues[a.face];
}

module.exports = validate;