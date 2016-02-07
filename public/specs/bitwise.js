describe('#bitwise',function(){
	describe('#operators',function(){
        describe('#and',function(){
            it('should return a 1 for each bit position where corresponding bits are 1',function(){
				// 0 1 0 1 & 0 1 1 0 === 0 1 0 0
				expect(5&6).toBe(4);
				// 1 0 1 1 1 & 1 1 0 1 0 === 1 0 0 1 0
				expect(23&26).toBe(18)
            });
            it('should return 0 where there are no matching bytes',function(){
                expect(1&2).toBe(0);
            });
        });
		describe('#or',function(){
            it('should return 1 in each bit position if either or both bits are a 1',function(){
                // 0 1 0 1 | 0 1 1 0 === 0 1 1 1
				expect(5|6).toBe(7);
				// 1 0 1 1 1 & 1 1 0 1 0 === 1 1 1 1 1
                expect(23|26).toBe(31);
            });
        });
		describe('#exclusiveOr',function(){
			it('should return 1 in each bit position where only one bit is a 1',function(){
				// 1 0 1 1 1 & 1 1 0 1 0 === 0 1 1 0 1
                expect(23^26).toBe(13);
			});
		});
        
        describe('#not',function(){
            it('should return the the negative of (number + 1)',function(){
                expect(~255).toBe(-256);
                expect(~-256).toBe(255);
            });
        });
	});
    describe('#shifts',function(){
		it('should shift the bytes left <<',function(){
			// 00001001 << 2 = 00100100
			expect(9<<2).toBe(36);
		});
		it('should shift the bytes right with sign propagating shift >>',function(){
			// 01010101 >> 2 = 00010101
			expect(85 >> 2).toBe(21);
			expect(-9 >> 2).toBe(-3);
		});
		it('should create a non negative number with zero-fill right shift, contrary to above',function(){
			expect(-9 >>> 2).toBe(1073741821);
		});
	});
	describe('#flags',function(){
		function isFlagSelected(selectedFlags,flag){
			return (selectedFlags & flag) > 0;
		}
		function isFlagNotSelected(selectedFlags,flag){
			return (selectedFlags & flag) !== flag;
		}
		function isAnyFlagSelected(selectedFlags,flags){
			return (selectedFlags & flags) > 0;
		};
		function areAllFlagsSelected(selectedFlags,flags){
			return (selectedFlags & flags) === flags;
		};
		function areAllFlagsNotSelected(selectedFlags,flags){
			return (selectedFlags & flags) === 0;
		};
		it('should create a lightweight flag system',function(){
			var FLAG_A = 1; //  00001
			var FLAG_B = 2; //  00010
			var FLAG_C = 4; //  00100
			var FLAG_D = 8; //  01000
			var FLAG_F = 16; // 10000
			selectedFlags = FLAG_A | FLAG_B | FLAG_D; // 1011
			FLAG_A_OR_C_MASK = FLAG_A;
			FLAG_A_OR_C_MASK |= FLAG_C // just so you can see how you can modify masks
			expect(isFlagSelected(selectedFlags,FLAG_A)).toBeTruthy();
			expect(isFlagSelected(selectedFlags,FLAG_C)).toBeFalsy();
			expect(isFlagSelected(selectedFlags,FLAG_A_OR_C_MASK)).toBeTruthy();
			expect(isFlagNotSelected(selectedFlags, FLAG_C)).toBeTruthy();
			expect(isAnyFlagSelected(selectedFlags, FLAG_A_OR_C_MASK)).toBeTruthy();
			expect(areAllFlagsSelected(selectedFlags,FLAG_A_OR_C_MASK)).toBeFalsy();
			expect(areAllFlagsSelected(selectedFlags,FLAG_A | FLAG_B | FLAG_D)).toBeTruthy();
			expect(areAllFlagsNotSelected(selectedFlags,FLAG_F | FLAG_C)).toBeTruthy();
			expect(areAllFlagsNotSelected(selectedFlags,FLAG_F | FLAG_D)).toBeFalsy();
		});
		it('should be possible to compare numbers without using comparison or logical operators',function(){
			function compareNumbers(a,b){
				// if a and ~b are exact oposites, the result will be all the 1s, whose NOT result is 0;
				return ~(a ^ (~b)) + 1;
			}
			expect(compareNumbers(4123,4123)).toBe(1);
			expect(compareNumbers(3,4)).not.toBe(1);
		});
	});
	describe('#conversionOperators',function(){
		it('should convert string byte into int',function(){
			var theNumber11 = '1011';
			expect(Number.parseInt(theNumber11,2)).toBe(11)
		});
		it('should convert int into string byte',function(){
			var number30 = 30;
			expect(number30.toString(2)).toEqual('11110')
		});
	});
});