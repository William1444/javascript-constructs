describe('#factorial',function(){
	it('should return 6 for 3!',function(){
		expect(factorial(3)).toBe(6)
		expect(factorial2(3)).toBe(6)
	});
	it('should return 2 for 2!',function(){
		expect(factorial(2)).toBe(2)
		expect(factorial2(2)).toBe(2)
	});
	it('should return 24 for 4!',function(){
		expect(factorial(4)).toBe(24);
		expect(factorial2(4)).toBe(24);
	});
});

function factorial(num){
	var factorialRes = 1;
	(function factor(n){
		if (n === 1){
			return factorialRes;
		} else {
			factorialRes *= n;
			factor(n-1);
		}		
	})(num);
	return factorialRes;
}

function factorial2(num){
	var res = 1;
	return (function factor(n){
		if (n === 1) {
			return res;
		} else {
			res *= n;
			return factor(n-1);
		}
	})(num);
}
