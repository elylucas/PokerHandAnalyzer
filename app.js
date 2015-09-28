
var validate = require('./inputvalidation');
var analyzer = require('./pokerhandanalyzer');
var cardValidate = require('./inputvalidation');

var args = process.argv.slice(2);

var cardArray = cardValidate(args[0]);

if(cardArray instanceof Error) {
  console.log(cardArray.message);
  process.exit(1);
}

var handResult = analyzer.analyzeHand(cardArray);
console.log(handResult.description);
