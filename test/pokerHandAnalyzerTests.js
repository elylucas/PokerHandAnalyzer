var expect = require('chai').expect;

describe('analyze poker hand', function(){
	
	var validate, analyzer;
	
	beforeEach(function(){
		validate = require('../inputvalidation');
		analyzer = require('../pokerhandanalyzer');
	})
	
	it('should return a royal flush when there is a 10, J, K, Q, and A heart cards', function(){
		var cardArray = validate('Ah Qh Kh 10h Jh');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Royal flush');
	});
	
	it('should return a 10 high straight flush when there is a 6, 7, 8, 9, and 10 club cards', function(){
		var cardArray = validate('6c 8c 10c 9c 7c');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Ten-high straight flush');
	});
	
	it('should return a Queen high club flush when all cards are clubs', function(){
		var cardArray = validate('Qc 5c 6c 2c 4c');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Queen-high flush');
	});
	
	it('should return a Queen high diamond flush when all cards are diamonds', function(){
		var cardArray = validate('Qd 5d 6d 2d 4d');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Queen-high flush');
	});
		
	it('should return a six high straight when there is a 2, 3, 4, 5, and 6 card', function(){
		var cardArray = validate('3h 5s 6c 2d 4h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Six-high straight');
	});
	
	it('should return an ace high straight when there is a 10, J, Q, K, and A card', function(){
		var cardArray = validate('10h As Jc Kd Qh');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Ace-high straight');
	});
	
	it('should return a Five high straight when there is a A, 2, 3, 4, and 5 card', function(){
		var cardArray = validate('5h As 2c 3d 4h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Five-high straight');
	});
	
	it('should return a 10 high straight when there is a 6, 7, 8, 9, and 10 card', function(){
		var cardArray = validate('6h 7s 10c 8d 9h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Ten-high straight');
	});
	
	it('should return a King high straight when there is a 9, 10, J, Q, and K card', function(){
		var cardArray = validate('Kh Qs 10c Jd 9h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('King-high straight');
	});
	
	it('should return a full house when there are 2 nines and three As', function(){
		var cardArray = validate('Ah As 9c Ad 9d');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Full house - Aces full of Nines');
	});	
	
	it('should return a full house when there are 3 nines and two 5s', function(){
		var cardArray = validate('9h 5s 9c 5d 9d');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Full house - Nines full of Fives');
	});	
	
	it('should return a four of a kind when there are four As', function(){
		var cardArray = validate('Ah As 6c Ad Ac');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Four Aces');
	});	
	
	it('should return a three of a kind when there are three 2s', function(){
		var cardArray = validate('3h 2s 6c 2d 2h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Three Twos');
	});	
	
	it('should return a pair when there are two 2s', function(){
		var cardArray = validate('3h 2s 6c 2d 4h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Pair of Twos');
	});	
	
	it('should return a pair when there are two 3s', function(){
		var cardArray = validate('Ah 3s 10c Kd 3h');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('Pair of Threes');
	});	
	
	it('should return a King high when there is a 2, 3, 4, 8, and K card', function(){
		var cardArray = validate('2h 3s 4c 8d kh');
		var result = analyzer.analyzeHand(cardArray);
		expect(result.description).to.be.equal('King high');
	});	

});
