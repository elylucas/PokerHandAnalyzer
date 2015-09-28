var expect = require('chai').expect;

describe('poker hand input validation', function(){
	
	var validate;
	
	beforeEach(function(){
		validate = require('../inputvalidation');
	})
	
	it('should return an Error when input string is empty', function(){		
		var result = validate('');
		expect(result).to.be.a('Error');
	});
	
	it('should return an Error when there is no input', function(){
		var result = validate();
		expect(result).to.be.a('Error');
	});
	
	it('should return an Error when input is not a string', function(){
		var result = validate(45);
		expect(result).to.be.a('Error');
	});
	
	it('should return a card array when input is a valid card string', function(){
		var result = validate('Ah As 10c Kd 6h');
		expect(result).to.be.a('Array');
	});	
	
	it('should return a sorted card array', function(){
		var result = validate('2s 3h Kd ac 5d');
		expect(result[0].face).to.be.equal('A');
		expect(result[1].face).to.be.equal('K');
		expect(result[2].face).to.be.equal('5');
		expect(result[3].face).to.be.equal('3');
		expect(result[4].face).to.be.equal('2');
	});
	
});
